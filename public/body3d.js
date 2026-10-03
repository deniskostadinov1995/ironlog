/* IronLog — BodyAnatomy 3D
   Interactive anatomical mannequin: white sculpted body, per-muscle meshes with
   sub-parts, 360° orbit + zoom, hover highlight, tap-to-select with camera zoom,
   heat coloring (trained / recovery). Exposes:
     window.BodyAnatomy3D.mount(el, props) -> handle
     window.BodyAnatomy (React wrapper for <x-import>)
     window.BODY3D_INFO, window.BODY3D_PALETTE
*/
(function () {
  "use strict";
  var THREE_URL = "https://unpkg.com/three@0.184.0/build/three.module.js";
  var threeP = null;
  function loadThree() { return threeP || (threeP = import(THREE_URL)); }

  /* ---------------- real body mesh (GLB) loader + region classifier ---------------- */
  var BODY_URL = (typeof window !== "undefined" && window.__BODY_GLB_URL) || "MascularMale.glb";
  var ZONES_URL = (typeof window !== "undefined" && window.__BODY_ZONES_URL) || "zones.json?v=6";
  var RAWP = null;
  function loadRaw() {
    return RAWP || (RAWP = Promise.all([
      fetch(BODY_URL).then(function (r) { return r.arrayBuffer(); }),
      fetch(ZONES_URL).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
    ]).then(function (a) { return parseBody(a[0], a[1]); }));
  }
  function rdAcc(dv, json, binOff, i) {
    var a = json.accessors[i], bv = json.bufferViews[a.bufferView];
    var start = binOff + (bv.byteOffset || 0) + (a.byteOffset || 0);
    var CT = { 5126: [4, "getFloat32"], 5125: [4, "getUint32"], 5123: [2, "getUint16"], 5121: [1, "getUint8"] }[a.componentType];
    var NC = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[a.type];
    var stride = bv.byteStride || CT[0] * NC;
    var out = a.componentType === 5125 ? new Uint32Array(a.count * NC) : new Float32Array(a.count * NC);
    for (var k = 0; k < a.count; k++) for (var c = 0; c < NC; c++) out[k * NC + c] = dv[CT[1]](start + k * stride + c * CT[0], true);
    return out;
  }
  // fy: 0=feet .. 1=head-top.  x: raw lateral (signed).  z: front(+)/back(-) relative to body center.
  // Leg centerline ~|x|=1.5; torso half-width ~2.0; arms hang beyond ~2.7.
  // Zones come from the painted map (zones.json, built in Muscle Paint Lab).
  // Fallback classifier is intentionally empty: no map -> plain body.
  function classifyVert(fy, x, z) { return null; }
  function parseBody(buf, zoneJson) {
    var dv = new DataView(buf);
    var jlen = dv.getUint32(12, true);
    var json = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 20, jlen)));
    var binOff = 20 + jlen + 8;
    var bodyMesh = null, tY = 0, i;
    for (i = 0; i < json.nodes.length; i++) { var nd = json.nodes[i]; if ((nd.name || "").toLowerCase() === "body" && nd.mesh != null) { bodyMesh = json.meshes[nd.mesh]; tY = (nd.translation && nd.translation[1]) || 0; break; } }
    if (!bodyMesh) { var best = -1, bi = 0; json.meshes.forEach(function (m, ii) { var pa = json.accessors[m.primitives[0].attributes.POSITION]; if (pa.count > best) { best = pa.count; bi = ii; } }); bodyMesh = json.meshes[bi]; }
    var prim = bodyMesh.primitives[0];
    var pos = rdAcc(dv, json, binOff, prim.attributes.POSITION);
    var nrm = prim.attributes.NORMAL != null ? rdAcc(dv, json, binOff, prim.attributes.NORMAL) : null;
    var idxA = rdAcc(dv, json, binOff, prim.indices);
    var NV = pos.length / 3;
    var mny = 1e9, mxy = -1e9, mnz = 1e9, mxz = -1e9, k;
    for (k = 0; k < NV; k++) { var y = pos[k * 3 + 1] + tY, z = pos[k * 3 + 2]; if (y < mny) mny = y; if (y > mxy) mxy = y; if (z < mnz) mnz = z; if (z > mxz) mxz = z; }
    var HGT = mxy - mny, zc = (mnz + mxz) / 2, s = 1.82 / HGT, footY = 0.03;
    var parts = [], pidx = {}, gk;
    for (gk in INFO) { INFO[gk].parts.forEach(function (pp) { pidx[gk + "/" + pp.id] = parts.length; parts.push({ g: gk, p: pp.id }); }); }
    // painted zone map -> per-vertex part index
    var zoneOwn = null;
    if (zoneJson && zoneJson.rle && zoneJson.vertexCount === NV) {
      var zmap = (zoneJson.zones || []).map(function (key) { return pidx[key] != null ? pidx[key] : -1; });
      zoneOwn = new Int16Array(NV); var zv = 0;
      for (var zi2 = 0; zi2 < zoneJson.rle.length; zi2++) {
        var pr = zoneJson.rle[zi2], pv = pr[0] < 0 ? -1 : (zmap[pr[0]] == null ? -1 : zmap[pr[0]]);
        for (var zq = 0; zq < pr[1] && zv < NV; zq++, zv++) zoneOwn[zv] = pv;
      }
    }
    var P = new Float32Array(NV * 3), Nout = nrm ? new Float32Array(NV * 3) : null;
    var own = new Int16Array(NV); own.fill(-1); var wgt = new Float32Array(NV), boxes = {};
    for (k = 0; k < NV; k++) {
      var wx = pos[k * 3], wy = pos[k * 3 + 1] + tY, wz = pos[k * 3 + 2];
      var nx = wx * s, ny = (wy - mny) * s + footY, nz = (wz - zc) * s;
      P[k * 3] = nx; P[k * 3 + 1] = ny; P[k * 3 + 2] = nz;
      if (nrm) { Nout[k * 3] = nrm[k * 3]; Nout[k * 3 + 1] = nrm[k * 3 + 1]; Nout[k * 3 + 2] = nrm[k * 3 + 2]; }
      var pi = zoneOwn ? zoneOwn[k] : (function () { var cls = classifyVert((wy - mny) / HGT, wx, wz - zc); return cls != null && pidx[cls] != null ? pidx[cls] : -1; })();
      if (pi >= 0) { { own[k] = pi; wgt[k] = 1;
        var bx = boxes[parts[pi].g] || (boxes[parts[pi].g] = [1e9, 1e9, 1e9, -1e9, -1e9, -1e9]);
        if (nx < bx[0]) bx[0] = nx; if (ny < bx[1]) bx[1] = ny; if (nz < bx[2]) bx[2] = nz;
        if (nx > bx[3]) bx[3] = nx; if (ny > bx[4]) bx[4] = ny; if (nz > bx[5]) bx[5] = nz;
      } }
    }
    // soft edges: fade weight where a vertex borders a different muscle or bare skin
    var IDX = idxA, adj = new Array(NV);
    for (var q = 0; q < NV; q++) adj[q] = null;
    function link(a, b) { (adj[a] || (adj[a] = [])).push(b); }
    for (var t = 0; t < IDX.length; t += 3) {
      var a0 = IDX[t], b0 = IDX[t + 1], c0 = IDX[t + 2];
      link(a0, b0); link(a0, c0); link(b0, a0); link(b0, c0); link(c0, a0); link(c0, b0);
    }
    var wOut = new Float32Array(NV);
    // ---- SNAP borders to the model's sculpted grooves (concave valleys between muscles) ----
    if (nrm && !zoneOwn) {
      var curv = new Float32Array(NV);
      for (var vc = 0; vc < NV; vc++) {
        var ns0 = adj[vc]; if (!ns0 || !ns0.length) { curv[vc] = 0; continue; }
        var nax = nrm[vc * 3], nay = nrm[vc * 3 + 1], naz = nrm[vc * 3 + 2], cc = 0, ac = 0;
        for (var z0 = 0; z0 < ns0.length; z0++) {
          var w0 = ns0[z0];
          var dx = P[vc * 3] - P[w0 * 3], dy = P[vc * 3 + 1] - P[w0 * 3 + 1], dz = P[vc * 3 + 2] - P[w0 * 3 + 2];
          var l2 = dx * dx + dy * dy + dz * dz; if (l2 < 1e-9) continue;
          cc += ((nax - nrm[w0 * 3]) * dx + (nay - nrm[w0 * 3 + 1]) * dy + (naz - nrm[w0 * 3 + 2]) * dz) / l2; ac++;
        }
        curv[vc] = ac ? cc / ac : 0;                     // < 0 concave = groove
      }
      var srt = Float32Array.from(curv); Array.prototype.sort.call(srt, function (a, b) { return a - b; });
      var thr = srt[Math.floor(NV * 0.30)];              // ~30% most-concave vertices are groove walls
      var wall = new Uint8Array(NV);
      for (var vw = 0; vw < NV; vw++) wall[vw] = curv[vw] < thr ? 1 : 0;
      var cur = Int16Array.from(own), nxt = new Int16Array(NV);
      for (var it2 = 0; it2 < 6; it2++) {                // label propagation bounded by groove walls
        for (var vp = 0; vp < NV; vp++) {
          var nsp = adj[vp]; nxt[vp] = cur[vp];
          if (!nsp || !nsp.length) continue;
          var tally = {}, best = cur[vp], bestN = 0.6; tally[cur[vp]] = 0.6;  // self-bias keeps interiors stable
          for (var zp = 0; zp < nsp.length; zp++) {
            var wp = nsp[zp];
            if (wall[vp] && wall[wp]) continue;           // never vote across a groove
            var lab = cur[wp], tv = (tally[lab] = (tally[lab] || 0) + 1);
            if (tv > bestN) { bestN = tv; best = lab; }
          }
          nxt[vp] = best;
        }
        var tmp2 = cur; cur = nxt; nxt = tmp2;
      }
      for (var vo = 0; vo < NV; vo++) own[vo] = cur[vo];
      // rebuild bounding boxes from the snapped ownership
      boxes = {};
      for (var vb = 0; vb < NV; vb++) {
        if (own[vb] < 0) continue;
        var bx2 = boxes[parts[own[vb]].g] || (boxes[parts[own[vb]].g] = [1e9, 1e9, 1e9, -1e9, -1e9, -1e9]);
        var qx = P[vb * 3], qy = P[vb * 3 + 1], qz = P[vb * 3 + 2];
        if (qx < bx2[0]) bx2[0] = qx; if (qy < bx2[1]) bx2[1] = qy; if (qz < bx2[2]) bx2[2] = qz;
        if (qx > bx2[3]) bx2[3] = qx; if (qy > bx2[4]) bx2[4] = qy; if (qz > bx2[5]) bx2[5] = qz;
      }
    }
    for (var v2 = 0; v2 < NV; v2++) {
      if (own[v2] < 0) { wOut[v2] = 0; continue; }
      var ns = adj[v2]; if (!ns || !ns.length) { wOut[v2] = 1; continue; }
      var same = 0; for (var jj = 0; jj < ns.length; jj++) if (own[ns[jj]] === own[v2]) same++;
      var frac = same / ns.length;                       // 1 interior, ->0 at a border
      wOut[v2] = 0.32 + 0.68 * frac * frac;
    }
    // one relaxation pass so the fade is smooth, not single-vertex
    var wRelax = new Float32Array(NV);
    for (var v3 = 0; v3 < NV; v3++) {
      var ns2 = adj[v3]; if (own[v3] < 0 || !ns2 || !ns2.length) { wRelax[v3] = wOut[v3]; continue; }
      var acc = wOut[v3], cnt = 1;
      for (var kk = 0; kk < ns2.length; kk++) if (own[ns2[kk]] === own[v3]) { acc += wOut[ns2[kk]]; cnt++; }
      wRelax[v3] = acc / cnt;
    }
    wgt = wRelax;
    return { position: P, normal: Nout, index: (idxA instanceof Uint32Array) ? idxA : Uint32Array.from(idxA), own: own, wgt: wgt, parts: parts, boxes: boxes };
  }

  var PALETTE = ["#D64533", "#3D9C56", "#3E64D6", "#E08A2E", "#8C4FD6", "#2FA8A0"];
  var RED = 0xB93524, RED_EM = 0x8E2012;
  var BASE = 0xEAE7E0;

  var INFO = {
    chest: { name: "Chest", latin: "Pectoralis major", base: 48, view: { t: 0 }, blurb: "Pressing muscle of the upper torso. Upper, mid and lower sections respond to different press angles.", parts: [
      { id: "upper", name: "Upper Chest", latin: "Clavicular head", tip: "Incline pressing & low-to-high flyes." },
      { id: "mid", name: "Mid Chest", latin: "Sternal head", tip: "Flat pressing & flyes." },
      { id: "lower", name: "Lower Chest", latin: "Costal fibres", tip: "Dips & decline pressing." } ] },
    shoulders: { name: "Shoulders", latin: "Deltoideus", base: 36, view: { t: 0.9 }, blurb: "Three-headed cap of the shoulder. Moves the arm in every direction — the width muscle.", parts: [
      { id: "front", name: "Front Delts", latin: "Anterior", tip: "Overhead presses & front raises." },
      { id: "side", name: "Side Delts", latin: "Lateral", tip: "Lateral raises build width." },
      { id: "rear", name: "Rear Delts", latin: "Posterior", tip: "Face pulls & reverse flyes." } ] },
    biceps: { name: "Biceps", latin: "Biceps brachii", base: 36, view: { t: 0.45 }, blurb: "Front of the upper arm. Bends the elbow and turns the palm up.", parts: [
      { id: "main", name: "Biceps", latin: "Front of the arm", tip: "Curls — vary grip and elbow position." } ] },
    triceps: { name: "Triceps", latin: "Triceps brachii", base: 36, view: { t: Math.PI - 0.45 }, blurb: "Back of the upper arm — two-thirds of its mass. Straightens the elbow.", parts: [
      { id: "main", name: "Triceps", latin: "Back of the arm", tip: "Pushdowns, overhead extensions, close-grip pressing." } ] },
    forearms: { name: "Forearms", latin: "Antebrachium", base: 24, view: { t: 0.6 }, blurb: "Grip and wrist muscles. Strong forearms carry every pull.", parts: [
      { id: "main", name: "Forearms", latin: "Grip & wrist", tip: "Wrist curls, hammer curls, holds." } ] },
    abs: { name: "Abs", latin: "Rectus abdominis", base: 24, view: { t: 0 }, blurb: "The six-pack. Flexes the spine and braces your torso under every heavy lift.", parts: [
      { id: "upper", name: "Upper Abs", latin: "Above the navel", tip: "Crunch patterns & rollouts." },
      { id: "lower", name: "Lower Abs", latin: "Below the navel", tip: "Leg & knee raises." } ] },
    obliques: { name: "Obliques", latin: "Obliquus externus", base: 24, view: { t: 0.8 }, blurb: "Side wall of the core. Rotates and side-bends the trunk, resists twisting.", parts: [
      { id: "main", name: "Obliques", latin: "Waist sides", tip: "Woodchops, side planks, twists." } ] },
    traps: { name: "Traps", latin: "Trapezius", base: 36, view: { t: Math.PI }, blurb: "Yoke from skull to mid-back. Shrugs, supports and retracts the shoulder blades.", parts: [
      { id: "main", name: "Traps", latin: "Upper back yoke", tip: "Shrugs, carries, rows with a squeeze." } ] },
    lats: { name: "Lats", latin: "Latissimus dorsi", base: 48, view: { t: Math.PI }, blurb: "The wings. Largest upper-body muscle — pulls the arms down and back.", parts: [
      { id: "main", name: "Lats", latin: "The V-taper", tip: "Pull-ups, pulldowns, rows." } ] },
    lowerback: { name: "Lower Back", latin: "Erector spinae", base: 60, view: { t: Math.PI }, blurb: "Columns along the spine. Keeps you upright and rigid in hinges and squats.", parts: [
      { id: "main", name: "Lower Back", latin: "Spinal columns", tip: "Deadlifts, good mornings, extensions." } ] },
    glutes: { name: "Glutes", latin: "Gluteus maximus & medius", base: 48, view: { t: Math.PI }, blurb: "The engine of the hip. Most powerful extensor in the body.", parts: [
      { id: "main", name: "Glutes", latin: "Hip extension power", tip: "Hip thrusts, squats, lunges." } ] },
    quads: { name: "Quads", latin: "Quadriceps femoris", base: 60, view: { t: 0 }, blurb: "Front of the thigh. Extends the knee — squat and press power.", parts: [
      { id: "main", name: "Quads", latin: "Front thigh", tip: "Squats, presses, extensions." } ] },
    hamstrings: { name: "Hamstrings", latin: "Hamstrings", base: 60, view: { t: Math.PI }, blurb: "Back of the thigh. Flexes the knee and extends the hip.", parts: [
      { id: "main", name: "Hamstrings", latin: "Back thigh", tip: "RDLs, leg curls, nordics." } ] },
    adductors: { name: "Inner Thigh", latin: "Adductor group", base: 48, view: { t: 0.25 }, blurb: "Inner thigh group. Squeezes the legs together, big squat helper.", parts: [
      { id: "main", name: "Inner Thigh", latin: "Adductors", tip: "Sumo stance, adduction, Copenhagen planks." } ] },
    calves: { name: "Calves", latin: "Triceps surae", base: 24, view: { t: Math.PI }, blurb: "Lower leg. Drives every step, jump and sprint.", parts: [
      { id: "main", name: "Calves", latin: "Lower leg", tip: "Standing & seated calf raises." } ] },
  };

  /* ---------------- SDF sculpt engine (surface nets) ---------------- */
  function eulInv(r) {
    var cx = Math.cos(r[0]), sx = Math.sin(r[0]), cy = Math.cos(r[1]), sy = Math.sin(r[1]), cz = Math.cos(r[2]), sz = Math.sin(r[2]);
    return [cz * cy, sz * cy, -sy,
      cz * sy * sx - sz * cx, sz * sy * sx + cz * cx, cy * sx,
      cz * sy * cx + sz * sx, sz * sy * cx - cz * sx, cy * cx];
  }
  function compilePrim(p) {
    var pad = p.k * 1.5 + 0.016, bb;
    if (p.t === 0) {
      var R = p.rot ? eulInv(p.rot) : null;
      var rx = p.r[0], ry = p.r[1], rz = p.r[2], mr = Math.max(rx, ry, rz);
      bb = [p.c[0] - mr - pad, p.c[0] + mr + pad, p.c[1] - mr - pad, p.c[1] + mr + pad, p.c[2] - mr - pad, p.c[2] + mr + pad];
      p.d = function (x, y, z) {
        var px = x - p.c[0], py = y - p.c[1], pz = z - p.c[2], t0, t1;
        if (R) { t0 = R[0] * px + R[1] * py + R[2] * pz; t1 = R[3] * px + R[4] * py + R[5] * pz; pz = R[6] * px + R[7] * py + R[8] * pz; px = t0; py = t1; }
        var a = px / rx, b = py / ry, c2 = pz / rz;
        var k0 = Math.sqrt(a * a + b * b + c2 * c2);
        if (k0 < 1e-6) return -Math.min(rx, Math.min(ry, rz));
        var k1 = Math.sqrt(a * a / (rx * rx) + b * b / (ry * ry) + c2 * c2 / (rz * rz));
        return k0 * (k0 - 1) / k1;
      };
    } else {
      var ax = p.a[0], ay = p.a[1], az = p.a[2];
      var vx = p.b[0] - ax, vy = p.b[1] - ay, vz = p.b[2] - az;
      var vv = vx * vx + vy * vy + vz * vz;
      var rm = Math.max(p.r0, p.r1) + (p.bulge || 0) + pad;
      bb = [Math.min(p.a[0], p.b[0]) - rm, Math.max(p.a[0], p.b[0]) + rm, Math.min(p.a[1], p.b[1]) - rm, Math.max(p.a[1], p.b[1]) + rm, Math.min(p.a[2], p.b[2]) - rm, Math.max(p.a[2], p.b[2]) + rm];
      p.d = function (x, y, z) {
        var px = x - ax, py = y - ay, pz = z - az;
        var t = (px * vx + py * vy + pz * vz) / vv;
        t = t < 0 ? 0 : (t > 1 ? 1 : t);
        var r = p.r0 + (p.r1 - p.r0) * t;
        if (p.bulge) { var u = p.w === 1 ? t : Math.pow(t, p.w); r += p.bulge * 4 * u * (1 - u); }
        var dx = px - vx * t, dy = py - vy * t, dz = pz - vz * t;
        return Math.sqrt(dx * dx + dy * dy + dz * dz) - r;
      };
    }
    p.bb = bb;
    return p;
  }
  function buildField(prims, mn, N, cell) {
    var NX = N[0], NY = N[1], NZ = N[2];
    var f = new Float32Array(NX * NY * NZ);
    f.fill(9);
    prims.forEach(function (p) {
      var xr = p.m ? [[p.bb[0], p.bb[1]], [-p.bb[1], -p.bb[0]]] : [[p.bb[0], p.bb[1]]];
      xr.forEach(function (rg) {
        var i0 = Math.max(0, Math.floor((rg[0] - mn[0]) / cell)), i1 = Math.min(NX - 1, Math.ceil((rg[1] - mn[0]) / cell));
        var j0 = Math.max(0, Math.floor((p.bb[2] - mn[1]) / cell)), j1 = Math.min(NY - 1, Math.ceil((p.bb[3] - mn[1]) / cell));
        var k0 = Math.max(0, Math.floor((p.bb[4] - mn[2]) / cell)), k1 = Math.min(NZ - 1, Math.ceil((p.bb[5] - mn[2]) / cell));
        for (var k = k0; k <= k1; k++) {
          var z = mn[2] + k * cell;
          for (var j = j0; j <= j1; j++) {
            var y = mn[1] + j * cell, row = (k * NY + j) * NX;
            for (var i = i0; i <= i1; i++) {
              var x = mn[0] + i * cell;
              var d = p.d(p.m && x < 0 ? -x : x, y, z);
              var idx = row + i, a = f[idx];
              var h = p.k - (a > d ? a - d : d - a);
              f[idx] = h > 0 ? (a < d ? a : d) - h * h / (4 * p.k) : (a < d ? a : d);
            }
          }
        }
      });
    });
    return f;
  }
  var NET_CO = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
  var NET_ED = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
  function netGeo(T, f, mn, N, cell, iso) {
    var NX = N[0], NY = N[1], NZ = N[2], CX = NX - 1, CY = NY - 1, CZ = NZ - 1;
    function S(i, j, k) { return f[(k * NY + j) * NX + i] - iso; }
    var cv = new Int32Array(CX * CY * CZ); cv.fill(-1);
    var pos = [], tris = [], vals = new Array(8);
    for (var k = 0; k < CZ; k++) for (var j = 0; j < CY; j++) for (var i = 0; i < CX; i++) {
      var mask = 0;
      for (var c = 0; c < 8; c++) { var v = S(i + NET_CO[c][0], j + NET_CO[c][1], k + NET_CO[c][2]); vals[c] = v; if (v < 0) mask |= 1 << c; }
      if (mask === 0 || mask === 255) continue;
      var sx = 0, sy = 0, sz = 0, n = 0;
      for (var e = 0; e < 12; e++) {
        var va = vals[NET_ED[e][0]], vb = vals[NET_ED[e][1]];
        if ((va < 0) === (vb < 0)) continue;
        var t = va / (va - vb);
        var A2 = NET_CO[NET_ED[e][0]], B2 = NET_CO[NET_ED[e][1]];
        sx += A2[0] + (B2[0] - A2[0]) * t; sy += A2[1] + (B2[1] - A2[1]) * t; sz += A2[2] + (B2[2] - A2[2]) * t; n++;
      }
      cv[(k * CY + j) * CX + i] = pos.length / 3;
      pos.push(mn[0] + (i + sx / n) * cell, mn[1] + (j + sy / n) * cell, mn[2] + (k + sz / n) * cell);
    }
    function CV(i, j, k) { return cv[(k * CY + j) * CX + i]; }
    function quad(a, b, c, d, flip) {
      if (a < 0 || b < 0 || c < 0 || d < 0) return;
      if (flip) tris.push(a, d, c, a, c, b); else tris.push(a, b, c, a, c, d);
    }
    for (var k = 0; k < NZ; k++) for (var j = 0; j < NY; j++) for (var i = 0; i < NX; i++) {
      var v0 = S(i, j, k), inA = v0 < 0;
      if (i < CX && j > 0 && j < CY && k > 0 && k < CZ && ((S(i + 1, j, k) < 0) !== inA))
        quad(CV(i, j - 1, k - 1), CV(i, j, k - 1), CV(i, j, k), CV(i, j - 1, k), !inA);
      if (j < CY && i > 0 && i < CX && k > 0 && k < CZ && ((S(i, j + 1, k) < 0) !== inA))
        quad(CV(i - 1, j, k - 1), CV(i - 1, j, k), CV(i, j, k), CV(i, j, k - 1), !inA);
      if (k < CZ && i > 0 && i < CX && j > 0 && j < CY && ((S(i, j, k + 1) < 0) !== inA))
        quad(CV(i - 1, j - 1, k), CV(i, j - 1, k), CV(i, j, k), CV(i - 1, j, k), !inA);
    }
    function smp(gx, gy, gz) {
      gx = gx < 0 ? 0 : (gx > NX - 1.001 ? NX - 1.001 : gx);
      gy = gy < 0 ? 0 : (gy > NY - 1.001 ? NY - 1.001 : gy);
      gz = gz < 0 ? 0 : (gz > NZ - 1.001 ? NZ - 1.001 : gz);
      var i0 = Math.floor(gx), j0 = Math.floor(gy), k0 = Math.floor(gz);
      var fx = gx - i0, fy = gy - j0, fz = gz - k0;
      var b0 = (k0 * NY + j0) * NX + i0, b1 = ((k0 + 1) * NY + j0) * NX + i0, rNX = NX;
      var c00 = f[b0] * (1 - fx) + f[b0 + 1] * fx, c10 = f[b0 + rNX] * (1 - fx) + f[b0 + rNX + 1] * fx;
      var c01 = f[b1] * (1 - fx) + f[b1 + 1] * fx, c11 = f[b1 + rNX] * (1 - fx) + f[b1 + rNX + 1] * fx;
      return (c00 * (1 - fy) + c10 * fy) * (1 - fz) + (c01 * (1 - fy) + c11 * fy) * fz;
    }
    var nor = new Float32Array(pos.length), EPS = 0.85;
    for (var vi = 0; vi < pos.length; vi += 3) {
      var gx = (pos[vi] - mn[0]) / cell, gy = (pos[vi + 1] - mn[1]) / cell, gz = (pos[vi + 2] - mn[2]) / cell;
      var nx = smp(gx + EPS, gy, gz) - smp(gx - EPS, gy, gz);
      var ny = smp(gx, gy + EPS, gz) - smp(gx, gy - EPS, gz);
      var nz = smp(gx, gy, gz + EPS) - smp(gx, gy, gz - EPS);
      var L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nor[vi] = nx / L; nor[vi + 1] = ny / L; nor[vi + 2] = nz / L;
    }
    var g = new T.BufferGeometry();
    g.setAttribute("position", new T.BufferAttribute(new Float32Array(pos), 3));
    g.setAttribute("normal", new T.BufferAttribute(nor, 3));
    g.setIndex(new T.BufferAttribute(new Uint32Array(tris), 1));
    return g;
  }
  function smoothGeo(g, iters) {
    var pos = g.attributes.position.array, idx = g.index.array, n = pos.length / 3;
    var nbr = new Array(n);
    for (var i = 0; i < n; i++) nbr[i] = [];
    for (var t = 0; t < idx.length; t += 3) {
      var a = idx[t], b = idx[t + 1], c = idx[t + 2];
      nbr[a].push(b, c); nbr[b].push(a, c); nbr[c].push(a, b);
    }
    var tmp = new Float32Array(pos.length);
    function pass(lam) {
      for (var v = 0; v < n; v++) {
        var ns = nbr[v], k3 = v * 3;
        if (!ns.length) { tmp[k3] = pos[k3]; tmp[k3 + 1] = pos[k3 + 1]; tmp[k3 + 2] = pos[k3 + 2]; continue; }
        var sx = 0, sy = 0, sz = 0;
        for (var q = 0; q < ns.length; q++) { var w = ns[q] * 3; sx += pos[w]; sy += pos[w + 1]; sz += pos[w + 2]; }
        var inv = 1 / ns.length;
        tmp[k3] = pos[k3] + lam * (sx * inv - pos[k3]);
        tmp[k3 + 1] = pos[k3 + 1] + lam * (sy * inv - pos[k3 + 1]);
        tmp[k3 + 2] = pos[k3 + 2] + lam * (sz * inv - pos[k3 + 2]);
      }
      pos.set(tmp);
    }
    for (var it = 0; it < iters; it++) { pass(0.5); pass(-0.53); }
    g.computeVertexNormals();
  }

  function mirrorGeo(T, g) {
    var p = g.attributes.position.array.slice(0), n = g.attributes.normal.array.slice(0), ix = g.index.array.slice(0);
    for (var i = 0; i < p.length; i += 3) { p[i] = -p[i]; n[i] = -n[i]; }
    for (var t = 0; t < ix.length; t += 3) { var tmp = ix[t + 1]; ix[t + 1] = ix[t + 2]; ix[t + 2] = tmp; }
    var g2 = new T.BufferGeometry();
    g2.setAttribute("position", new T.BufferAttribute(p, 3));
    g2.setAttribute("normal", new T.BufferAttribute(n, 3));
    g2.setIndex(new T.BufferAttribute(ix, 1));
    return g2;
  }

  function envTexture(T, renderer) {
    var c = document.createElement("canvas"); c.width = 64; c.height = 32;
    var x = c.getContext("2d");
    var g = x.createLinearGradient(0, 0, 0, 32);
    g.addColorStop(0, "#D9DEE6"); g.addColorStop(0.42, "#787E88"); g.addColorStop(0.75, "#2A2C31"); g.addColorStop(1, "#141518");
    x.fillStyle = g; x.fillRect(0, 0, 64, 32);
    // a bright key "window"
    x.fillStyle = "rgba(255,255,255,.85)"; x.fillRect(8, 3, 14, 8);
    x.fillStyle = "rgba(160,190,255,.5)"; x.fillRect(44, 6, 10, 7);
    var tx = new T.CanvasTexture(c);
    tx.mapping = T.EquirectangularReflectionMapping;
    var pm = new T.PMREMGenerator(renderer);
    var rt = pm.fromEquirectangular(tx);
    tx.dispose(); pm.dispose();
    return rt.texture;
  }

  /* ---------------- the figure (SDF-sculpted) ---------------- */
  var GEOC = null;
  function buildFigure(T, mats, raw) {
    var root = new T.Group(); root.name = "body";
    var pick = [], byKey = {}, parts = raw.parts;
    var geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.BufferAttribute(raw.position, 3));
    geo.setIndex(new T.BufferAttribute(raw.index, 1));
    if (raw.normal) geo.setAttribute("normal", new T.BufferAttribute(raw.normal, 3));
    var NVC = raw.position.length / 3;
    var col = new Float32Array(NVC * 3); col.fill(0.92);
    geo.setAttribute("color", new T.BufferAttribute(col, 3));
    if (!raw.normal) geo.computeVertexNormals();
    var own = raw.own, wgt = raw.wgt;
    var body = new T.Mesh(geo, mats.body);
    body.castShadow = true; root.add(body); pick.push(body);
    for (var gk in raw.boxes) {
      var bx = raw.boxes[gk];
      byKey[gk] = { box: new T.Box3(new T.Vector3(bx[0], bx[1], bx[2]), new T.Vector3(bx[3], bx[4], bx[5])) };
    }
    return { root: root, body: body, geo: geo, own: own, wgt: wgt, parts: parts, pick: pick, byKey: byKey };
  }

  /* ---------------- stage / controls / interaction ---------------- */
  function mount(el, props) {
    props = Object.assign({ mode: "explore", heat: {}, accent: "#F2B33D", interactive: true, autoRotate: true, radius: 24 }, props || {});
    el.innerHTML = "";
    el.style.position = "relative";
    el.style.overflow = "hidden";
    el.style.borderRadius = (typeof props.radius === "number" ? props.radius + "px" : props.radius);
    el.style.background = props.background || "radial-gradient(120% 85% at 50% 18%, #43464D 0%, #292B30 52%, #131417 100%)";
    el.style.touchAction = "none";
    el.style.userSelect = "none";
    el.style.webkitUserSelect = "none";

    var spin = document.createElement("div");
    spin.style.cssText = "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#8B909A;font-size:12px;font-weight:700;letter-spacing:1px;";
    spin.innerHTML = "<div style='display:flex;flex-direction:column;align-items:center;gap:10px'><div style='width:26px;height:26px;border-radius:50%;border:3px solid rgba(255,255,255,.14);border-top-color:rgba(255,255,255,.65);animation:spin 0.9s linear infinite'></div>LOADING BODY</div>";
    el.appendChild(spin);

    var dead = false;
    var handle = {
      _q: [],
      update: function (p) { this._q.push(["update", p]); },
      focus: function (k) { this._q.push(["focus", k]); },
      clear: function () { this._q.push(["clear"]); },
      highlightPart: function (id) { this._q.push(["highlightPart", id]); },
      snap: function (v) { this._q.push(["snap", v]); },
      dispose: function () { dead = true; },
    };
    try { (window.__b3d = window.__b3d || {})[props.tag || "main"] = handle; } catch (e) { }

    Promise.all([loadThree(), loadRaw()]).then(function (res) {
      if (dead) { return; }
      try { boot(res[0], res[1]); } catch (e) {
        console.error("BodyAnatomy3D failed:", e);
        spin.innerHTML = "3D unavailable";
      }
    }, function (err) { console.error("BodyAnatomy3D load failed:", err); spin.innerHTML = "3D unavailable"; });

    function boot(T, raw) {
      var W = el.clientWidth || 360, H = el.clientHeight || 460;
      var renderer = new T.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFShadowMap;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.02;
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;";
      el.appendChild(renderer.domElement);

      var scene = new T.Scene();
      scene.environment = envTexture(T, renderer);

      var camera = new T.PerspectiveCamera(34, W / H, 0.05, 40);

      // lights
      var hemi = new T.HemisphereLight(0xffffff, 0x2E3138, 0.5); scene.add(hemi);
      var key = new T.DirectionalLight(0xffffff, 2.1);
      key.position.set(1.7, 3.4, 2.3);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -1.4; key.shadow.camera.right = 1.4;
      key.shadow.camera.top = 2.4; key.shadow.camera.bottom = -0.4;
      key.shadow.bias = -0.0004; key.shadow.radius = 5;
      scene.add(key);
      var fill = new T.DirectionalLight(0xF2EDE4, 0.45); fill.position.set(-1.8, 1.4, 2.6); scene.add(fill);
      var rimL = new T.DirectionalLight(0x7FA2FF, 1.15); rimL.position.set(-2.6, 1.7, -2.0); scene.add(rimL);
      var rimR = new T.DirectionalLight(0x9DB6FF, 0.75); rimR.position.set(2.4, 1.1, -2.2); scene.add(rimR);

      // materials
      var mats = {
        body: new T.MeshPhysicalMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.46, clearcoat: 0.22, clearcoatRoughness: 0.5, sheen: 0.25, sheenRoughness: 0.7, envMapIntensity: 0.5 }),
        muscle: new T.MeshPhysicalMaterial({ color: BASE, roughness: 0.4, clearcoat: 0.35, clearcoatRoughness: 0.35, envMapIntensity: 0.5, transparent: true, opacity: 0, depthWrite: false }),
      };
      mats.body.name = "body";

      var fig = buildFigure(T, mats, raw);
      scene.add(fig.root);

      // pedestal + shadow
      var ped = new T.Mesh(new T.CylinderGeometry(1.02, 1.10, 0.085, 56), new T.MeshStandardMaterial({ color: 0x1C1D21, roughness: 0.85, metalness: 0.1 }));
      ped.position.y = -0.0425; ped.receiveShadow = true; scene.add(ped);
      var pedRing = new T.Mesh(new T.TorusGeometry(1.06, 0.008, 10, 72), new T.MeshStandardMaterial({ color: 0x3A3D44, roughness: 0.5, metalness: 0.6 }));
      pedRing.rotation.x = Math.PI / 2; pedRing.position.y = -0.004; scene.add(pedRing);
      var shadowCatch = new T.Mesh(new T.CircleGeometry(1.0, 48), new T.ShadowMaterial({ opacity: 0.38 }));
      shadowCatch.rotation.x = -Math.PI / 2; shadowCatch.position.y = 0.001; shadowCatch.receiveShadow = true; scene.add(shadowCatch);
      // wordmark on pedestal
      var wm = document.createElement("canvas"); wm.width = 512; wm.height = 96;
      var wx = wm.getContext("2d");
      wx.font = "800 58px Sora, Manrope, sans-serif"; wx.textAlign = "center"; wx.textBaseline = "middle";
      wx.letterSpacing = "16px";
      wx.fillStyle = "rgba(214,218,226,.85)"; wx.fillText("IRONLOG", 262, 52);
      var wmTex = new T.CanvasTexture(wm);
      var wmMesh = new T.Mesh(new T.PlaneGeometry(0.62, 0.116), new T.MeshBasicMaterial({ map: wmTex, transparent: true, opacity: 0.8, depthWrite: false }));
      wmMesh.rotation.x = -Math.PI / 2; wmMesh.position.set(0, 0.002, 0.68); scene.add(wmMesh);

      /* ----- orbit state ----- */
      var DEF = { theta: 0, phi: 1.42, rad: 3.02, tgt: new T.Vector3(0, 1.01, 0) };
      var cur = { theta: -0.85, phi: 1.42, rad: 3.4, tgt: DEF.tgt.clone() };
      var goal = { theta: DEF.theta, phi: DEF.phi, rad: DEF.rad, tgt: DEF.tgt.clone() };
      var minRad = 0.42, maxRad = 6.2;
      var TGT_MIN = { x: -1.25, y: -0.12, z: -1.25 }, TGT_MAX = { x: 1.25, y: 2.35, z: 1.25 };
      var _pv = new T.Vector3(), _pu = new T.Vector3(), _pd = new T.Vector3(), _pp = new T.Vector3();
      function clampTgt(v) {
        v.x = Math.max(TGT_MIN.x, Math.min(TGT_MAX.x, v.x));
        v.y = Math.max(TGT_MIN.y, Math.min(TGT_MAX.y, v.y));
        v.z = Math.max(TGT_MIN.z, Math.min(TGT_MAX.z, v.z));
      }
      // screen-space pan: slide the orbit target along the camera's right / up axes
      function panBy(dx, dy) {
        var h = el.clientHeight || 400;
        var k = 2 * goal.rad * Math.tan(camera.fov * Math.PI / 360) / h;
        camera.updateMatrixWorld();
        _pv.setFromMatrixColumn(camera.matrixWorld, 0);
        _pu.setFromMatrixColumn(camera.matrixWorld, 1);
        goal.tgt.addScaledVector(_pv, -dx * k).addScaledVector(_pu, dy * k);
        clampTgt(goal.tgt);
      }
      // world point under the cursor, on the view plane through the current target
      function cursorPoint() {
        _pp.set(ndc.x, ndc.y, 0.5).unproject(camera).sub(camera.position).normalize();
        camera.getWorldDirection(_pd);
        var den = _pp.dot(_pd);
        if (Math.abs(den) < 1e-4) return null;
        var t = _pv.copy(goal.tgt).sub(camera.position).dot(_pd) / den;
        return _pu.copy(camera.position).addScaledVector(_pp, t);
      }

      /* ----- state ----- */
      var st = {
        mode: props.mode, heat: props.heat || {}, accent: props.accent, interactive: props.interactive !== false,
        auto: props.autoRotate !== false, sel: null, hoverKey: null, hoverPart: null, pinPart: null, panMode: false,
        lastInteract: 0, onPick: props.onPick, onPartHover: props.onPartHover, onPartPick: props.onPartPick,
      };

      /* ----- overlay ui ----- */
      var mkBtn = function (label, title) {
        var b = document.createElement("div");
        b.textContent = label; b.title = title || "";
        b.style.cssText = "width:34px;height:34px;border-radius:11px;background:rgba(16,17,20,.72);border:1px solid rgba(255,255,255,.13);backdrop-filter:blur(6px);color:#E8E6E0;display:flex;align-items:center;justify-content:center;font-size:15px;cursor:pointer;transition:background .15s,transform .12s;";
        b.onmouseenter = function () { b.style.background = "rgba(40,42,48,.85)"; };
        b.onmouseleave = function () { b.style.background = "rgba(16,17,20,.72)"; };
        return b;
      };
      var ui = document.createElement("div");
      ui.style.cssText = "position:absolute;right:10px;bottom:10px;display:grid;grid-template-columns:repeat(2,auto);gap:6px;z-index:3;";
      if (props.chrome === "mini") ui.style.cssText = "position:absolute;right:10px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:7px;z-index:3;";
      var bIn = mkBtn("+", "Zoom in"), bOut = mkBtn("−", "Zoom out"), bUp = mkBtn("↑", "Move view up"), bDown = mkBtn("↓", "Move view down"), bPan = mkBtn("", "Pan mode — drag to move the view up, down or sideways"), bFlip = mkBtn("⇄", "Front / back"), bSpin = mkBtn("⟳", "Auto-rotate"), bHome = mkBtn("⌂", "Reset view");
      bPan.innerHTML = "<svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3'/></svg>";
      ui.appendChild(bIn); ui.appendChild(bOut); ui.appendChild(bUp); ui.appendChild(bDown); ui.appendChild(bPan); ui.appendChild(bFlip); ui.appendChild(bSpin); ui.appendChild(bHome);
      if (props.chrome === "mini") { ui.innerHTML = ""; [bIn, bOut, bPan, bHome].forEach(function (b) { ui.appendChild(b); }); }
      if (props.chrome === "none") ui.style.display = "none";
      el.appendChild(ui);
      function paintSpin() {
        bSpin.style.color = st.auto ? "#FFD98A" : "#E8E6E0";
        bSpin.style.borderColor = st.auto ? "rgba(255,217,138,.45)" : "rgba(255,255,255,.13)";
      }
      function paintPan() {
        bPan.style.color = st.panMode ? "#FFD98A" : "#E8E6E0";
        bPan.style.borderColor = st.panMode ? "rgba(255,217,138,.45)" : "rgba(255,255,255,.13)";
      }
      paintSpin(); paintPan();
      bUp.onclick = function () { panBy(0, 46); poke(); };
      bDown.onclick = function () { panBy(0, -46); poke(); };
      bPan.onclick = function () { st.panMode = !st.panMode; paintPan(); poke(); };
      bIn.onclick = function () { goal.rad = Math.max(minRad, goal.rad * 0.78); poke(); };
      bOut.onclick = function () { goal.rad = Math.min(maxRad, goal.rad * 1.28); poke(); };
      bFlip.onclick = function () { goal.theta += Math.PI; poke(); };
      bSpin.onclick = function () { st.auto = !st.auto; paintSpin(); };
      bHome.onclick = function () { clearSel(true); };

      var hint = document.createElement("div");
      hint.style.cssText = "position:absolute;left:12px;bottom:12px;z-index:3;max-width:calc(100% - 104px);padding:7px 12px;border-radius:10px;background:rgba(16,17,20,.66);border:1px solid rgba(255,255,255,.12);color:#B9BEC8;font-size:10.5px;font-weight:700;letter-spacing:.6px;line-height:1.4;transition:opacity .6s;pointer-events:none;";
      hint.textContent = (el.clientWidth || 400) < 360 ? "DRAG · PAN · ZOOM · TAP A MUSCLE" : "DRAG ROTATES · SHIFT-DRAG PANS · SCROLL ZOOMS AT CURSOR";
      if (props.chrome === "mini" || props.chrome === "none") hint.style.display = "none";
      el.appendChild(hint);

      var back = document.createElement("div");
      back.style.cssText = "position:absolute;left:12px;top:12px;z-index:4;padding:9px 15px;border-radius:12px;background:rgba(16,17,20,.78);border:1px solid rgba(255,255,255,.16);color:#F0EEE8;font-size:12px;font-weight:800;cursor:pointer;display:none;align-items:center;gap:7px;backdrop-filter:blur(6px);";
      back.innerHTML = "‹ &nbsp;All muscles";
      back.onclick = function () { clearSel(true); if (st.onPick) st.onPick(null, null); };
      el.appendChild(back);

      var label = document.createElement("div");
      label.style.cssText = "position:absolute;z-index:5;pointer-events:none;padding:7px 12px;border-radius:11px;background:rgba(14,15,18,.85);border:1px solid rgba(255,255,255,.18);color:#F4F2EC;font-size:12px;font-weight:800;display:none;white-space:nowrap;box-shadow:0 6px 20px rgba(0,0,0,.4);backdrop-filter:blur(4px);";
      el.appendChild(label);

      spin.remove();

      /* ----- color engine (per-vertex, painted on the body surface) ----- */
      var COLA = fig.geo.attributes.color, curArr = COLA.array, tgtArr = new Float32Array(curArr.length), colDirty = true;
      var accentCol = new T.Color(st.accent);
      var redCol = new T.Color(RED), boneCol = new T.Color(BASE), whiteC = new T.Color(0xffffff);
      function cl01(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }
      // recovery ramp: 0 = just hammered (dark red) -> 1 = fully rested (bone white)
      var REC_RAMP = [[0.00, 0x7E1710], [0.30, 0xB5301E], [0.55, 0xD9634A], [0.78, 0xEBA593], [1.00, 0xF2EDE4]];
      // coverage ramp: 0 = muscle never trained this week (red) -> 1 = weekly target met (green)
      var COV_RAMP = [[0.00, 0x8E1B12], [0.28, 0xC4432B], [0.55, 0xE0913F], [0.80, 0x9CC466], [1.00, 0x57C08A]];
      var rampA = new T.Color(), rampB = new T.Color();
      function rampColor(ramp, p) {
        p = cl01(p);
        for (var i = 1; i < ramp.length; i++) {
          if (p <= ramp[i][0] || i === ramp.length - 1) {
            var a = ramp[i - 1], c = ramp[i];
            var t = (p - a[0]) / Math.max(1e-6, c[0] - a[0]);
            rampA.setHex(a[1]); rampB.setHex(c[1]);
            return rampA.clone().lerp(rampB, cl01(t));
          }
        }
        return boneCol.clone();
      }
      function recoveryColor(p) { return rampColor(REC_RAMP, p); }
      function coverageColor(p) { return rampColor(COV_RAMP, p); }
      function retarget() {
        accentCol.set(st.accent || "#F2B33D");
        var map = {};
        fig.parts.forEach(function (pt) {
          var g = pt.g, heat = st.heat ? st.heat[g] : null, c;
          if (st.mode === "coverage") {
            c = coverageColor(heat == null ? 0 : heat);
          } else if (st.mode === "recovery") {
            c = heat == null ? recoveryColor(1) : recoveryColor(heat);
          } else if (st.mode === "trained" || st.mode === "volume") {
            var hv = cl01(heat == null ? 0 : heat);
            c = hv <= 0.001 ? boneCol.clone() : boneCol.clone().lerp(accentCol, 0.30 + 0.70 * hv);
          } else {
            c = redCol.clone();
          }
          if (st.sel) {
            if (st.sel === g) {
              var info = INFO[g];
              var idx = info ? info.parts.findIndex(function (q) { return q.id === pt.p; }) : 0;
              c = new T.Color(PALETTE[Math.max(0, idx) % PALETTE.length]);
              if (st.pinPart === pt.p) c.lerp(whiteC, 0.34);
              else if (st.hoverPart === pt.p) c.lerp(whiteC, 0.2);
              else if (st.pinPart) c.lerp(boneCol, 0.5);
            } else {
              c.lerp(boneCol, 0.8);
            }
          } else if (st.hoverKey === g) {
            c.lerp(accentCol, 0.82);
          }
          map[g + "/" + pt.p] = c;
        });
        var own = fig.own, wgt = fig.wgt, ps = fig.parts, br = boneCol.r, bg = boneCol.g, bb = boneCol.b;
        for (var i = 0, n = own.length; i < n; i++) {
          var o = own[i], k3 = i * 3;
          if (o < 0) { tgtArr[k3] = br; tgtArr[k3 + 1] = bg; tgtArr[k3 + 2] = bb; continue; }
          var c2 = map[ps[o].g + "/" + ps[o].p], w = wgt[i];
          tgtArr[k3] = br + (c2.r - br) * w;
          tgtArr[k3 + 1] = bg + (c2.g - bg) * w;
          tgtArr[k3 + 2] = bb + (c2.b - bb) * w;
        }
        colDirty = true;
      }
      retarget();
      curArr.set(tgtArr); COLA.needsUpdate = true;

      /* ----- picking ----- */
      var ray = new T.Raycaster(), ndc = new T.Vector2(), mousePx = { x: 0, y: 0 }, needPick = false;
      function hitAt() {
        ray.setFromCamera(ndc, camera);
        var hits = ray.intersectObject(fig.body, false);
        if (!hits.length || !hits[0].face) return null;
        var f = hits[0].face, tri = [f.a, f.b, f.c], best = -1, bw = -1;
        for (var i = 0; i < 3; i++) {
          var o = fig.own[tri[i]];
          if (o >= 0 && fig.wgt[tri[i]] > bw) { bw = fig.wgt[tri[i]]; best = o; }
        }
        if (best < 0 || bw < 0.25) return null;
        return { g: fig.parts[best].g, part: fig.parts[best].p };
      }
      function doPick() {
        needPick = false;
        if (!st.interactive) return;
        var h = hitAt(), hk = h ? h.g : null, hp = h ? h.part : null;
        if (st.sel) {
          if (hk !== st.sel) hp = null;
          if (hp !== st.hoverPart) {
            st.hoverPart = hp;
            if (st.onPartHover) st.onPartHover(hp);
            retarget();
          }
          renderer.domElement.style.cursor = hp ? "pointer" : "grab";
          paintLabel(hp ? partName(st.sel, hp) : null);
        } else {
          if (hk !== st.hoverKey) { st.hoverKey = hk; retarget(); }
          renderer.domElement.style.cursor = hk ? "pointer" : "grab";
          paintLabel(hk ? groupLabel(hk) : null);
        }
      }
      function partName(g, pid) {
        var info = INFO[g]; if (!info) return pid;
        var p = info.parts.find(function (q) { return q.id === pid; });
        return p ? p.name : pid;
      }
      function groupLabel(g) {
        var info = INFO[g], nm = info ? info.name : g;
        var heat = st.heat && st.heat[g];
        if (st.mode === "coverage") {
          if (!heat) return nm + "  ·  not trained";
          return nm + (heat >= 1 ? "  ·  target met ✓" : "  ·  " + Math.round(heat * 100) + "% of target");
        }
        if (st.mode === "recovery") {
          if (heat == null) return nm + "  ·  Fresh ✓";
          return nm + (heat >= 1 ? "  ·  Ready ✓" : "  ·  " + Math.round(heat * 100) + "% recovered");
        }
        if ((st.mode === "trained" || st.mode === "volume") && heat != null && heat > 0) {
          return nm + "  ·  in this workout";
        }
        return nm;
      }
      function paintLabel(text) {
        if (!text) { label.style.display = "none"; return; }
        label.textContent = text;
        label.style.display = "block";
        var lx = Math.min(mousePx.x + 14, el.clientWidth - label.offsetWidth - 8);
        var ly = Math.max(8, mousePx.y - 34);
        label.style.left = lx + "px"; label.style.top = ly + "px";
      }

      /* ----- select / focus ----- */
      function select(key, silent) {
        var G = key && fig.byKey[key];
        if (!G) return;
        st.sel = key; st.pinPart = null; st.hoverPart = null; st.hoverKey = null;
        var sph = G.box.getBoundingSphere(new T.Sphere());
        var fit = { c: sph.center, r: Math.max(0.16, sph.radius) };
        goal.tgt.copy(fit.c);
        goal.rad = Math.max(minRad, fit.r / Math.tan((camera.fov / 2) * Math.PI / 180) * 1.9);
        var view = (INFO[key] && INFO[key].view) || { t: 0 };
        var want = view.t;
        var d = ((want - goal.theta) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        goal.theta = goal.theta + d;
        goal.phi = 1.45;
        back.style.display = st.interactive ? "flex" : "none";
        label.style.display = "none";
        retarget();
        if (!silent && st.onPick) st.onPick(key, INFO[key] || null);
      }
      function clearSel(tween) {
        st.sel = null; st.hoverPart = null; st.pinPart = null; st.hoverKey = null;
        back.style.display = "none";
        if (tween !== false) {
          goal.tgt.copy(DEF.tgt); goal.rad = DEF.rad; goal.phi = DEF.phi;
          var d = ((0 - goal.theta) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
          goal.theta = goal.theta + d;
        }
        retarget();
      }

      /* ----- pointer handling ----- */
      var ptrs = new Map(), downAt = null, moved = 0, pinchD = 0, pinchM = null, panDrag = false, interacted = false;
      function poke() { st.lastInteract = performance.now(); interacted = true; hint.style.opacity = "0"; }
      function updNdc(e) {
        var r = el.getBoundingClientRect();
        mousePx.x = e.clientX - r.left; mousePx.y = e.clientY - r.top;
        ndc.x = (mousePx.x / r.width) * 2 - 1;
        ndc.y = -(mousePx.y / r.height) * 2 + 1;
      }
      var cv = renderer.domElement;
      cv.addEventListener("pointerdown", function (e) {
        if (!st.interactive && e.pointerType !== "mouse") return;
        try { cv.setPointerCapture(e.pointerId); } catch (err) { }
        ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
        downAt = { x: e.clientX, y: e.clientY, t: performance.now() };
        moved = 0; poke();
        panDrag = st.panMode || e.shiftKey || e.button === 1 || e.button === 2;
        if (ptrs.size === 2) {
          var a = Array.from(ptrs.values());
          pinchD = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
          pinchM = { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2 };
        }
        cv.style.cursor = panDrag ? "move" : "grabbing";
      });
      cv.addEventListener("pointermove", function (e) {
        updNdc(e);
        var p = ptrs.get(e.pointerId);
        if (!p) { needPick = true; return; }
        var dx = e.clientX - p.x, dy = e.clientY - p.y;
        p.x = e.clientX; p.y = e.clientY;
        moved += Math.abs(dx) + Math.abs(dy);
        if (ptrs.size === 1) {
          if (panDrag || e.shiftKey) panBy(dx, dy);
          else {
            goal.theta -= dx * 0.0062;
            goal.phi = Math.min(2.85, Math.max(0.25, goal.phi - dy * 0.005));
          }
        } else if (ptrs.size === 2) {
          var a = Array.from(ptrs.values());
          var nd = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
          if (pinchD > 0) goal.rad = Math.min(maxRad, Math.max(minRad, goal.rad * (pinchD / nd)));
          pinchD = nd;
          var mx = (a[0].x + a[1].x) / 2, my = (a[0].y + a[1].y) / 2;
          if (pinchM) panBy(mx - pinchM.x, my - pinchM.y);
          pinchM = { x: mx, y: my };
        }
        poke();
      });
      function endPtr(e) {
        ptrs.delete(e.pointerId);
        if (ptrs.size < 2) pinchM = null;
        if (ptrs.size === 0) panDrag = false;
        cv.style.cursor = "grab";
        if (downAt && moved < 7 && performance.now() - downAt.t < 400 && st.interactive) {
          updNdc(e);
          var h = hitAt();
          if (h) {
            if (st.sel) {
              if (h.g === st.sel) {
                st.pinPart = (st.pinPart === h.part) ? null : h.part;
                if (st.onPartPick) st.onPartPick(st.pinPart);
                retarget();
              }
            } else {
              select(h.g);
            }
          }
        }
        downAt = null;
      }
      cv.addEventListener("pointerup", endPtr);
      cv.addEventListener("pointercancel", endPtr);
      cv.addEventListener("contextmenu", function (e) { e.preventDefault(); });
      cv.addEventListener("wheel", function (e) {
        e.preventDefault();
        updNdc(e);
        if (e.shiftKey) { panBy(0, -e.deltaY * 0.6); poke(); return; }
        var prev = goal.rad;
        goal.rad = Math.min(maxRad, Math.max(minRad, goal.rad * Math.exp(e.deltaY * 0.0011)));
        var f = 1 - goal.rad / prev;             // > 0 while zooming in
        if (f > 0.001) {
          var pt = cursorPoint();
          if (pt) { goal.tgt.lerp(pt, Math.min(0.85, f * 1.6)); clampTgt(goal.tgt); }
        }
        poke();
      }, { passive: false });
      cv.addEventListener("pointerleave", function () {
        if (st.hoverKey || st.hoverPart) { st.hoverKey = null; st.hoverPart = null; retarget(); paintLabel(null); }
      });

      /* ----- resize ----- */
      var ro = new ResizeObserver(function () {
        var w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      ro.observe(el);

      /* ----- frame loop ----- */
      var lastT = performance.now(), disposed = false;
      function advance(dt) {
        if (st.auto && !st.sel && ptrs.size === 0 && (!interacted || performance.now() - st.lastInteract > 4500)) {
          goal.theta += dt * 0.22;
        }
        var k = 1 - Math.exp(-dt * 7.5);
        cur.theta += (goal.theta - cur.theta) * k;
        cur.phi += (goal.phi - cur.phi) * k;
        cur.rad += (goal.rad - cur.rad) * k;
        cur.tgt.lerp(goal.tgt, k);
        camera.position.set(
          cur.tgt.x + cur.rad * Math.sin(cur.phi) * Math.sin(cur.theta),
          cur.tgt.y + cur.rad * Math.cos(cur.phi),
          cur.tgt.z + cur.rad * Math.sin(cur.phi) * Math.cos(cur.theta)
        );
        camera.lookAt(cur.tgt);
        if (colDirty) {
          var ck = 1 - Math.exp(-dt * 9), mx = 0;
          for (var ci = 0, cn = curArr.length; ci < cn; ci++) {
            var d3 = tgtArr[ci] - curArr[ci];
            curArr[ci] += d3 * ck;
            var ad = d3 < 0 ? -d3 : d3;
            if (ad > mx) mx = ad;
          }
          COLA.needsUpdate = true;
          if (mx < 0.004) { curArr.set(tgtArr); colDirty = false; }
        }
        if (needPick) doPick();
      }
      function frame() {
        if (disposed) return;
        requestAnimationFrame(frame);
        var nowT = performance.now(), dt = Math.min(0.05, Math.max(0.001, (nowT - lastT) / 1000));
        lastT = nowT;
        advance(dt);
        renderer.render(scene, camera);
      }
      frame();

      /* ----- external API ----- */
      function apply(p) {
        if (!p) return;
        var re = false;
        if (p.mode !== undefined && p.mode !== st.mode) { st.mode = p.mode; re = true; }
        if (p.heat !== undefined) { st.heat = p.heat || {}; re = true; }
        if (p.accent !== undefined && p.accent !== st.accent) { st.accent = p.accent; re = true; }
        if (p.interactive !== undefined) st.interactive = p.interactive !== false;
        if (p.autoRotate !== undefined) { st.auto = p.autoRotate !== false; paintSpin(); }
        if (p.onPick) st.onPick = p.onPick;
        if (p.onPartHover) st.onPartHover = p.onPartHover;
        if (p.onPartPick) st.onPartPick = p.onPartPick;
        if (p.selected !== undefined) {
          if (p.selected && p.selected !== st.sel) select(p.selected, true);
          else if (!p.selected && st.sel) clearSel(true);
        }
        if (re) retarget();
      }
      handle.update = apply;
      handle.focus = function (k) { select(k, true); };
      handle.clear = function () { clearSel(true); };
      handle.highlightPart = function (id) { st.pinPart = id; retarget(); };
      handle.snap = function (v) { var want = v === "back" ? Math.PI : 0; var d = ((want - goal.theta) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI; goal.theta += d; };
      handle.tick = function (sec) { var n = Math.max(1, Math.round((sec || 1) * 60)); for (var i = 0; i < n; i++) advance(1 / 60); renderer.render(scene, camera); };
      handle.dispose = function () {
        disposed = true; dead = true;
        try { ro.disconnect(); } catch (e) { }
        try { renderer.dispose(); } catch (e) { }
        try { el.innerHTML = ""; } catch (e) { }
      };
      handle._fig = fig; handle._scene = scene;
      // drain queued calls
      handle._q.splice(0).forEach(function (c) { handle[c[0]] && handle[c[0]](c[1]); });
      // initial props already in st; apply selected if given
      if (props.selected) select(props.selected, true);
    }

    return handle;
  }

  window.BodyAnatomy3D = { mount: mount, INFO: INFO, PALETTE: PALETTE };
  window.BODY3D_INFO = INFO;
  window.BODY3D_PALETTE = PALETTE;

  /* ---------------- React wrapper ---------------- */
  var R = window.React;
  if (R) {
    var BodyAnatomy = function (props) {
      var ref = R.useRef(null), h = R.useRef(null);
      R.useEffect(function () {
        h.current = mount(ref.current, props);
        if (props.onReady) props.onReady(h.current, props.tag);
        return function () { h.current && h.current.dispose(); };
      }, []);
      R.useEffect(function () {
        if (h.current) h.current.update(props);
      });
      return R.createElement("div", {
        ref: ref,
        style: { width: "100%", height: props.height || 460, position: "relative" },
      });
    };
    window.BodyAnatomy = BodyAnatomy;
  }
})();
