import { createElement as _h, Fragment as _F } from "react";
import React, { useState, useEffect, useMemo, useRef } from "react";
const _cssCache = new Map();
export const css = s => {
  if (!s) return {};
  if (typeof s !== "string") return s;
  const hit = _cssCache.get(s);
  if (hit) return hit;
  const out = {};
  let depth = 0,
    start = 0;
  const decls = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(") depth++;else if (ch === ")") depth--;else if (ch === ";" && depth === 0) {
      decls.push(s.slice(start, i));
      start = i + 1;
    }
  }
  decls.push(s.slice(start));
  for (const d of decls) {
    if (!d.trim()) continue;
    const i = d.indexOf(":");
    if (i < 0) continue;
    const rawKey = d.slice(0, i).trim();
    const val = d.slice(i + 1).trim();
    if (!rawKey) continue;
    let key;
    if (rawKey.startsWith("--")) {
      key = rawKey;
    } else {
      const camel = rawKey.replace(/^-/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      key = /^(webkit|moz|o)[A-Z]/.test(camel) ? camel[0].toUpperCase() + camel.slice(1) : camel;
    }
    out[key] = val;
  }
  _cssCache.set(s, out);
  return out;
};
export const cssx = (s, extra) => ({
  ...css(s),
  ...(extra || {})
});
export const CHROMELESS = ["login", "splash", "welcome", "signup", "signin", "forgot", "reset", "verify", "onb", "paywall", "trialok", "purchok", "trialend", "expired", "offline"];
export const SIDE_ICONS = {
  home: ["M3 11l9-8 9 8", "M5 10v10h5v-6h4v6h5V10"],
  programs: ["M5 4h14a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z", "M4 9h16", "M8 3v4", "M16 3v4"],
  stats: ["M4 19V5", "M4 17l5-5 4 3 6-8"],
  body: ["M12 7a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z", "M5 10h14", "M12 10v5", "M12 15l-3.5 6", "M12 15l3.5 6"],
  weight: ["M5 7h14l1.4 12.4a1 1 0 0 1-1 1.1H4.6a1 1 0 0 1-1-1.1L5 7z", "M9 7a3 3 0 0 1 6 0"],
  inbox: ["M4 6h16v12H4z", "M4 7l8 6 8-6"],
  guide: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"]
};
export const SIDE_ITEMS = [{
  id: "home",
  label: "Home"
}, {
  id: "body",
  label: "Body Lab"
}, {
  id: "programs",
  label: "Programs"
}, {
  id: "guide",
  label: "Exercises"
}, {
  id: "stats",
  label: "Stats"
}, {
  id: "weight",
  label: "Weight"
}, {
  id: "inbox",
  label: "Social"
}];
export function buildLayout(screen, vw) {
  const isDesktop = vw >= 900;
  const sidebarW = vw >= 1160 ? 258 : 214;
  return {
    isDesktop,
    isMobile: !isDesktop,
    showSidebar: isDesktop && !CHROMELESS.includes(screen),
    showBottomNav: !isDesktop && !CHROMELESS.includes(screen) && !["active", "post"].includes(screen),
    rootStyle: `position:absolute;inset:0;overflow:hidden;background:radial-gradient(110% 90% at 78% 4%, #2A2012 0%, #14100B 48%, #0C0906 100%);display:flex;flex-direction:${isDesktop ? "row" : "column"};`,
    sidebarStyle: `width:${sidebarW}px;flex-shrink:0;height:100%;overflow:hidden;padding:28px 14px 22px;display:flex;flex-direction:column;gap:4px;background:rgba(255,255,255,.018);border-right:1px solid rgba(255,255,255,.06);`,
    mainStyle: `flex:1;min-width:0;min-height:0;position:relative;display:flex;flex-direction:column;`,
    scrollStyle: `flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;`,
    contentStyle: isDesktop ? `width:100%;max-width:860px;margin:0 auto;padding:0 10px;` : `width:100%;max-width:600px;margin:0 auto;`
  };
}
export function buildSidebar(screen, go, unreadCount) {
  return {
    items: SIDE_ITEMS.map(it => {
      const active = screen === it.id;
      const badge = it.id === "inbox" && unreadCount > 0;
      return {
        label: it.label,
        icon: SIDE_ICONS[it.id],
        color: active ? "var(--ac)" : "#A99E8C",
        badge: !!badge,
        badgeN: badge ? String(unreadCount) : "",
        onClick: () => go(it.id),
        style: `display:flex;align-items:center;gap:13px;padding:12px 14px;border-radius:13px;cursor:pointer;transition:background .15s ease;background:${active ? "rgba(var(--acr),.13)" : "transparent"};`
      };
    })
  };
}
export const tint = c => (c || "#F2B33D") + "24";
export const ring = c => (c || "#F2B33D") + "77";
export function buildUser(u, photo) {
  return {
    name: u?.name || "",
    av: u?.av || "",
    color: u?.color || "#F2B33D",
    upper: (u?.name || "").toUpperCase(),
    tint: tint(u?.color),
    ring: ring(u?.color),
    pinLabel: u?.pin ? "🔒 PIN protected" : "Open access",
    photoCss: photo ? 'url("' + photo + '")' : "none",
    hasPhoto: !!photo,
    noPhoto: !photo
  };
}
export function useViewportW(ref) {
  const [vw, setVw] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    const el = ref?.current;
    const measure = () => setVw(el ? el.clientWidth : window.innerWidth);
    measure();
    if (typeof ResizeObserver !== "undefined" && el) {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);
  return vw;
}
let _body3dLoad = null;
function loadBody3D() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.BodyAnatomy3D) return Promise.resolve(true);
  if (_body3dLoad) return _body3dLoad;
  _body3dLoad = new Promise(resolve => {
    const el = document.createElement("script");
    el.src = "/body3d.js";
    el.onload = () => resolve(!!window.BodyAnatomy3D);
    el.onerror = () => resolve(false);
    document.head.appendChild(el);
  });
  return _body3dLoad;
}
export function currentAccentHex() {
  try {
    const x = getComputedStyle(document.documentElement).getPropertyValue("--ac").trim();
    return x || "#F2B33D";
  } catch (e) {
    return "#F2B33D";
  }
}
export function Body3D({
  mode = "explore",
  heat,
  onPick,
  selected,
  height = 380,
  autoRotate = true,
  accent,
  background = "transparent",
  chrome
}) {
  const elRef = useRef();
  const handleRef = useRef();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let dead = false;
    loadBody3D().then(ok => {
      if (dead || !elRef.current || !ok) return;
      try {
        handleRef.current = window.BodyAnatomy3D.mount(elRef.current, {
          mode,
          heat: heat || {},
          accent: accent || currentAccentHex(),
          selected,
          autoRotate,
          radius: 22,
          chrome,
          background,
          onPick: k => onPick && onPick(k)
        });
        setReady(true);
      } catch (e) {}
    });
    return () => {
      dead = true;
      try {
        handleRef.current && handleRef.current.dispose && handleRef.current.dispose();
      } catch (e) {}
      handleRef.current = null;
    };
  }, []);
  useEffect(() => {
    if (!handleRef.current || !handleRef.current.update) return;
    try {
      handleRef.current.update({
        mode,
        heat: heat || {},
        accent: accent || currentAccentHex(),
        selected
      });
    } catch (e) {}
  }, [mode, heat, selected, accent]);
  return _h("div", {
    ref: elRef,
    style: {
      width: "100%",
      height,
      position: "relative"
    }
  });
}
const HOLD = (() => {
  let t0 = 0,
    timer = null,
    iv = null,
    rate = 0,
    fn = null,
    armed = false;
  const stop = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (iv) {
      clearInterval(iv);
      iv = null;
    }
    fn = null;
    armed = false;
    rate = 0;
  };
  const release = () => {
    const wasRepeating = !!iv;
    const f = fn;
    stop();
    if (!wasRepeating && f) f();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("pointerup", () => {
      if (armed) release();
    });
    window.addEventListener("pointercancel", () => {
      if (armed) stop();
    });
  }
  const api = {
    ticks: 0,
    start(f, firstDelay, slow, fast, rampAfter) {
      stop();
      fn = f;
      armed = true;
      t0 = Date.now();
      timer = setTimeout(() => {
        const tick = () => {
          if (!fn) return;
          api.ticks++;
          fn();
          if (Date.now() - t0 > rampAfter && rate !== fast) {
            clearInterval(iv);
            rate = fast;
            iv = setInterval(tick, fast);
          }
        };
        api.ticks++;
        fn();
        rate = slow;
        iv = setInterval(tick, slow);
      }, firstDelay);
    }
  };
  if (typeof window !== "undefined") window.__HOLD__ = api;
  return api;
})();
export function holdRepeat(fn, opts) {
  const o = opts || {};
  const firstDelay = o.firstDelay != null ? o.firstDelay : 350;
  const slow = o.slow != null ? o.slow : 90;
  const fast = o.fast != null ? o.fast : 40;
  const rampAfter = o.rampAfter != null ? o.rampAfter : 1000;
  return {
    onPointerDown: e => {
      if (e && e.button != null && e.button !== 0) return;
      if (e && e.preventDefault) e.preventDefault();
      HOLD.start(fn, firstDelay, slow, fast, rampAfter);
    },
    onContextMenu: e => e.preventDefault()
  };
}
export function AppShell({
  v,
  children
}) {
  const {
    layout
  } = v;
  return _h("div", {
    className: "ilroot",
    style: css(layout.rootStyle)
  }, _h(Sidebar, {
    v: v
  }), _h("div", {
    style: css(layout.mainStyle)
  }, _h("div", {
    style: css("position:absolute;top:-110px;right:-60px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(var(--acr),.07),transparent 70%);pointer-events:none;")
  }), _h("div", {
    className: "ilsc",
    style: css(layout.scrollStyle)
  }, _h("div", {
    style: css(layout.contentStyle)
  }, children)), _h(BottomNav, {
    v: v
  })), _h(ProfileSheet, {
    v: v
  }), _h(AddGymSheet, {
    v: v
  }), _h(Toasts, {
    v: v
  }));
}
export function Sidebar({
  v
}) {
  const {
    layout,
    sidebar,
    nav,
    user,
    openProfile
  } = v;
  return _h(_F, null, layout.showSidebar && _h("aside", {
    style: css(layout.sidebarStyle)
  }, _h("div", {
    className: "sora",
    style: css("font-size:25px;font-weight:800;letter-spacing:-1px;color:#F4ECDD;padding:4px 12px 24px;flex-shrink:0;")
  }, "IRON", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "LOG")), _h("div", {
    style: css("flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;gap:4px;")
  }, sidebar.items.map((it, i) => _h("div", {
    key: i,
    className: "press",
    onClick: it.onClick,
    style: css(it.style)
  }, _h("svg", {
    width: "21",
    height: "21",
    viewBox: "0 0 24 24",
    style: css(`fill:none;stroke:${it.color};stroke-width:2;stroke-linecap:round;stroke-linejoin:round`)
  }, it.icon.map((ip, j) => _h("path", {
    key: j,
    d: ip
  }))), _h("span", {
    style: css(`font-size:14px;font-weight:800;color:${it.color};`)
  }, it.label), it.badge && _h("span", {
    style: css("margin-left:auto;background:var(--ac);color:var(--ink);font-size:10px;font-weight:800;border-radius:7px;padding:1px 7px;")
  }, it.badgeN)))), _h("div", {
    className: "press",
    onClick: nav.quick,
    style: css("flex-shrink:0;margin-top:12px;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:15px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-family:'Sora',sans-serif;font-weight:800;font-size:14px;box-shadow:0 10px 24px rgba(var(--acdr),.32);")
  }, _h("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    style: css("fill:var(--ink);stroke:none")
  }, _h("path", {
    d: "M8 5.14v13.72a1 1 0 0 0 1.53.85l10.74-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z"
  })), " Start workout"), _h("div", {
    className: "press",
    onClick: openProfile,
    style: css("flex-shrink:0;margin-top:12px;display:flex;align-items:center;gap:11px;padding:12px;border-radius:15px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css(`width:38px;height:38px;border-radius:12px;background:${user.tint};border:2px solid ${user.ring};display:flex;align-items:center;justify-content:center;color:${user.color};font-family:'Sora',sans-serif;font-weight:800;font-size:14px;flex-shrink:0;`)
  }, user.av), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;")
  }, user.name), _h("div", {
    style: css("font-size:10px;color:#8E8475;font-weight:600;")
  }, "Settings & color")), _h("span", {
    style: css("color:#6E665B;font-size:18px;")
  }, "\u203A"))));
}
export function BottomNav({
  v
}) {
  const {
    layout,
    nav
  } = v;
  return _h(_F, null, layout.showBottomNav && _h("div", {
    className: "ilnav",
    style: css("position:fixed;left:16px;right:16px;bottom:16px;max-width:460px;margin:0 auto;height:70px;border-radius:24px;background:rgba(24,20,16,.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.08);box-shadow:0 16px 40px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:space-between;padding:0 14px;z-index:80;animation:rise .45s cubic-bezier(.2,.8,.2,1) both;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;height:100%;")
  }, _h("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    style: css(`fill:none;stroke:${nav.homeC};stroke-width:2;stroke-linecap:round;stroke-linejoin:round`)
  }, _h("path", {
    d: "M3 11l9-8 9 8"
  }), _h("path", {
    d: "M5 10v10h5v-6h4v6h5V10"
  })), _h("span", {
    style: css(`font-family:'Manrope',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:.4px;color:${nav.homeC};`)
  }, "Home")), _h("div", {
    className: "press",
    onClick: nav.stats,
    style: css("flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;height:100%;")
  }, _h("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    style: css(`fill:none;stroke:${nav.statsC};stroke-width:2;stroke-linecap:round;stroke-linejoin:round`)
  }, _h("path", {
    d: "M4 19V5"
  }), _h("path", {
    d: "M4 17l5-5 4 3 6-8"
  })), _h("span", {
    style: css(`font-family:'Manrope',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:.4px;color:${nav.statsC};`)
  }, "Stats")), _h("div", {
    className: "press",
    onClick: nav.quick,
    style: css("flex-shrink:0;width:60px;height:60px;margin:0 6px;border-radius:50%;background:linear-gradient(135deg,var(--acl),var(--acd));display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(var(--acdr),.45);transform:translateY(-14px);")
  }, _h("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    style: css("fill:var(--ink);stroke:none")
  }, _h("path", {
    d: "M8 5.14v13.72a1 1 0 0 0 1.53.85l10.74-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z"
  }))), _h("div", {
    className: "press",
    onClick: nav.programs,
    style: css("flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;height:100%;")
  }, _h("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    style: css(`fill:none;stroke:${nav.programsC};stroke-width:2;stroke-linecap:round;stroke-linejoin:round`)
  }, _h("rect", {
    x: "4",
    y: "5",
    width: "16",
    height: "16",
    rx: "3"
  }), _h("path", {
    d: "M4 9h16M8 3v4M16 3v4"
  })), _h("span", {
    style: css(`font-family:'Manrope',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:.4px;color:${nav.programsC};`)
  }, "Programs")), _h("div", {
    className: "press",
    onClick: nav.more,
    style: css("flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;height:100%;")
  }, _h("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    style: css(`fill:${nav.moreC}`)
  }, _h("circle", {
    cx: "5",
    cy: "12",
    r: "2"
  }), _h("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }), _h("circle", {
    cx: "19",
    cy: "12",
    r: "2"
  })), _h("span", {
    style: css(`font-family:'Manrope',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:.4px;color:${nav.moreC};`)
  }, "More"))));
}
export function ProfileSheet({
  v
}) {
  const {
    profile,
    user,
    gyms,
    themes,
    settings
  } = v;
  return _h(_F, null, profile.open && _h(_F, null, _h("div", {
    style: css("position:absolute;inset:0;z-index:90;background:rgba(8,6,4,.6);animation:fadeIn .25s ease both;"),
    onClick: profile.close
  }), _h("div", {
    style: css(profile.sheetStyle)
  }, _h("div", {
    style: css("width:38px;height:4px;border-radius:2px;background:rgba(255,255,255,.18);margin:0 auto 22px;")
  }), _h("div", {
    style: css("display:flex;align-items:center;gap:14px;margin-bottom:22px;")
  }, _h("div", {
    style: css(`width:52px;height:52px;border-radius:16px;background:${user.tint};border:2px solid ${user.ring};display:flex;align-items:center;justify-content:center;color:${user.color};font-family:'Sora',sans-serif;font-weight:800;font-size:18px;`)
  }, user.av), _h("div", null, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:19px;color:#F4ECDD;")
  }, user.name), _h("div", {
    style: css("font-size:12px;color:#8E8475;font-weight:600;")
  }, user.pinLabel))), _h("div", {
    style: css("font-size:11px;font-weight:800;letter-spacing:1px;color:#8E8475;margin-bottom:11px;")
  }, "\uD83D\uDCCD YOUR GYMS"), _h("div", {
    style: css("display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;")
  }, gyms.list.map((g, i) => _h("div", {
    key: i,
    className: "press",
    onClick: g.onSelect,
    style: css(g.style)
  }, g.name)), _h("div", {
    className: "press",
    onClick: gyms.onAdd,
    style: css("padding:8px 14px;border-radius:11px;border:1.5px dashed rgba(var(--acr),.4);color:var(--ac);font-size:12px;font-weight:800;")
  }, "+ Add gym")), _h("div", {
    style: css("font-size:11px;font-weight:800;letter-spacing:1px;color:#8E8475;margin-bottom:12px;")
  }, "\uD83C\uDFA8 ACCENT COLOR"), _h("div", {
    style: css("display:grid;grid-template-columns:repeat(7,1fr);gap:9px;margin-bottom:20px;")
  }, themes.map((t, i) => _h("div", {
    key: i,
    className: "press",
    onClick: t.onPick,
    style: css(t.swatchStyle)
  }, t.active && _h("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:var(--ink);stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M5 13l4 4 10-11"
  }))))), _h("div", {
    style: css("display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:11px;")
  }, _h("div", {
    className: "press",
    onClick: profile.body,
    style: css("display:flex;flex-direction:column;gap:7px;padding:15px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:21px;")
  }, "\uD83E\uDDCD"), _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, "Body Lab")), _h("div", {
    className: "press",
    onClick: profile.guide,
    style: css("display:flex;flex-direction:column;gap:7px;padding:15px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:21px;")
  }, "\uD83D\uDCD6"), _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, "Exercises")), _h("div", {
    className: "press",
    onClick: profile.weight,
    style: css("display:flex;flex-direction:column;gap:7px;padding:15px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:21px;")
  }, "\u2696\uFE0F"), _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, "Body Weight")), _h("div", {
    className: "press",
    onClick: profile.inbox,
    style: css("display:flex;flex-direction:column;gap:7px;padding:15px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);position:relative;")
  }, _h("span", {
    style: css("font-size:21px;")
  }, "\u2709\uFE0F"), _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, "Inbox"), _h("div", {
    style: css("position:absolute;top:13px;right:13px;background:var(--ac);color:var(--ink);font-size:10px;font-weight:800;border-radius:7px;padding:1px 6px;")
  }, "2"))), _h("div", {
    className: "press",
    onClick: profile.settings,
    style: css("display:flex;align-items:center;gap:13px;padding:16px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);margin-bottom:11px;")
  }, _h("span", {
    style: css("font-size:20px;")
  }, "\u2699\uFE0F"), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:15px;font-weight:800;color:#F4ECDD;")
  }, "Settings"), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;")
  }, "Account, notifications, privacy")), _h("span", {
    style: css("color:#5A5147;")
  }, "\u203A")), _h("div", {
    className: "press",
    onClick: profile.paywall,
    style: css("display:flex;align-items:center;gap:13px;padding:16px;border-radius:16px;background:rgba(var(--acr),.09);border:1px solid rgba(var(--acr),.28);margin-bottom:11px;")
  }, _h("span", {
    style: css("font-size:20px;")
  }, "\u2B50"), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:15px;font-weight:800;color:#F4ECDD;")
  }, settings.planName), _h("div", {
    style: css("font-size:11px;color:var(--ac);font-weight:700;")
  }, settings.planSub)), _h("span", {
    style: css("color:var(--ac);")
  }, "\u203A")), _h("div", {
    className: "press",
    onClick: profile.logout,
    style: css("display:flex;align-items:center;gap:13px;padding:16px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);margin-bottom:11px;")
  }, _h("span", {
    style: css("font-size:20px;")
  }, "\uD83D\uDEAA"), _h("div", {
    style: css("font-size:15px;font-weight:800;color:#F4ECDD;")
  }, "Log out")), _h("div", {
    className: "press",
    onClick: profile.admin,
    style: css("display:flex;align-items:center;gap:13px;padding:16px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);margin-bottom:11px;")
  }, _h("span", {
    style: css("font-size:20px;")
  }, "\u2699\uFE0F"), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:15px;font-weight:800;color:#F4ECDD;")
  }, "Admin Panel"), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;")
  }, "Password protected"))), profile.deleteConfirm && _h("div", {
    style: css("background:rgba(226,106,79,.08);border:1.5px solid rgba(226,106,79,.3);border-radius:16px;padding:16px;margin-bottom:11px;animation:pop .3s ease both;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#E26A4F;margin-bottom:6px;")
  }, "\u26A0\uFE0F Delete account?"), _h("div", {
    style: css("font-size:12px;color:#A99E8C;font-weight:600;margin-bottom:13px;")
  }, "This removes all your data forever."), _h("div", {
    style: css("display:flex;gap:10px;")
  }, _h("div", {
    className: "press",
    onClick: profile.doDelete,
    style: css("flex:1;text-align:center;padding:11px;border-radius:12px;background:#E26A4F;color:#fff;font-size:13px;font-weight:800;")
  }, "Delete forever"), _h("div", {
    className: "press",
    onClick: profile.cancelDelete,
    style: css("flex:1;text-align:center;padding:11px;border-radius:12px;background:rgba(255,255,255,.06);color:#A99E8C;font-size:13px;font-weight:800;")
  }, "Cancel"))), profile.showDeleteBtn && _h("div", {
    className: "press",
    onClick: profile.askDelete,
    style: css("display:flex;align-items:center;gap:13px;padding:16px;border-radius:16px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.05);margin-bottom:11px;")
  }, _h("span", {
    style: css("font-size:20px;")
  }, "\uD83D\uDDD1\uFE0F"), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:15px;font-weight:800;color:#A99E8C;")
  }, "Delete account"), _h("div", {
    style: css("font-size:11px;color:#6E665B;font-weight:600;")
  }, "Permanently remove all data"))), _h("div", {
    className: "press",
    onClick: profile.close,
    style: css("text-align:center;padding:13px;font-size:14px;font-weight:800;color:#8E8475;")
  }, "Close"))));
}
export function AddGymSheet({
  v
}) {
  const {
    addGym
  } = v;
  return _h(_F, null, addGym.open && _h("div", {
    style: css("position:absolute;inset:0;z-index:95;background:rgba(8,6,4,.6);display:flex;align-items:center;justify-content:center;padding:30px;animation:fadeIn .22s ease both;"),
    onClick: addGym.cancel
  }, _h("div", {
    style: css("width:100%;background:#221E18;border:1px solid rgba(var(--acr),.25);border-radius:24px;padding:22px;animation:pop .35s cubic-bezier(.34,1.4,.5,1) both;"),
    onClick: addGym.stop
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:18px;color:#F4ECDD;margin-bottom:14px;")
  }, "\uD83D\uDCCD New Gym"), _h("input", {
    value: addGym.value,
    onChange: addGym.onChange,
    placeholder: "Gym name",
    style: css("width:100%;padding:13px 15px;background:rgba(255,255,255,.05);border:1.5px solid rgba(var(--acr),.25);border-radius:13px;font-size:15px;color:#F4ECDD;outline:none;margin-bottom:14px;")
  }), _h("div", {
    style: css("display:flex;gap:10px;")
  }, _h("div", {
    className: "press",
    onClick: addGym.save,
    style: css("flex:1;text-align:center;padding:13px;border-radius:13px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-weight:800;font-size:14px;font-family:'Sora',sans-serif;")
  }, "Add gym"), _h("div", {
    className: "press",
    onClick: addGym.cancel,
    style: css("padding:13px 20px;border-radius:13px;background:rgba(255,255,255,.06);color:#A99E8C;font-weight:800;font-size:14px;")
  }, "Cancel")))));
}
export function Toasts({
  v
}) {
  const {
    toastList,
    toast
  } = v;
  return _h(_F, null, _h("div", {
    style: css("position:absolute;top:14px;left:50%;transform:translateX(-50%);z-index:120;display:flex;flex-direction:column;gap:9px;width:min(92%,400px);pointer-events:none;")
  }, toastList.map((tt, i) => _h("div", {
    key: i,
    className: "press",
    onClick: tt.onTap,
    style: css("pointer-events:auto;display:flex;gap:12px;align-items:center;padding:13px 15px;border-radius:17px;background:rgba(24,20,15,.95);border:1px solid rgba(var(--acr),.35);box-shadow:0 14px 40px rgba(0,0,0,.5);backdrop-filter:blur(8px);animation:toastDrop .4s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("div", {
    style: css("width:38px;height:38px;border-radius:12px;background:rgba(var(--acr),.16);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;")
  }, tt.icon), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, tt.title), _h("div", {
    style: css("font-size:11.5px;color:#A99E8C;font-weight:600;margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;")
  }, tt.body)), _h("div", {
    style: css("font-size:10px;font-weight:800;color:var(--ac);flex-shrink:0;")
  }, tt.cta)))), toast.show && _h("div", {
    style: css("position:absolute;left:50%;bottom:100px;z-index:99;background:#FCFAF6;color:#1A1612;padding:12px 20px;border-radius:14px;font-size:13px;font-weight:800;box-shadow:0 12px 30px rgba(0,0,0,.4);animation:toastIn .35s cubic-bezier(.34,1.4,.5,1) both;white-space:nowrap;")
  }, toast.msg));
}
export function RestOverlay({
  v
}) {
  const {
    aw
  } = v;
  return aw.isRest && _h("div", {
    style: css("position:absolute;inset:0;z-index:88;background:radial-gradient(120% 80% at 50% 30%, #241B10, #100D09 75%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;animation:fadeIn .3s ease both;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "REST TIME"), _h("div", {
    style: css("position:relative;width:208px;height:208px;margin:26px 0;")
  }, _h("svg", {
    width: "208",
    height: "208",
    viewBox: "0 0 208 208",
    style: css("transform:rotate(-90deg)")
  }, _h("circle", {
    cx: "104",
    cy: "104",
    r: "94",
    style: css("fill:none;stroke:rgba(var(--acr),.12);stroke-width:11")
  }), _h("circle", {
    cx: "104",
    cy: "104",
    r: "94",
    style: css("fill:none;stroke:var(--ac);stroke-width:11;stroke-linecap:round;transition:stroke-dasharray .9s linear"),
    strokeDasharray: aw.restDash
  })), _h("div", {
    style: css("position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:54px;color:#F4ECDD;")
  }, aw.restLabel), _h("div", {
    style: css("font-size:11px;font-weight:700;color:#8E8475;letter-spacing:1px;")
  }, "seconds"))), _h("div", {
    style: css("display:flex;gap:12px;")
  }, _h("div", {
    className: "press",
    onClick: aw.addRest,
    style: css("padding:13px 22px;border-radius:15px;background:rgba(255,255,255,.06);color:#F4ECDD;font-size:14px;font-weight:800;")
  }, "+15s"), _h("div", {
    className: "press",
    onClick: aw.skipRest,
    style: css("padding:13px 28px;border-radius:15px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-size:14px;font-weight:800;")
  }, "Skip rest \u2192")), _h("div", {
    style: css("margin-top:28px;font-size:13px;color:#8E8475;font-weight:600;")
  }, "Next: ", _h("span", {
    style: css("color:var(--ac);font-weight:800;")
  }, aw.nextName)), _h("div", {
    className: "press",
    onClick: aw.toggleSound,
    style: css(aw.soundPillStyle)
  }, _h("span", {
    style: css(`width:7px;height:7px;border-radius:50%;flex-shrink:0;background:${aw.soundDot};animation:${aw.soundDotAnim};`)
  }), aw.soundLabel));
}
export function SplashScreen({
  v
}) {
  const {
    auth
  } = v;
  return _h("div", {
    className: "press",
    onClick: auth.toWelcome,
    style: css("min-height:838px;display:flex;flex-direction:column;justify-content:center;padding:0 26px;overflow:hidden;background:#080705;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:76px;font-weight:800;line-height:.92;letter-spacing:-3.6px;color:#F4ECDD;white-space:nowrap;animation:rise .6s cubic-bezier(.2,.8,.2,1) both;")
  }, "IRON"), _h("div", {
    className: "sora",
    style: css("font-size:76px;font-weight:800;line-height:.92;letter-spacing:-3.6px;white-space:nowrap;background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:rise .6s cubic-bezier(.2,.8,.2,1) both;animation-delay:.07s;")
  }, "LOG."), _h("div", {
    style: css("margin-top:22px;font-size:11px;font-weight:700;letter-spacing:3.4px;color:#3E3830;animation:fadeIn .7s ease both;animation-delay:.2s;")
  }, "EST. 2026"));
}
export function WelcomeScreen({
  v
}) {
  const {
    auth,
    ready
  } = v;
  return _h("div", {
    style: css("min-height:838px;display:flex;flex-direction:column;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("position:relative;height:400px;overflow:hidden;background:radial-gradient(72% 60% at 50% 40%,#3A2C18 0%,#1A1410 58%,#0C0906 100%);")
  }, _h("div", {
    style: css("position:absolute;inset:0;")
  }, _h(Body3D, {
    mode: "recovery",
    heat: ready.heat,
    accent: ready.accent,
    background: "transparent",
    chrome: "none",
    autoRotate: true,
    height: "400px"
  })), _h("div", {
    style: css("position:absolute;inset:0;pointer-events:none;background:linear-gradient(to bottom,rgba(12,9,6,.5) 0%,rgba(12,9,6,0) 40%,rgba(12,9,6,.9) 88%,#0C0906 100%);")
  }), _h("div", {
    style: css("position:absolute;top:64px;left:0;right:0;text-align:center;pointer-events:none;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#F4ECDD;")
  }, "IRON", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "LOG")))), _h("div", {
    style: css("padding:0 26px 40px;margin-top:-40px;position:relative;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:34px;font-weight:800;line-height:1.08;letter-spacing:-1.3px;color:#F4ECDD;text-wrap:pretty;")
  }, "Train hard.", _h("br", null), "See exactly ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "what recovered.")), _h("div", {
    style: css("margin-top:14px;font-size:14px;line-height:1.6;font-weight:600;color:#8E8475;max-width:310px;text-wrap:pretty;")
  }, "Log every set, watch your muscles recover in 3D, and never guess which session to run next."), _h("div", {
    style: css("margin-top:22px;display:flex;flex-direction:column;gap:10px;")
  }, auth.valueProps.map((v, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:12px;")
  }, _h("div", {
    style: css("width:30px;height:30px;border-radius:10px;background:rgba(var(--acr),.13);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;")
  }, v.icon), _h("span", {
    style: css("font-size:13px;font-weight:700;color:#C9BEAD;")
  }, v.text)))), _h("div", {
    className: "press",
    onClick: auth.toSignup,
    style: css("margin-top:26px;padding:16px;border-radius:17px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:15.5px;box-shadow:0 14px 32px rgba(var(--acdr),.34);")
  }, "Get started free"), _h("div", {
    className: "press",
    onClick: auth.toSignin,
    style: css("margin-top:11px;padding:15px;border-radius:16px;border:1px solid rgba(255,255,255,.1);text-align:center;font-size:14px;font-weight:800;color:#C9BEAD;")
  }, "I already have an account"), _h("div", {
    style: css("margin-top:16px;text-align:center;font-size:11px;font-weight:600;color:#5A5147;line-height:1.6;")
  }, "1 month free \xB7 then from \u20AC1.67/mo", _h("br", null), "Cancel anytime")));
}
export function AuthScreen({
  v
}) {
  const {
    auth,
    nav
  } = v;
  return _h("div", {
    style: css("min-height:838px;padding:58px 26px 40px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "press",
    onClick: auth.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("margin-top:26px;font-size:34px;font-weight:800;letter-spacing:-1.3px;color:#F4ECDD;")
  }, auth.formTitle), _h("div", {
    style: css("margin-top:8px;font-size:13.5px;font-weight:600;color:#8E8475;")
  }, auth.formSub), _h("div", {
    style: css("margin-top:24px;display:flex;flex-direction:column;gap:11px;")
  }, _h("div", {
    className: "press",
    onClick: auth.ssoApple,
    style: css("display:flex;align-items:center;justify-content:center;gap:10px;padding:15px;border-radius:15px;background:#F4ECDD;color:#0C0906;font-size:14.5px;font-weight:800;")
  }, _h("span", {
    style: css("font-size:17px;")
  }, "\uF8FF"), " Continue with Apple"), _h("div", {
    className: "press",
    onClick: auth.ssoGoogle,
    style: css("display:flex;align-items:center;justify-content:center;gap:10px;padding:15px;border-radius:15px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#F4ECDD;font-size:14.5px;font-weight:800;")
  }, _h("span", {
    style: css("font-size:15px;font-weight:800;color:#F2B33D;")
  }, "G"), " Continue with Google")), _h("div", {
    style: css("margin:20px 0;display:flex;align-items:center;gap:12px;")
  }, _h("div", {
    style: css("flex:1;height:1px;background:rgba(255,255,255,.08);")
  }), _h("span", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1.4px;color:#5A5147;")
  }, "OR EMAIL"), _h("div", {
    style: css("flex:1;height:1px;background:rgba(255,255,255,.08);")
  })), auth.isSignup && _h(React.Fragment, null, _h("input", {
    value: auth.name,
    onChange: auth.onName,
    placeholder: "Your name",
    style: css("width:100%;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:14px;color:#F4ECDD;font-size:14.5px;font-weight:600;outline:none;display:block;margin-bottom:11px;")
  })), _h("input", {
    value: auth.email,
    onChange: auth.onEmail,
    placeholder: "you@email.com",
    style: css(`width:100%;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid ${auth.emailBorder};border-radius:14px;color:#F4ECDD;font-size:14.5px;font-weight:600;outline:none;display:block;`)
  }), _h("input", {
    value: auth.pw,
    onChange: auth.onPw,
    type: "password",
    placeholder: "Password",
    style: css("width:100%;margin-top:11px;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:14px;color:#F4ECDD;font-size:14.5px;font-weight:600;outline:none;display:block;")
  }), auth.err && _h(React.Fragment, null, _h("div", {
    style: css("margin-top:9px;font-size:12px;font-weight:700;color:#E26A4F;")
  }, auth.errText)), auth.isSignin && _h(React.Fragment, null, _h("div", {
    className: "press",
    onClick: auth.toForgot,
    style: css("margin-top:12px;text-align:right;font-size:12.5px;font-weight:800;color:var(--ac);")
  }, "Forgot password?")), _h("div", {
    className: "press",
    onClick: auth.submit,
    style: css("margin-top:20px;padding:16px;border-radius:17px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:15.5px;box-shadow:0 14px 32px rgba(var(--acdr),.34);")
  }, auth.submitLabel), _h("div", {
    className: "press",
    onClick: auth.swap,
    style: css("margin-top:16px;text-align:center;font-size:13px;font-weight:700;color:#8E8475;")
  }, auth.swapLabel, " ", _h("span", {
    style: css("color:var(--ac);font-weight:800;")
  }, auth.swapCta)), _h("div", {
    style: css("margin-top:22px;text-align:center;font-size:11px;line-height:1.7;font-weight:600;color:#5A5147;")
  }, "By continuing you agree to our", _h("br", null), _h("span", {
    className: "press",
    onClick: nav.terms,
    style: css("color:#8E8475;text-decoration:underline;")
  }, "Terms"), " and ", _h("span", {
    className: "press",
    onClick: nav.privacy,
    style: css("color:#8E8475;text-decoration:underline;")
  }, "Privacy Policy")), _h("div", {
    className: "press",
    onClick: auth.toPinLogin,
    style: css("margin-top:20px;text-align:center;font-size:11.5px;font-weight:700;color:#5A5147;")
  }, "Shared device? Use profile picker \u2192"));
}
export function OnboardingScreen({
  v
}) {
  const {
    onb
  } = v;
  return _h("div", {
    style: css("min-height:838px;padding:56px 22px 30px;display:flex;flex-direction:column;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:11px;")
  }, _h("div", {
    className: "press",
    onClick: onb.back,
    style: css("width:36px;height:36px;border-radius:12px;background:linear-gradient(150deg,var(--acl),var(--acd));display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;")
  }, "🏋️"), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, "IronLog"), _h("div", {
    style: css("font-size:10px;font-weight:600;color:#57C08A;")
  }, "setting you up \xB7 step ", onb.stepNum, " of 8")), _h("div", {
    className: "press",
    onClick: onb.skip,
    style: css("font-size:12px;font-weight:800;color:#5A5147;flex-shrink:0;")
  }, onb.skipLabel)), _h("div", {
    style: css("margin-top:14px;display:flex;gap:4px;")
  }, onb.dots.map((d, i) => _h("div", {
    key: i,
    style: css(d.style)
  }))), _h("div", {
    style: css("flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding:22px 0 10px;gap:11px;")
  }, onb.thread.map((m, i) => _h("div", {
    key: i,
    style: css(m.style)
  }, m.text)), _h("div", {
    style: css("align-self:flex-start;max-width:82%;padding:13px 16px;border-radius:19px 19px 19px 5px;background:#221E18;border:1px solid rgba(255,255,255,.06);animation:rise .35s cubic-bezier(.2,.8,.2,1) both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:9px;")
  }, _h("span", {
    style: css("font-size:19px;")
  }, onb.icon), _h("span", {
    className: "sora",
    style: css("font-size:16px;font-weight:800;letter-spacing:-.5px;color:#F4ECDD;")
  }, onb.title)), _h("div", {
    style: css("margin-top:7px;font-size:12.5px;line-height:1.55;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, onb.body)), onb.hasName && _h(React.Fragment, null, _h("input", {
    value: onb.name,
    onChange: onb.onName,
    placeholder: "Your name",
    style: css("width:100%;margin-top:24px;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:14px;color:#F4ECDD;font-size:14.5px;font-weight:600;outline:none;display:block;")
  }), _h("div", {
    style: css("margin-top:16px;font-size:10.5px;font-weight:800;letter-spacing:1.2px;color:#8E8475;")
  }, "AVATAR COLOR"), _h("div", {
    style: css("margin-top:10px;display:flex;gap:10px;")
  }, onb.colors.map((c, i) => _h("div", {
    key: i,
    className: "press",
    onClick: c.onPick,
    style: css(`width:36px;height:36px;border-radius:12px;background:${c.hex};border:2.5px solid ${c.border};`)
  }))), _h("div", {
    style: css("margin-top:20px;font-size:10.5px;font-weight:800;letter-spacing:1.2px;color:#8E8475;")
  }, "UNITS"), _h("div", {
    style: css("margin-top:10px;display:flex;gap:4px;padding:4px;border-radius:14px;background:rgba(255,255,255,.05);max-width:220px;")
  }, onb.units.map((u, i) => _h("div", {
    key: i,
    className: "press",
    onClick: u.onPick,
    style: css(u.style)
  }, u.label)))), onb.hasOptions && _h(React.Fragment, null, _h("div", {
    style: css("margin-top:24px;display:flex;flex-direction:column;gap:10px;")
  }, onb.options.map((op, i) => _h("div", {
    key: i,
    className: "press",
    onClick: op.onPick,
    style: css(op.style)
  }, _h("span", {
    style: css("font-size:20px;flex-shrink:0;")
  }, op.icon), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, op.label), _h("div", {
    style: css("font-size:11.5px;font-weight:600;color:#8E8475;margin-top:2px;")
  }, op.sub)), _h("span", {
    style: css(op.checkStyle)
  }, "✓"))))), onb.hasGym && _h(React.Fragment, null, _h("input", {
    value: onb.gymName,
    onChange: onb.onGym,
    placeholder: "e.g. PowerHouse Central",
    style: css("width:100%;margin-top:24px;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:14px;color:#F4ECDD;font-size:14.5px;font-weight:600;outline:none;display:block;")
  }), _h("div", {
    style: css("margin-top:12px;padding:12px 14px;border-radius:13px;background:rgba(var(--acr),.07);border:1px solid rgba(var(--acr),.2);font-size:11.5px;font-weight:700;color:var(--ac);line-height:1.5;💡")
  }, "💡", " IronLog remembers different weights per gym \u2014 machines never match between places."))), _h("div", {
    className: "press",
    onClick: onb.next,
    style: css("padding:16px;border-radius:17px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:15.5px;box-shadow:0 14px 32px rgba(var(--acdr),.34);")
  }, onb.cta), onb.hasSecondary && _h(React.Fragment, null, _h("div", {
    className: "press",
    onClick: onb.skip,
    style: css("margin-top:12px;text-align:center;font-size:13px;font-weight:800;color:#8E8475;")
  }, onb.secondary)));
}
export function LoginScreen({
  v
}) {
  const {
    login
  } = v;
  return _h("div", {
    style: css("min-height:838px;padding:0 26px;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("text-align:center;margin-bottom:34px;animation:rise .55s cubic-bezier(.2,.8,.2,1) both;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:52px;font-weight:800;letter-spacing:-2px;color:#F4ECDD;text-shadow:0 8px 30px rgba(var(--acr),.18);")
  }, "IRON", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "LOG")), _h("div", {
    style: css("font-size:13px;color:#8E8475;margin-top:9px;font-weight:600;")
  }, "your lifts \xB7 your data \xB7 your progress")), _h("div", {
    style: css("width:100%;max-width:340px;")
  }, _h("div", {
    style: css("font-size:11px;font-weight:800;letter-spacing:2px;color:#8E8475;text-align:center;margin-bottom:18px;animation:fadeIn .6s ease both;animation-delay:.1s;")
  }, "WHO'S TRAINING?"), _h("div", {
    style: css("display:grid;grid-template-columns:repeat(3,1fr);gap:13px;")
  }, login.users.map((u, i) => _h("div", {
    key: i,
    className: "press",
    onClick: u.onPick,
    style: css(u.cardStyle)
  }, _h("div", {
    style: {
      ...css("width:56px;height:56px;border-radius:17px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:800;font-size:20px;box-shadow:inset 0 1px 0 rgba(255,255,255,.12);"),
      background: u.tint,
      border: "2px solid " + u.ring,
      color: u.color
    }
  }, u.av), _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;text-align:center;line-height:1.15;")
  }, u.name), _h("div", {
    style: {
      ...css("font-size:10px;font-weight:800;letter-spacing:.4px;padding:3px 9px;border-radius:7px;"),
      background: u.badgeBg,
      color: u.badgeFg
    }
  }, u.badge)))), login.showPin && _h(_F, null, _h("div", {
    style: css("margin-top:16px;animation:pop .35s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("input", {
    value: login.pin,
    onChange: login.onPin,
    type: "password",
    placeholder: login.pinPlaceholder,
    style: {
      ...css("width:100%;padding:14px 18px;background:rgba(255,255,255,.05);border-radius:15px;font-size:16px;color:#F4ECDD;outline:none;text-align:center;letter-spacing:5px;"),
      border: "1.5px solid " + login.pinBorder
    }
  }), login.err && _h(_F, null, _h("div", {
    style: css("color:#E26A4F;font-size:12px;font-weight:700;text-align:center;margin-top:8px;")
  }, login.errText)))), login.hasSel && _h(_F, null, _h("div", {
    className: "press",
    onClick: login.enter,
    style: css("margin-top:16px;padding:15px;border-radius:16px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:15px;box-shadow:0 12px 28px rgba(var(--acdr),.32);animation:pop .35s cubic-bezier(.34,1.4,.5,1) both;")
  }, "Enter as ", login.selName, " \u2192")), _h("div", {
    style: css("display:flex;justify-content:flex-end;margin-top:18px;")
  }, _h("div", {
    className: "press",
    onClick: login.toggleAdd,
    style: {
      ...css("display:flex;align-items:center;gap:6px;padding:8px 15px;border-radius:20px;font-size:12px;font-weight:700;"),
      background: login.addBtnBg,
      border: "1px solid " + login.addBtnBorder,
      color: login.addBtnFg
    }
  }, _h("span", {
    style: css("font-size:14px;")
  }, login.addIcon), " ", login.addLabel)), login.addOpen && _h(_F, null, _h("div", {
    style: css("background:#221E18;border:1.5px solid rgba(var(--acr),.25);border-radius:20px;padding:20px;margin-top:12px;animation:pop .35s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("div", {
    style: css("font-size:15px;font-weight:800;color:#F4ECDD;margin-bottom:14px;")
  }, "New User"), _h("input", {
    value: login.newName,
    onChange: login.onNewName,
    placeholder: "Name e.g. Alex",
    style: css("width:100%;padding:12px 14px;background:rgba(255,255,255,.05);border:1.5px solid rgba(var(--acr),.22);border-radius:12px;font-size:14px;color:#F4ECDD;outline:none;margin-bottom:12px;")
  }), _h("div", {
    style: css("font-size:11px;font-weight:800;letter-spacing:.6px;color:#8E8475;margin-bottom:8px;")
  }, "COLOR"), _h("div", {
    style: css("display:flex;gap:9px;margin-bottom:16px;")
  }, login.colors.map((c, i) => _h("div", {
    key: i,
    className: "press",
    onClick: c.onPick,
    style: {
      ...css("width:30px;height:30px;border-radius:10px;"),
      background: c.hex,
      border: "2.5px solid " + c.border
    }
  }))), _h("div", {
    className: "press",
    onClick: login.create,
    style: css("padding:13px;border-radius:14px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-weight:800;font-size:14px;font-family:'Sora',sans-serif;")
  }, "Create User")))));
}
export function PaywallScreen({
  v
}) {
  const {
    pay,
    nav
  } = v;
  return _h("div", {
    style: css("min-height:838px;padding:56px 22px 34px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:center;")
  }, _h("div", {
    className: "press",
    onClick: pay.close,
    style: css("width:38px;height:38px;border-radius:13px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;color:#A99E8C;font-size:16px;")
  }, "\u2715"), _h("div", {
    className: "press",
    onClick: pay.restore,
    style: css("font-size:12px;font-weight:800;color:#8E8475;")
  }, "Restore purchases")), _h("div", {
    style: css("margin-top:22px;text-align:center;")
  }, _h("div", {
    style: css("display:inline-block;padding:6px 13px;border-radius:9px;background:rgba(var(--acr),.14);color:var(--ac);font-size:10.5px;font-weight:800;letter-spacing:1.2px;")
  }, "1 MONTH FREE \xB7 CANCEL ANYTIME"), _h("div", {
    className: "sora",
    style: css("margin-top:14px;font-size:33px;font-weight:800;letter-spacing:-1.3px;line-height:1.1;color:#F4ECDD;")
  }, "Unlock ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "everything"))), _h("div", {
    style: css("margin-top:20px;display:flex;flex-direction:column;gap:9px;")
  }, pay.perks.map((pk, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:11px;")
  }, _h("span", {
    style: css("width:19px;height:19px;border-radius:7px;background:rgba(var(--acr),.16);color:var(--ac);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;")
  }, "\u2713"), _h("span", {
    style: css("font-size:13px;font-weight:700;color:#C9BEAD;")
  }, pk.text)))), _h("div", {
    style: css("margin-top:22px;display:flex;flex-direction:column;gap:9px;")
  }, pay.plans.map((pl, i) => _h("div", {
    key: i,
    className: "press",
    onClick: pl.onPick,
    style: css(pl.style)
  }, _h("div", {
    style: css(pl.radioStyle)
  }, _h("span", {
    style: css(pl.dotStyle)
  })), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:7px;")
  }, _h("span", {
    style: css("font-size:14.5px;font-weight:800;color:#F4ECDD;")
  }, pl.label), pl.hasTag && _h(_F, null, _h("span", {
    style: css(pl.tagStyle)
  }, pl.tag))), _h("div", {
    style: css("font-size:11.5px;font-weight:700;color:#8E8475;margin-top:2px;")
  }, pl.sub)), _h("div", {
    style: css("text-align:right;flex-shrink:0;")
  }, _h("div", {
    className: "sora",
    style: {
      ...css("font-size:17px;font-weight:800;"),
      color: pl.priceColor
    }
  }, pl.price), _h("div", {
    style: css("font-size:10px;font-weight:700;color:#8E8475;")
  }, pl.per))))), _h("div", {
    className: "press",
    onClick: pay.start,
    style: css("margin-top:20px;padding:17px;border-radius:17px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:16px;box-shadow:0 16px 36px rgba(var(--acdr),.34);")
  }, "Start my free month"), _h("div", {
    style: css("margin-top:12px;text-align:center;font-size:11px;line-height:1.7;font-weight:600;color:#5A5147;")
  }, pay.fineprint, _h("br", null), _h("span", {
    className: "press",
    onClick: nav.terms,
    style: css("text-decoration:underline;")
  }, "Terms"), " \xB7 ", _h("span", {
    className: "press",
    onClick: nav.privacy,
    style: css("text-decoration:underline;")
  }, "Privacy")));
}
export function PurchaseStatesScreen({
  v
}) {
  const {
    payMsg,
    user
  } = v;
  return _h("div", {
    style: css("min-height:838px;padding:56px 26px 34px;display:flex;flex-direction:column;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("flex:1;display:flex;flex-direction:column;justify-content:center;text-align:center;align-items:center;")
  }, payMsg.isTrial && _h(_F, null, _h("div", {
    style: css("position:relative;width:140px;height:140px;animation:pop .5s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("svg", {
    viewBox: "0 0 40 40",
    style: css("width:140px;height:140px;transform:rotate(-90deg);")
  }, _h("circle", {
    cx: "20",
    cy: "20",
    r: "17",
    style: css("fill:none;stroke:rgba(255,255,255,.07);stroke-width:3;")
  }), _h("circle", {
    cx: "20",
    cy: "20",
    r: "17",
    style: css("fill:none;stroke:var(--ac);stroke-width:3;stroke-linecap:round;stroke-dasharray:100,100;")
  })), _h("div", {
    style: css("position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:42px;font-weight:800;color:#F4ECDD;line-height:1;")
  }, "30"), _h("div", {
    style: css("margin-top:3px;font-size:9.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "DAYS FREE")))), payMsg.isCard && _h(_F, null, _h("div", {
    style: css("width:100%;max-width:320px;border-radius:22px;padding:20px;background:linear-gradient(150deg,var(--acl) 0%,var(--ac) 48%,var(--acd) 100%);box-shadow:0 18px 40px rgba(var(--acdr),.32);text-align:left;animation:pop .5s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:flex-start;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:16px;font-weight:800;letter-spacing:-.5px;color:var(--ink);")
  }, "IRONLOG"), _h("span", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:1.3px;color:rgba(var(--inkr),.6);")
  }, "PRO")), _h("div", {
    style: css("margin-top:30px;font-size:9.5px;font-weight:800;letter-spacing:1.5px;color:rgba(var(--inkr),.55);")
  }, "MEMBER"), _h("div", {
    className: "sora",
    style: css("margin-top:4px;font-size:22px;font-weight:800;letter-spacing:-.85px;color:var(--ink);")
  }, user.name), _h("div", {
    style: css("margin-top:16px;display:flex;justify-content:space-between;align-items:flex-end;")
  }, _h("div", null, _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1.3px;color:rgba(var(--inkr),.55);")
  }, "SINCE"), _h("div", {
    style: css("font-size:12px;font-weight:800;color:var(--ink);")
  }, "AUG 2026")), _h("div", {
    style: css("text-align:right;")
  }, _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1.3px;color:rgba(var(--inkr),.55);")
  }, "RENEWS"), _h("div", {
    style: css("font-size:12px;font-weight:800;color:var(--ink);")
  }, payMsg.renews))))), payMsg.isLifetime && _h(_F, null, _h("div", {
    style: css("width:92px;height:92px;border-radius:32px;background:linear-gradient(150deg,var(--acl),var(--acd));display:flex;align-items:center;justify-content:center;font-size:42px;box-shadow:0 20px 44px rgba(var(--acdr),.36);animation:pop .5s cubic-bezier(.34,1.4,.5,1) both;")
  }, "\u267E\uFE0F")), payMsg.isPlainIcon && _h(_F, null, _h("div", {
    style: {
      ...css("width:88px;height:88px;border-radius:30px;display:flex;align-items:center;justify-content:center;font-size:40px;animation:pop .5s cubic-bezier(.34,1.4,.5,1) both;"),
      background: payMsg.iconBg
    }
  }, payMsg.icon)), _h("div", {
    className: "sora",
    style: css("margin-top:22px;font-size:31px;font-weight:800;letter-spacing:-1.2px;line-height:1.12;color:#F4ECDD;text-wrap:pretty;")
  }, payMsg.title), _h("div", {
    style: css("margin-top:12px;font-size:14px;line-height:1.6;font-weight:600;color:#8E8475;max-width:310px;text-wrap:pretty;")
  }, payMsg.body), payMsg.hasBox && _h(_F, null, _h("div", {
    style: css("margin-top:22px;width:100%;max-width:320px;border-radius:20px;padding:16px 18px;background:#221E18;border:1px solid rgba(255,255,255,.07);text-align:left;")
  }, payMsg.rows.map((r, i) => _h("div", {
    key: i,
    style: css(r.style)
  }, _h("span", {
    style: css("font-size:12.5px;font-weight:700;color:#8E8475;")
  }, r.k), _h("span", {
    style: {
      ...css("font-size:12.5px;font-weight:800;"),
      color: r.vColor
    }
  }, r.v))))), payMsg.isPurchase && _h(_F, null, _h("div", {
    style: css("margin-top:20px;width:100%;max-width:320px;text-align:left;padding:17px 19px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);")
  }, _h("div", {
    style: css("font-size:22px;")
  }, "\uD83D\uDE4F"), _h("div", {
    className: "sora",
    style: css("margin-top:9px;font-size:16px;font-weight:800;letter-spacing:-.5px;color:#F4ECDD;")
  }, "Genuinely, thank you"), _h("div", {
    style: css("margin-top:9px;font-size:12.5px;line-height:1.7;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, "IronLog is a small operation. No investors, no ads, no selling your training data. Your ", payMsg.paidAmount, " pays for the servers and buys us time to keep building."), _h("div", {
    style: css("margin-top:9px;font-size:12.5px;line-height:1.7;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, "If something's broken or missing, reply to your receipt email \u2014 it comes straight to us.")))), _h("div", {
    className: "press",
    onClick: payMsg.action,
    style: css("padding:16px;border-radius:17px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:15.5px;box-shadow:0 14px 32px rgba(var(--acdr),.34);")
  }, payMsg.cta), payMsg.hasSecondary && _h(_F, null, _h("div", {
    className: "press",
    onClick: payMsg.secondaryAction,
    style: css("margin-top:12px;text-align:center;font-size:13px;font-weight:800;color:#8E8475;")
  }, payMsg.secondary)));
}
export function OfflineScreen({
  v
}) {
  const {
    nav
  } = v;
  return _h("div", {
    style: css("min-height:838px;padding:56px 26px 34px;display:flex;flex-direction:column;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("flex:1;display:flex;flex-direction:column;justify-content:center;text-align:center;align-items:center;")
  }, _h("div", {
    style: css("width:88px;height:88px;border-radius:30px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:38px;")
  }, "\uD83D\uDCE1"), _h("div", {
    className: "sora",
    style: css("margin-top:22px;font-size:29px;font-weight:800;letter-spacing:-1.1px;color:#F4ECDD;")
  }, "No connection"), _h("div", {
    style: css("margin-top:12px;font-size:14px;line-height:1.6;font-weight:600;color:#8E8475;max-width:300px;text-wrap:pretty;")
  }, "Keep training \u2014 every set you log is saved on your phone and syncs the moment you're back online."), _h("div", {
    style: css("margin-top:20px;padding:11px 15px;border-radius:13px;background:rgba(87,192,138,.08);border:1px solid rgba(87,192,138,.25);font-size:12px;font-weight:800;color:#57C08A;")
  }, "\u2713 3 sessions queued to sync")), _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("padding:16px;border-radius:17px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:15.5px;")
  }, "Continue offline"), _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("margin-top:12px;text-align:center;font-size:13px;font-weight:800;color:#8E8475;")
  }, "Retry connection"));
}
export function HomeScreen({
  v
}) {
  const {
    isHome,
    ready,
    gyms,
    picksUI,
    home,
    nowT,
    user,
    nav,
    profile,
    mailBadge,
    openProfile
  } = v;
  return isHome && _h("div", {
    className: "screen homeScreen",
    style: css("min-height:838px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "homeHero",
    style: css("position:relative;overflow:hidden;background:radial-gradient(72% 56% at 50% 42%,#3A2C18 0%,#1A1410 58%,#0C0906 100%);")
  }, _h("div", {
    className: "homeStage"
  }, _h("div", {
    style: css("width:100%;max-width:520px;height:100%;")
  }, _h(Body3D, {
    mode: "recovery",
    heat: ready.heat,
    accent: ready.accent,
    background: "transparent",
    autoRotate: true,
    chrome: "mini",
    onPick: ready.onPick,
    height: "100%"
  }))), _h("div", {
    style: css("position:absolute;inset:0;pointer-events:none;background:linear-gradient(to bottom,rgba(12,9,6,.2) 0%,rgba(12,9,6,0) 34%,rgba(12,9,6,0) 46%,rgba(12,9,6,.84) 86%,#0C0906 100%);")
  }), _h("div", {
    style: css("position:relative;background:linear-gradient(to bottom,rgba(10,8,5,.92) 0%,rgba(10,8,5,.78) 46%,rgba(10,8,5,.34) 78%,rgba(10,8,5,0) 100%);padding-bottom:30px;")
  }, _h("div", {
    className: "mob-only",
    style: css("position:relative;display:flex;justify-content:space-between;align-items:flex-start;padding:52px 20px 0;pointer-events:none;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;")
  }, _h("div", {
    className: "press",
    onClick: openProfile,
    style: css("pointer-events:auto;width:42px;height:42px;border-radius:14px;background:rgba(20,16,11,.6);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round")
  }, _h("path", {
    d: "M4 8h16M4 14h11"
  }))), _h("div", {
    style: css("display:flex;gap:10px;align-items:center;")
  }, _h("div", {
    className: "press",
    onClick: profile.inbox,
    style: css("pointer-events:auto;position:relative;width:44px;height:44px;border-radius:15px;background:rgba(20,16,11,.6);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M4 6h16v12H4z"
  }), _h("path", {
    d: "M4 7l8 6 8-6"
  })), _h("div", {
    style: css("position:absolute;top:-5px;right:-5px;min-width:18px;height:18px;border-radius:9px;background:var(--ac);color:var(--ink);font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 5px;")
  }, mailBadge)), _h("div", {
    className: "press",
    onClick: openProfile,
    style: {
      ...css("pointer-events:auto;width:44px;height:44px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:800;font-size:16px;"),
      background: user.tint,
      border: "2px solid " + user.ring,
      color: user.color
    }
  }, user.av))), _h("div", {
    className: "homeHeroHead",
    style: css("position:relative;pointer-events:none;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:700;letter-spacing:2.5px;color:#8E8475;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:.04s;")
  }, "WELCOME, ", user.upper), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:40px;line-height:1.0;letter-spacing:-1.4px;color:#F4ECDD;text-shadow:0 6px 26px rgba(0,0,0,.6);animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:.08s;")
  }, "Let's ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "train.")))), _h("div", {
    className: "homePad",
    style: css("position:absolute;left:0;right:0;bottom:70px;display:flex;flex-wrap:wrap;align-items:center;gap:9px;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:.12s;")
  }, _h("span", {
    style: css("font-size:15px;")
  }, "\uD83D\uDCCD"), gyms.list.map((g, i) => _h("div", {
    key: i,
    className: "press",
    onClick: g.onSelect,
    style: css(g.style)
  }, g.name)), _h("div", {
    className: "press",
    onClick: gyms.onAdd,
    style: css("padding:7px 13px;border-radius:11px;background:rgba(20,16,11,.5);border:1.5px dashed rgba(var(--acr),.45);color:var(--ac);font-size:12px;font-weight:800;")
  }, "+ Add gym"))), _h("div", {
    className: "homePad"
  }, _h("div", {
    style: css("margin-top:-58px;position:relative;z-index:2;border-radius:26px;padding:19px 19px 16px;background:rgba(34,30,24,.94);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.09);box-shadow:0 20px 46px rgba(0,0,0,.5);animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:.16s;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:8px;")
  }, _h("span", {
    style: css("width:7px;height:7px;border-radius:50%;background:var(--ac);")
  }), _h("span", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1.6px;color:#8E8475;")
  }, "READY TO ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "TRAIN?"))), _h("div", {
    className: "sora",
    style: css("margin-top:9px;font-size:19px;font-weight:800;color:#F4ECDD;line-height:1.22;")
  }, ready.verdict), _h("div", {
    style: css("margin-top:6px;font-size:12px;color:#8E8475;font-weight:600;line-height:1.5;text-wrap:pretty;")
  }, ready.sub), _h("div", {
    className: "press",
    onClick: nav.body,
    style: css("margin-top:14px;display:flex;align-items:center;justify-content:space-between;padding-top:13px;border-top:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("font-size:11px;font-weight:800;letter-spacing:.8px;color:var(--ac);")
  }, "\uD83E\uDDCD OPEN BODY LAB \xB7 3D ANATOMY"), _h("span", {
    style: css("color:#6E665B;")
  }, "\u203A"))), home.minimized && _h("div", {
    className: "press",
    onClick: home.resume,
    style: css("margin-top:13px;display:flex;align-items:center;gap:13px;padding:14px 16px;border-radius:18px;background:linear-gradient(135deg,rgba(var(--aclr),.16),rgba(var(--acdr),.10));border:1px solid rgba(var(--acr),.34);animation:pop .4s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("div", {
    style: css("width:38px;height:38px;border-radius:12px;background:rgba(var(--acr),.16);display:flex;align-items:center;justify-content:center;font-size:19px;")
  }, home.minEmoji), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:10px;font-weight:800;letter-spacing:1px;color:var(--ac);")
  }, "SESSION PAUSED \xB7 ", home.minClock), _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, home.minTitle)), _h("div", {
    style: css("display:flex;align-items:center;gap:5px;color:var(--ink);background:linear-gradient(135deg,var(--acl),var(--acd));padding:8px 13px;border-radius:11px;font-size:12px;font-weight:800;flex-shrink:0;")
  }, "Resume \u25B8")), _h("div", {
    style: css("margin-top:24px;display:flex;align-items:center;justify-content:space-between;gap:10px;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "PICK A ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "SESSION")), _h("div", {
    style: css("display:flex;align-items:center;gap:7px;")
  }, picksUI.hasHidden && _h("div", {
    className: "press",
    onClick: picksUI.restore,
    style: css("padding:6px 11px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);font-size:10.5px;font-weight:800;color:#8E8475;")
  }, "\u21BA Restore"), _h("div", {
    className: "press",
    onClick: picksUI.toggle,
    style: css(picksUI.style)
  }, picksUI.label))), _h("div", {
    className: "ilsc",
    style: css("margin-top:13px;display:flex;gap:11px;overflow-x:auto;padding-bottom:2px;")
  }, ready.picks.map((q, i) => _h("div", {
    key: i,
    className: "press",
    onClick: q.onStart,
    style: css(q.cardStyle + "position:relative;")
  }, _h("div", {
    className: "press",
    onClick: q.onFav,
    style: css(q.favStyle)
  }, q.favIcon), _h("div", {
    style: css("font-size:26px;")
  }, q.emoji), _h("div", {
    className: "sora",
    style: {
      ...css("margin-top:11px;font-size:16px;font-weight:800;"),
      color: q.cardFg
    }
  }, q.name), _h("div", {
    style: {
      ...css("margin-top:2px;font-size:10.5px;font-weight:700;"),
      color: q.cardSub
    }
  }, q.sub), _h("div", {
    style: css("margin-top:11px;display:flex;align-items:center;gap:7px;")
  }, _h("div", {
    style: css("display:inline-block;font-size:10px;font-weight:800;padding:5px 10px;border-radius:8px;" + q.tagStyle)
  }, q.tagText), picksUI.editing && _h("div", {
    className: "press",
    onClick: q.onHide,
    style: css("padding:5px 9px;border-radius:8px;background:rgba(226,106,79,.16);border:1px solid rgba(226,106,79,.4);color:#E8B39F;font-size:10px;font-weight:800;")
  }, "\u2212 Remove")))), picksUI.editing && _h("div", {
    className: "press",
    onClick: picksUI.addNew,
    style: css("flex:none;width:166px;border-radius:22px;padding:16px;border:1.5px dashed rgba(var(--acr),.45);background:rgba(var(--acr),.06);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--ac);")
  }, _h("div", {
    style: css("font-size:24px;")
  }, "\uFF0B"), _h("div", {
    style: css("font-size:12px;font-weight:800;text-align:center;line-height:1.3;")
  }, "Add a session", _h("br", null), _h("span", {
    style: css("font-size:10px;font-weight:700;color:#8E8475;")
  }, "from Programs")))), _h("div", {
    style: css("margin-top:26px;font-size:12px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "TODAY'S ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "ACTIVITY")), _h("div", {
    style: css("margin-top:13px;border-radius:28px;padding:21px 22px;background:linear-gradient(150deg,var(--acl) 0%,var(--ac) 55%,var(--acd) 100%);box-shadow:0 18px 40px rgba(var(--acdr),.3);animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:.06s;")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;color:rgba(var(--inkr),.62);font-size:12px;font-weight:700;")
  }, _h("span", null, home.actDate), _h("span", null, home.actTime)), _h("div", {
    style: css("margin:16px 0 6px;display:flex;align-items:baseline;gap:10px;")
  }, _h("span", {
    className: "sora",
    style: css("font-weight:800;font-size:40px;color:var(--ink);letter-spacing:-1px;")
  }, home.actVol), _h("span", {
    style: css("font-weight:700;font-size:16px;color:rgba(var(--inkr),.75);")
  }, "kg this week")), _h("div", {
    style: css("display:inline-flex;align-items:center;gap:6px;background:rgba(var(--inkr),.12);border-radius:10px;padding:5px 11px;font-size:12px;font-weight:800;color:var(--ink);")
  }, "\u25B2 +18% vs last week"), _h("div", {
    style: css("margin-top:18px;display:flex;gap:10px;")
  }, _h("div", {
    style: css("flex:1;background:rgba(255,255,255,.32);border-radius:16px;padding:11px 13px;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:21px;color:var(--ink);")
  }, home.actSets), _h("div", {
    style: css("font-size:10.5px;font-weight:700;color:rgba(var(--inkr),.6);margin-top:2px;")
  }, "Sets")), _h("div", {
    style: css("flex:1;background:rgba(255,255,255,.32);border-radius:16px;padding:11px 13px;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:21px;color:var(--ink);")
  }, home.actDays, _h("span", {
    style: css("font-size:13px;")
  }, "/7")), _h("div", {
    style: css("font-size:10.5px;font-weight:700;color:rgba(var(--inkr),.6);margin-top:2px;")
  }, "Days trained")), _h("div", {
    style: css("flex:1;background:rgba(255,255,255,.32);border-radius:16px;padding:11px 13px;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:21px;color:var(--ink);")
  }, home.actDur), _h("div", {
    style: css("font-size:10.5px;font-weight:700;color:rgba(var(--inkr),.6);margin-top:2px;")
  }, "Time")))), _h("div", {
    style: css("margin-top:26px;display:flex;align-items:center;gap:9px;font-size:12px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, _h("span", {
    style: css("width:8px;height:8px;border-radius:50%;background:#57C08A;animation:pulseDot 1.6s ease infinite;")
  }), "NOW ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "TRAINING")), _h("div", {
    style: css("margin-top:13px;display:flex;flex-direction:column;gap:11px;")
  }, nowT.list.map((nt, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:13px;padding:14px 16px;border-radius:20px;background:#221E18;border:1px solid rgba(87,192,138,.22);")
  }, _h("div", {
    style: css("position:relative;flex-shrink:0;")
  }, _h("div", {
    style: {
      ...css("width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:800;font-size:15px;"),
      background: nt.tint,
      border: "2px solid " + nt.ring,
      color: nt.color
    }
  }, nt.av), _h("div", {
    style: css("position:absolute;right:-3px;bottom:-3px;width:13px;height:13px;border-radius:50%;background:#57C08A;border:2.5px solid #221E18;animation:pulseDot 1.6s ease infinite;")
  })), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, nt.name, " ", _h("span", {
    style: css("color:#57C08A;font-size:10.5px;font-weight:800;")
  }, "\u25CF LIVE")), _h("div", {
    style: css("font-size:12px;color:#8E8475;font-weight:600;margin-top:2px;")
  }, nt.workout, " \xB7 ", nt.gym)), _h("div", {
    style: css("text-align:right;flex-shrink:0;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:15px;font-weight:800;color:#57C08A;")
  }, nt.clock), _h("div", {
    style: css("font-size:10px;color:#8E8475;font-weight:700;")
  }, nt.sets, " sets")))), _h("div", {
    className: "press",
    onClick: nav.inbox,
    style: css("display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 14px;border-radius:15px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:11.5px;font-weight:700;color:#8E8475;")
  }, "Manage who pings you when they train"), _h("span", {
    style: css("font-size:11px;font-weight:800;color:var(--ac);")
  }, "Social \u203A"))), _h("div", {
    style: css("margin-top:26px;font-size:12px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "PREVIOUS ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "WORKOUTS")), _h("div", {
    style: css("margin-top:13px;display:grid;grid-template-columns:1fr 1fr;gap:13px;")
  }, home.prev.map((s, i) => _h("div", {
    key: i,
    className: "press",
    onClick: s.onOpen,
    style: css("border-radius:22px;padding:17px 15px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:center;")
  }, _h("div", {
    style: css("font-size:10px;font-weight:800;letter-spacing:1.2px;color:#8E8475;")
  }, s.when), _h("span", {
    style: css("font-size:16px;")
  }, s.emoji)), _h("svg", {
    viewBox: "0 0 90 24",
    preserveAspectRatio: "none",
    style: css("width:100%;height:22px;margin:10px 0;overflow:visible;")
  }, _h("polyline", {
    points: s.spark,
    style: css("fill:none;stroke:var(--ac);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")
  })), _h("div", {
    style: css("font-size:10px;font-weight:700;color:#8E8475;")
  }, s.tag, " ", _h("span", {
    style: css("color:#F4ECDD;")
  }, s.tagVal)), _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:23px;margin-top:7px;color:#F4ECDD;")
  }, s.mins, " ", _h("span", {
    style: css("font-size:13px;font-weight:600;color:#A99E8C;")
  }, "min")), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;")
  }, s.level))))));
}
export function BodyLabScreen({
  v
}) {
  const {
    isBody,
    bodyLab,
    nav,
    user,
    openProfile
  } = v;
  return isBody && _h("div", {
    className: "screen homeScreen",
    "data-screen-label": "Body Lab",
    style: css("animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "homeHero",
    style: css("position:relative;overflow:hidden;background:radial-gradient(72% 56% at 50% 42%,#3A2C18 0%,#1A1410 58%,#0C0906 100%);")
  }, _h("div", {
    className: "homeStage"
  }, _h("div", {
    style: css("width:100%;max-width:520px;height:100%;")
  }, _h(Body3D, {
    tag: "lab",
    mode: bodyLab.mode3d,
    heat: bodyLab.heat,
    accent: bodyLab.accent,
    background: "transparent",
    selected: bodyLab.sel,
    autoRotate: bodyLab.autoRotate,
    onPick: bodyLab.onPick,
    onPartPick: bodyLab.onPartPick,
    onReady: bodyLab.onReady,
    height: "100%"
  }))), _h("div", {
    style: css("position:absolute;inset:0;pointer-events:none;background:linear-gradient(to bottom,rgba(12,9,6,.2) 0%,rgba(12,9,6,0) 34%,rgba(12,9,6,0) 46%,rgba(12,9,6,.84) 86%,#0C0906 100%);")
  }), _h("div", {
    style: css("position:relative;background:linear-gradient(to bottom,rgba(10,8,5,.92) 0%,rgba(10,8,5,.78) 46%,rgba(10,8,5,.34) 78%,rgba(10,8,5,0) 100%);padding-bottom:30px;")
  }, _h("div", {
    className: "mob-only",
    style: css("position:relative;display:flex;justify-content:space-between;align-items:flex-start;padding:52px 20px 0;pointer-events:none;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("pointer-events:auto;width:42px;height:42px;border-radius:14px;background:rgba(20,16,11,.6);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "press",
    onClick: openProfile,
    style: {
      ...css("pointer-events:auto;width:44px;height:44px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:800;font-size:16px;"),
      background: user.tint,
      border: `2px solid ${user.ring}`,
      color: user.color
    }
  }, user.av)), _h("div", {
    className: "homeHeroHead",
    style: css("position:relative;pointer-events:none;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:700;letter-spacing:2.5px;color:#8E8475;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:.04s;")
  }, "INTERACTIVE ANATOMY"), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:40px;line-height:1.0;letter-spacing:-1.4px;color:#F4ECDD;text-shadow:0 6px 26px rgba(0,0,0,.6);animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:.08s;")
  }, "Body ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "Lab")))), _h("div", {
    className: "homePad bodyToggle",
    style: css("position:absolute;left:0;right:104px;bottom:76px;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:.12s;")
  }, _h("div", {
    style: css("display:flex;gap:4px;background:rgba(20,16,11,.72);border:1px solid rgba(255,255,255,.12);border-radius:15px;padding:4px;backdrop-filter:blur(10px);max-width:340px;")
  }, bodyLab.modes.map((bm, i) => _h("div", {
    key: i,
    className: "press",
    onClick: bm.onClick,
    style: css(bm.style)
  }, bm.label))))), _h("div", {
    className: "homePad"
  }, bodyLab.showHint && _h("div", {
    style: css("margin-top:14px;text-align:center;font-size:12.5px;color:#8E8475;font-weight:600;")
  }, "Rotate the body 360\xB0 \xB7 tap any muscle to zoom into its heads"), bodyLab.hasSel && _h("div", {
    style: css("margin-top:-58px;position:relative;z-index:2;border-radius:24px;background:rgba(34,30,24,.95);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(var(--acr),.25);padding:19px 18px;box-shadow:0 20px 44px rgba(0,0,0,.5);animation:pop .35s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:flex-start;gap:10px;")
  }, _h("div", null, _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;color:#F4ECDD;")
  }, bodyLab.selName), _h("div", {
    style: css("font-size:11.5px;color:#8E8475;font-weight:700;font-style:italic;margin-top:2px;")
  }, bodyLab.selLatin)), _h("div", {
    style: css("display:flex;align-items:center;gap:8px;flex-shrink:0;")
  }, _h("div", {
    style: css(bodyLab.selStatusStyle)
  }, bodyLab.selStatus), _h("div", {
    className: "press",
    onClick: bodyLab.close,
    style: css("width:30px;height:30px;border-radius:10px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#A99E8C;font-size:14px;")
  }, "\u2715"))), _h("div", {
    style: css("margin-top:10px;font-size:13px;color:#C9BEAD;font-weight:500;line-height:1.5;")
  }, bodyLab.selBlurb), _h("div", {
    style: css("margin-top:16px;font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "MUSCLE HEADS \u2014 TAP ON THE BODY OR BELOW"), _h("div", {
    style: css("margin-top:10px;display:flex;flex-direction:column;gap:8px;")
  }, bodyLab.parts.map((pt, i) => _h("div", {
    key: i,
    className: "press",
    onClick: pt.onPick,
    style: css(pt.style)
  }, _h("div", {
    style: {
      ...css("width:12px;height:12px;border-radius:4px;flex-shrink:0;"),
      background: pt.dot,
      boxShadow: `0 0 8px ${pt.glow}`
    }
  }), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, pt.name), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;margin-top:1px;")
  }, pt.latin, " \xB7 ", pt.tip))))), _h("div", {
    style: css("margin-top:16px;font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "EXERCISES FOR THIS MUSCLE"), _h("div", {
    style: css("margin-top:10px;display:flex;flex-direction:column;gap:8px;")
  }, bodyLab.exs.map((bx, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:11px;padding:10px 13px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.05);border-radius:13px;")
  }, _h("div", {
    style: css("flex:1;font-size:13px;font-weight:700;color:#F4ECDD;")
  }, bx.name), _h("div", {
    className: "press",
    onClick: bx.onHow,
    style: css("padding:6px 11px;border-radius:9px;background:rgba(var(--acr),.12);color:var(--ac);font-size:11px;font-weight:800;")
  }, "\uD83D\uDCCB How to"))))), bodyLab.isRecovery && _h(_F, null, _h("div", {
    style: css("margin-top:16px;display:flex;align-items:center;gap:11px;padding:12px 14px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("flex:1;height:9px;border-radius:5px;background:linear-gradient(90deg,#7E1710,#B5301E,#D9634A,#EBA593,#F2EDE4);")
  })), _h("div", {
    style: css("margin-top:6px;display:flex;justify-content:space-between;font-size:10px;font-weight:800;letter-spacing:1px;color:#8E8475;")
  }, _h("span", null, "SORE"), _h("span", null, "RECOVERING"), _h("span", null, "RESTED")), _h("div", {
    style: css("margin-top:20px;font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "RECOVERING ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "MUSCLES")), bodyLab.hasFlag && _h("div", {
    style: css("margin-top:12px;display:flex;flex-direction:column;gap:9px;")
  }, bodyLab.flagged.map((f, i) => _h("div", {
    key: i,
    style: css("border-radius:16px;padding:13px 15px;background:linear-gradient(150deg,rgba(226,106,79,.13),rgba(226,106,79,.04));border:1.5px solid rgba(226,106,79,.35);")
  }, _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;gap:10px;")
  }, _h("div", null, _h("div", {
    style: css("font-size:13.5px;font-weight:800;color:#F4ECDD;")
  }, "\u26A0 ", f.name, " \u2014 chronically under-recovered"), _h("div", {
    style: css("font-size:11px;color:#E8B39F;font-weight:700;margin-top:3px;")
  }, "Trained ", f.sessions, "\xD7 in ", f.days, " days \xB7 currently only ", f.pct, "% recovered")), _h("div", {
    className: "press",
    onClick: f.onEase,
    style: css("flex-shrink:0;font-size:10.5px;font-weight:800;color:#1A1208;background:linear-gradient(135deg,#F8C95E,#E6822A);padding:7px 11px;border-radius:9px;")
  }, "Ease off"))))), bodyLab.hasRec && _h("div", {
    className: "stagger",
    style: css("margin-top:12px;display:flex;flex-direction:column;gap:10px;")
  }, bodyLab.recList.map((rl, i) => _h("div", {
    key: i,
    className: "press",
    onClick: rl.onClick,
    style: css(rl.style)
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, rl.name), _h("div", {
    className: "sora",
    style: {
      ...css("font-size:12.5px;font-weight:800;"),
      color: rl.color
    }
  }, rl.status)), _h("div", {
    style: css("height:9px;border-radius:5px;background:linear-gradient(90deg,#7E1710,#B5301E 30%,#D9634A 55%,#EBA593 78%,#F2EDE4);position:relative;overflow:hidden;")
  }, _h("div", {
    style: {
      ...css("position:absolute;top:0;bottom:0;right:0;background:rgba(14,11,7,.85);"),
      left: rl.pct
    }
  }), _h("div", {
    style: {
      ...css("position:absolute;top:-2px;bottom:-2px;width:4px;border-radius:2px;background:#F4ECDD;box-shadow:0 0 7px rgba(0,0,0,.65);"),
      left: rl.markerLeft
    }
  })), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;margin-top:8px;")
  }, rl.meta)))), bodyLab.noRec && _h("div", {
    style: css("margin-top:12px;border-radius:20px;background:#221E18;border:1px solid rgba(255,255,255,.06);padding:22px;text-align:center;")
  }, _h("div", {
    style: css("font-size:26px;")
  }, "\uD83D\uDCA4"), _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;margin-top:8px;")
  }, "No recent training data"), _h("div", {
    style: css("font-size:12px;color:#8E8475;font-weight:600;margin-top:4px;")
  }, "Finish a workout and recovery shows up here.")))));
}
export function ProgramsScreen({
  v
}) {
  const {
    isPrograms,
    nav,
    openProfile,
    user,
    programs
  } = v;
  return isPrograms && _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "mob-only",
    style: css("display:flex;justify-content:space-between;align-items:flex-start;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "press",
    onClick: openProfile,
    style: css("width:46px;height:46px;border-radius:15px;background:" + user.tint + ";border:2px solid " + user.ring + ";display:flex;align-items:center;justify-content:center;color:" + user.color + ";font-family:'Sora',sans-serif;font-weight:800;font-size:16px;")
  }, user.av)), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:flex-end;justify-content:space-between;gap:14px;")
  }, _h("div", null, _h("div", {
    style: css("font-size:12px;font-weight:700;letter-spacing:2.5px;color:#8E8475;")
  }, "YOUR LIBRARY"), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:40px;line-height:1;letter-spacing:-1.2px;color:#F4ECDD;")
  }, "Your ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "Programs"))), _h("div", {
    className: "press",
    onClick: programs.newProgram,
    style: css("flex-shrink:0;padding:12px 17px;border-radius:15px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-family:'Sora',sans-serif;font-weight:800;font-size:13px;box-shadow:0 12px 26px rgba(var(--acdr),.3);")
  }, "\uFF0B New")), programs.hasHero && _h("div", {
    className: "press",
    onClick: programs.hero.onStart,
    style: {
      ...css(programs.hero.cardStyle),
      marginTop: "20px"
    }
  }, _h("div", {
    style: css("font-size:10px;font-weight:800;letter-spacing:1.6px;color:" + programs.hero.muted + ";")
  }, "CONTINUE"), _h("div", {
    style: css("margin-top:10px;display:flex;align-items:center;gap:14px;")
  }, _h("svg", {
    width: "46",
    height: "46",
    viewBox: "0 0 44 44",
    style: css("transform:rotate(-90deg);flex-shrink:0;")
  }, _h("circle", {
    cx: "22",
    cy: "22",
    r: "17",
    style: css("fill:none;stroke:" + programs.hero.track + ";stroke-width:4")
  }), _h("circle", {
    cx: "22",
    cy: "22",
    r: "17",
    style: css("fill:none;stroke:" + programs.hero.ring + ";stroke-width:4;stroke-linecap:round"),
    strokeDasharray: programs.hero.dash
  })), _h("div", {
    style: css("min-width:0;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:19px;color:" + programs.hero.titleColor + ";line-height:1.15;")
  }, programs.hero.titleA, " ", _h("b", {
    style: css("font-weight:800;")
  }, programs.hero.titleB)), _h("div", {
    style: css("font-size:11px;font-weight:700;color:" + programs.hero.muted + ";margin-top:3px;")
  }, programs.hero.prog, " \xB7 ", programs.hero.pct, " complete"))), _h("div", {
    style: css("margin-top:14px;text-align:center;padding:11px 0;border-radius:13px;background:rgba(var(--inkr),.9);color:var(--acl);font-weight:800;font-size:13px;font-family:'Sora',sans-serif;")
  }, programs.hero.emoji, " Start ", programs.hero.titleB)), _h("div", {
    style: css("margin-top:28px;font-size:11px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "JUMP INTO A WORKOUT"), _h("div", {
    style: css("margin-top:14px;display:flex;align-items:center;gap:22px;")
  }, programs.tabs.map((t, i) => _h("div", {
    key: i,
    className: "press",
    onClick: t.onClick,
    style: css("position:relative;font-size:13px;font-weight:800;letter-spacing:1px;color:" + t.color + ";")
  }, t.label, t.active && _h("div", {
    style: css("position:absolute;left:50%;transform:translateX(-50%);bottom:-9px;width:5px;height:5px;border-radius:50%;background:var(--ac);animation:pop .3s cubic-bezier(.34,1.4,.5,1) both;")
  })))), _h("div", {
    className: "ilsc",
    style: css("margin-top:14px;display:flex;gap:13px;overflow-x:auto;padding-bottom:4px;")
  }, programs.cards.map((p, i) => _h("div", {
    key: i,
    className: "press",
    onClick: p.onStart,
    style: {
      ...css(p.cardStyle),
      ...css("flex:none;width:198px;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;"),
      animationDelay: p.delay
    }
  }, _h("div", {
    style: css("display:flex;align-items:flex-start;justify-content:space-between;gap:8px;")
  }, _h("div", {
    style: css("width:42px;height:42px;border-radius:14px;background:" + p.iconBg + ";display:flex;align-items:center;justify-content:center;font-size:21px;")
  }, p.emoji), _h("div", {
    style: css(p.badgeStyle)
  }, p.badge)), _h("div", {
    className: "sora",
    style: css("margin-top:16px;font-weight:500;font-size:17px;color:" + p.titleColor + ";line-height:1.12;")
  }, p.titleA, _h("br", null), _h("b", {
    style: css("font-weight:800;")
  }, p.titleB)), _h("div", {
    style: css("margin-top:13px;font-size:9.5px;font-weight:800;letter-spacing:1px;color:" + p.muted + ";")
  }, "PROGRESS ", _h("span", {
    style: css("color:" + p.titleColor + ";")
  }, p.prog)), _h("div", {
    style: css("margin-top:6px;height:3px;border-radius:3px;background:" + p.track + ";overflow:hidden;")
  }, _h("div", {
    style: css("height:100%;border-radius:3px;width:" + p.barW + ";background:" + p.bar + ";")
  })), _h("div", {
    style: css("margin-top:13px;display:flex;align-items:center;gap:10px;")
  }, _h("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 44 44",
    style: css("transform:rotate(-90deg)")
  }, _h("circle", {
    cx: "22",
    cy: "22",
    r: "17",
    style: css("fill:none;stroke:" + p.track + ";stroke-width:4")
  }), _h("circle", {
    cx: "22",
    cy: "22",
    r: "17",
    style: css("fill:none;stroke:" + p.ring + ";stroke-width:4;stroke-linecap:round"),
    strokeDasharray: p.dash
  })), _h("div", null, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:14px;color:" + p.titleColor + ";")
  }, p.pct), _h("div", {
    style: css("font-size:9px;font-weight:700;color:" + p.muted + ";")
  }, "completed")))))), _h("div", {
    style: css("margin-top:30px;font-size:11px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "YOUR LIBRARY"), _h("div", {
    style: css("margin-top:14px;display:flex;background:rgba(255,255,255,.05);border-radius:15px;padding:4px;gap:4px;")
  }, programs.scopes.map((sp, i) => _h("div", {
    key: i,
    className: "press",
    onClick: sp.onClick,
    style: css(sp.style)
  }, sp.label))), _h("div", {
    style: css("margin-top:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;")
  }, programs.typeChips.map((tc, i) => _h("div", {
    key: i,
    className: "press",
    onClick: tc.onClick,
    style: css(tc.style)
  }, tc.label)), _h("div", {
    className: "press",
    onClick: programs.byMuscle,
    style: css("display:inline-flex;align-items:center;gap:7px;padding:9px 14px;border-radius:12px;background:rgba(var(--acr),.1);border:1.5px dashed rgba(var(--acr),.45);color:var(--ac);font-size:12px;font-weight:800;")
  }, "\uD83E\uDDCD Build by muscle")), _h("div", {
    style: css("margin-top:20px;display:flex;flex-direction:column;gap:12px;")
  }, programs.list.map((pr, i) => _h("div", {
    key: i,
    style: {
      ...css("border-radius:24px;background:#211C15;border:1px solid rgba(255,255,255,.06);padding:15px;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;"),
      animationDelay: pr.delay
    }
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:12px;flex-wrap:wrap;")
  }, _h("div", {
    style: css("width:46px;height:46px;border-radius:15px;background:rgba(var(--acr),.13);display:flex;align-items:center;justify-content:center;font-size:23px;flex-shrink:0;")
  }, pr.emoji), _h("div", {
    style: css("flex:1 1 130px;min-width:0;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:16px;color:#F4ECDD;")
  }, pr.name), _h("div", {
    style: css("font-size:11.5px;color:#8E8475;font-weight:600;margin-top:2px;")
  }, pr.sub)), _h("div", {
    style: css("display:flex;align-items:center;gap:6px;flex-shrink:0;margin-left:auto;")
  }, _h("div", {
    style: css("width:30px;height:30px;border-radius:10px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:13px;")
  }, pr.typeIcon), pr.isPublic && _h("div", {
    style: css("padding:6px 9px;border-radius:9px;background:rgba(var(--acr),.14);color:var(--ac);font-size:9.5px;font-weight:800;letter-spacing:.6px;")
  }, "PUBLIC"), pr.isMine && _h("div", {
    className: "press",
    onClick: pr.onEdit,
    style: css("width:32px;height:32px;border-radius:10px;background:rgba(var(--acr),.13);display:flex;align-items:center;justify-content:center;font-size:14px;")
  }, "\u270F\uFE0F"), _h("div", {
    className: "press",
    onClick: pr.onToggle,
    style: css(pr.chevStyle)
  }, "\u25BE"))), pr.open && _h("div", {
    style: css("margin-top:14px;display:flex;flex-direction:column;gap:10px;animation:pop .3s ease both;")
  }, pr.workouts.map((pw, j) => _h("div", {
    key: j,
    style: css("background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.05);border-radius:17px;padding:13px 14px;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:9px;")
  }, _h("div", {
    style: css("font-size:19px;")
  }, pw.emoji), _h("div", {
    className: "sora",
    style: css("flex:1;min-width:0;font-weight:800;font-size:14px;color:#F4ECDD;")
  }, pw.name), _h("div", {
    style: css("font-size:10px;font-weight:800;color:#8E8475;letter-spacing:.5px;")
  }, pw.count), _h("div", {
    className: "press",
    onClick: pw.onStart,
    style: css("padding:8px 15px;border-radius:11px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-size:12px;font-weight:800;font-family:'Sora',sans-serif;")
  }, "Start")), _h("div", {
    style: css("margin-top:11px;display:flex;flex-direction:column;gap:7px;")
  }, pw.rows.map((pe, k) => _h("div", {
    key: k
  }, pe.isSS && _h("div", {
    style: css("padding:9px 11px;border-radius:12px;background:rgba(var(--acr),.06);border:1px solid rgba(var(--acr),.2);")
  }, _h("div", {
    style: css("font-size:9px;font-weight:800;color:var(--ac);letter-spacing:.8px;")
  }, "\uD83D\uDD17 SUPERSET"), _h("div", {
    style: css("margin-top:7px;display:flex;flex-direction:column;gap:6px;")
  }, pe.exs.map((px, m) => _h("div", {
    key: m,
    style: css("display:flex;align-items:center;gap:9px;")
  }, _h("div", {
    style: css("width:2px;height:13px;border-radius:2px;background:rgba(var(--acr),.55);flex-shrink:0;")
  }), _h("div", {
    style: css("flex:1;min-width:0;font-size:12.5px;font-weight:700;color:#F4ECDD;")
  }, px.name), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:700;")
  }, px.reps))))), pe.isPlain && _h("div", {
    style: css("display:flex;align-items:center;gap:9px;padding:0 3px;")
  }, _h("div", {
    style: css("width:6px;height:6px;border-radius:50%;background:var(--ac);flex-shrink:0;")
  }), _h("div", {
    style: css("flex:1;min-width:0;font-size:12.5px;font-weight:700;color:#F4ECDD;")
  }, pe.name), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:700;")
  }, pe.reps))))))), pr.isMine && _h("div", {
    className: "press",
    onClick: pr.onTogglePub,
    style: css("display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:15px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.05);")
  }, _h("div", {
    style: css(pr.switchStyle)
  }, _h("div", {
    style: css(pr.knobStyle)
  })), _h("div", {
    style: css("font-size:12.5px;font-weight:700;color:#A99E8C;")
  }, pr.pubLabel)), pr.canAdd && _h("div", {
    className: "press",
    onClick: pr.onAddToAccount,
    style: css("text-align:center;padding:13px;border-radius:15px;border:1.5px dashed rgba(var(--acr),.45);color:var(--ac);font-size:13px;font-weight:800;")
  }, "\uFF0B Add to My Programs"))))), programs.empty && _h("div", {
    style: css("margin-top:14px;text-align:center;padding:36px 18px;border-radius:24px;border:1px dashed rgba(255,255,255,.09);")
  }, _h("div", {
    style: css("font-size:38px;")
  }, "\uD83D\uDCCB"), _h("div", {
    style: css("margin-top:11px;font-size:13.5px;font-weight:800;color:#A99E8C;")
  }, programs.emptyMsg)));
}
export function ExercisesScreen({
  v
}) {
  const {
    nav,
    openProfile,
    user,
    guide,
    bodyLab
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "mob-only",
    style: css("display:flex;justify-content:space-between;align-items:flex-start;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "press",
    onClick: openProfile,
    style: {
      ...css("width:46px;height:46px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:800;font-size:16px;"),
      background: user.tint,
      border: "2px solid " + user.ring,
      color: user.color
    }
  }, user.av)), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;")
  }, _h("div", null, _h("div", {
    style: css("font-size:12px;font-weight:700;letter-spacing:2.5px;color:#8E8475;")
  }, "EXERCISE LIBRARY"), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:40px;line-height:1;letter-spacing:-1.2px;color:#F4ECDD;")
  }, "Exercises ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "guide"))), _h("div", {
    style: css("display:flex;gap:3px;padding:3px;border-radius:12px;background:rgba(255,255,255,.05);flex-shrink:0;")
  }, _h("div", {
    className: "press",
    onClick: guide.modeBody,
    style: css(guide.modeBodyStyle)
  }, "\uD83E\uDDCD Body"), _h("div", {
    className: "press",
    onClick: guide.modeList,
    style: css(guide.modeListStyle)
  }, "\u2630 List"))), guide.showBody && _h(_F, null, _h("div", {
    style: css("margin-top:16px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.07);box-shadow:0 18px 44px rgba(0,0,0,.32);")
  }, _h("div", {
    style: css("width:100%;height:320px;background:radial-gradient(72% 60% at 50% 40%,#3A2C18 0%,#1A1410 58%,#0C0906 100%);")
  }, _h(Body3D, {
    mode: "explore",
    accent: bodyLab.accent,
    background: "transparent",
    selected: guide.sel3d,
    autoRotate: true,
    onPick: guide.onPick3d,
    height: "320px"
  }))), _h("div", {
    style: css("margin-top:10px;text-align:center;font-size:12px;color:#8E8475;font-weight:600;")
  }, "Rotate 360\xB0 \xB7 tap any muscle to filter the list below"), guide.hasGroup && _h(_F, null, _h("div", {
    style: css("margin-top:8px;display:flex;justify-content:center;")
  }, _h("span", {
    style: css("padding:6px 12px;border-radius:9px;background:rgba(var(--acr),.14);color:var(--ac);font-size:11.5px;font-weight:800;")
  }, "\uD83C\uDFAF Filtered to ", guide.groupName)))), _h("input", {
    value: guide.q,
    onChange: guide.onQ,
    placeholder: "Search exercises\u2026",
    style: css("margin-top:16px;width:100%;padding:13px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.08);border-radius:14px;color:#F4ECDD;font-size:13.5px;font-weight:600;outline:none;display:block;")
  }), _h("div", {
    style: css("margin-top:14px;display:flex;flex-wrap:wrap;gap:7px;")
  }, guide.typeChips.map((c, i) => _h("div", {
    key: i,
    className: "press",
    onClick: c.onClick,
    style: css(c.style)
  }, c.label))), _h("div", {
    className: "ilsc",
    style: css("margin-top:9px;display:flex;flex-wrap:wrap;gap:6px;")
  }, guide.groupChips.map((c, i) => _h("div", {
    key: i,
    className: "press",
    onClick: c.onClick,
    style: css(c.style)
  }, c.label))), _h("div", {
    className: "ilsc",
    style: css("margin-top:9px;display:flex;flex-wrap:wrap;gap:6px;")
  }, guide.equipChips.map((c, i) => _h("div", {
    key: i,
    className: "press",
    onClick: c.onClick,
    style: css(c.style)
  }, c.label))), _h("div", {
    style: css("margin-top:9px;font-size:11px;font-weight:700;color:#6E665B;")
  }, guide.count, " exercises"), _h("div", {
    style: css("margin-top:12px;display:flex;flex-direction:column;gap:9px;")
  }, guide.list.map((e, i) => _h("div", {
    key: i,
    className: "press",
    onClick: e.onHow,
    style: css("display:flex;align-items:center;gap:12px;padding:14px 15px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: {
      ...css("width:10px;height:10px;border-radius:3px;flex-shrink:0;"),
      background: e.dot
    }
  }), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:6px;")
  }, _h("span", {
    style: css("font-size:13.5px;font-weight:800;color:#F4ECDD;")
  }, e.name), e.cali && _h(_F, null, _h("span", {
    style: css("font-size:13px;")
  }, "\uD83E\uDD38"))), _h("div", {
    style: css("font-size:10.5px;font-weight:700;color:#8E8475;margin-top:2px;")
  }, e.meta)), _h("div", {
    style: css("font-size:10.5px;font-weight:800;color:var(--ac);flex-shrink:0;")
  }, "How-to \u25B6"))), guide.empty && _h(_F, null, _h("div", {
    style: css("text-align:center;padding:30px;color:#8E8475;font-size:12.5px;font-weight:600;")
  }, "No exercises match those filters."))));
}
export function StatsScreen({
  v
}) {
  const {
    nav,
    openProfile,
    user,
    stats,
    statsDrill,
    statsVolume
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "mob-only",
    style: css("display:flex;justify-content:space-between;align-items:flex-start;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "press",
    onClick: openProfile,
    style: css(`width:46px;height:46px;border-radius:15px;background:${user.tint};border:2px solid ${user.ring};display:flex;align-items:center;justify-content:center;color:${user.color};font-family:'Sora',sans-serif;font-weight:800;font-size:16px;`)
  }, user.av)), _h("div", {
    style: css("margin-top:22px;font-size:12px;font-weight:700;letter-spacing:2.5px;color:#8E8475;")
  }, "YOUR PROGRESS"), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:40px;line-height:1;letter-spacing:-1.2px;color:#F4ECDD;")
  }, "Training ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "insights")), _h("div", {
    style: css("margin-top:18px;display:flex;gap:4px;padding:4px;border-radius:15px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.06);")
  }, stats.ranges.map((r, i) => _h("div", {
    key: i,
    className: "press",
    onClick: r.pick,
    style: css(`flex:1;text-align:center;padding:9px 0;border-radius:11px;font-size:12px;font-weight:800;letter-spacing:.5px;background:${r.bg};color:${r.fg};transition:background .2s;`)
  }, r.label))), _h("div", {
    style: css("margin-top:14px;border-radius:26px;padding:21px;background:linear-gradient(150deg,var(--acl),var(--ac) 60%,var(--acd));box-shadow:0 18px 40px rgba(var(--acdr),.3);animation:rise .5s ease both;")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:flex-end;")
  }, _h("div", null, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:30px;color:var(--ink);line-height:1;")
  }, stats.totalVol), _h("div", {
    style: css("font-size:12px;font-weight:700;color:rgba(var(--inkr),.62);margin-top:4px;")
  }, stats.heroSub)), _h("div", {
    style: css("font-size:12px;font-weight:800;color:rgba(var(--inkr),.8);background:rgba(255,255,255,.4);padding:5px 11px;border-radius:10px;")
  }, "\u25B2 ", stats.delta)), _h("svg", {
    viewBox: "0 0 300 110",
    preserveAspectRatio: "none",
    style: css("width:100%;height:108px;margin-top:14px;overflow:visible;")
  }, _h("path", {
    d: stats.area,
    style: css("fill:rgba(255,255,255,.25)")
  }), _h("path", {
    d: stats.line,
    style: css("fill:none;stroke:#fff;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round")
  })), _h("div", {
    style: css("display:flex;justify-content:space-between;margin-top:4px;")
  }, stats.rangeLabels.map((l, i) => _h("span", {
    key: i,
    style: css("font-size:10px;font-weight:800;color:rgba(var(--inkr),.55);")
  }, l.t)))), _h("div", {
    style: css("margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:9px;")
  }, stats.tiles.map((t, i) => _h("div", {
    key: i,
    style: css("background:#221E18;border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:14px 12px;")
  }, _h("div", {
    className: "sora",
    style: css(`font-size:22px;font-weight:800;color:${t.fg};line-height:1;`)
  }, t.n), _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.9px;color:#8E8475;margin-top:6px;")
  }, t.l)))), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "CONSISTENCY ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "& STREAK"))), _h("div", {
    style: css("margin-top:13px;border-radius:22px;padding:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:14px;")
  }, _h("div", {
    style: css("width:54px;height:54px;border-radius:18px;background:rgba(var(--acr),.14);display:flex;align-items:center;justify-content:center;font-size:26px;")
  }, "\uD83D\uDD25"), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("display:flex;align-items:baseline;gap:7px;")
  }, _h("span", {
    className: "sora",
    style: css("font-size:26px;font-weight:800;color:#F4ECDD;line-height:1;")
  }, stats.streakCur), _h("span", {
    style: css("font-size:13px;font-weight:700;color:#A99E8C;")
  }, "day streak")), _h("div", {
    style: css("font-size:11.5px;font-weight:700;color:#8E8475;margin-top:4px;")
  }, "Best ever ", stats.streakBest, " days \xB7 ", stats.weekDone, "/", stats.weekGoal, " sessions this week")), _h("div", {
    style: css("position:relative;width:52px;height:52px;flex-shrink:0;")
  }, _h("svg", {
    viewBox: "0 0 40 40",
    style: css("width:52px;height:52px;transform:rotate(-90deg);")
  }, _h("circle", {
    cx: "20",
    cy: "20",
    r: "16",
    style: css("fill:none;stroke:rgba(255,255,255,.08);stroke-width:5;")
  }), _h("circle", {
    cx: "20",
    cy: "20",
    r: "16",
    style: css(`fill:none;stroke:var(--ac);stroke-width:5;stroke-linecap:round;stroke-dasharray:${stats.weekDash};`)
  })), _h("div", {
    style: css("position:absolute;inset:0;display:flex;align-items:center;justify-content:center;")
  }, _h("span", {
    className: "sora",
    style: css("font-size:12px;font-weight:800;color:var(--ac);")
  }, stats.weekPct)))), _h("div", {
    style: css("margin-top:18px;height:1px;background:rgba(255,255,255,.06);")
  }), _h("div", {
    style: css("margin-top:16px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    className: "press",
    onClick: stats.calPrev,
    style: css("width:30px;height:30px;border-radius:10px;background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;color:#A99E8C;font-size:14px;font-weight:800;")
  }, "\u2039"), _h("div", {
    className: "sora",
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, stats.calTitle), _h("div", {
    className: "press",
    onClick: stats.calNext,
    style: css("width:30px;height:30px;border-radius:10px;background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;color:#A99E8C;font-size:14px;font-weight:800;")
  }, "\u203A")), _h("div", {
    style: css("margin-top:11px;display:grid;grid-template-columns:repeat(7,1fr);gap:3px;")
  }, stats.calHead.map((d, i) => _h("div", {
    key: i,
    style: css("text-align:center;font-size:8.5px;font-weight:800;letter-spacing:.4px;color:#6F6659;")
  }, d.t))), _h("div", {
    style: css("margin-top:5px;display:grid;grid-template-columns:repeat(7,1fr);gap:3px;")
  }, stats.cal.map((d, i) => _h("div", {
    key: i,
    className: "sora",
    style: css(`height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:${d.lvl ? 800 : 700};color:${d.fg};background:${d.bg};${d.ring}`)
  }, d.n))), _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:center;margin-top:14px;")
  }, _h("span", {
    style: css("font-size:10px;font-weight:700;color:#6F6659;")
  }, stats.calCount, " sessions this month"), _h("div", {
    style: css("display:flex;align-items:center;gap:5px;")
  }, _h("div", {
    style: css("width:10px;height:10px;border-radius:3px;background:rgba(var(--acr),.75);")
  }), _h("span", {
    style: css("font-size:10px;font-weight:700;color:#6F6659;")
  }, "trained")))), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "MUSCLE ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "SPLIT"))), _h("div", {
    style: css("margin-top:13px;border-radius:22px;padding:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);display:flex;flex-direction:column;gap:13px;")
  }, stats.muscles.map((m, i) => _h("div", {
    key: i
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;")
  }, _h("span", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, m.name), _h("span", {
    style: css("font-size:12px;font-weight:700;color:#8E8475;")
  }, m.kg, " \xB7 ", m.pct)), _h("div", {
    style: css("height:9px;border-radius:5px;background:rgba(255,255,255,.05);overflow:hidden;")
  }, _h("div", {
    style: css(`height:100%;border-radius:5px;width:${m.w};background:${m.fill};`)
  })))), _h("div", {
    style: css("font-size:11px;font-weight:700;color:#8E8475;")
  }, stats.muscleNote)), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "TAP A ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "MUSCLE"))), _h("div", {
    style: css("margin-top:13px;border-radius:22px;overflow:hidden;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("display:flex;justify-content:center;padding:8px 0 0;")
  }, _h("div", {
    style: css("width:100%;max-width:258px;height:344px;")
  }, _h(Body3D, {
    tag: "statsDrill",
    chrome: "mini",
    mode: "recovery",
    heat: statsDrill.heat,
    accent: statsDrill.accent,
    background: "transparent",
    selected: statsDrill.sel,
    autoRotate: true,
    onPick: statsDrill.onPick,
    height: "344px"
  }))), _h("div", {
    style: css("padding:15px 17px;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:9px;min-height:20px;")
  }, statsDrill.hasSel && _h(_F, null, _h("span", {
    className: "sora",
    style: css("font-size:14.5px;font-weight:800;color:#F4ECDD;")
  }, statsDrill.name), _h("span", {
    className: "sora",
    style: css(`font-size:11.5px;font-weight:800;color:${statsDrill.statusColor};`)
  }, statsDrill.status), _h("div", {
    className: "press",
    onClick: statsDrill.clearSel,
    style: css("margin-left:auto;font-size:10.5px;font-weight:800;color:#8E8475;padding:5px 10px;border-radius:8px;background:rgba(255,255,255,.05);")
  }, "\u2715")), statsDrill.noSel && _h(_F, null, _h("span", {
    className: "sora",
    style: css("font-size:14.5px;font-weight:800;color:#F4ECDD;")
  }, "All muscles \u2014 last 14 days"))), _h("div", {
    style: css("margin-top:11px;display:flex;flex-direction:column;gap:7px;")
  }, statsDrill.rows.map((ex, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.03);")
  }, _h("span", {
    style: css("font-size:12.5px;font-weight:700;color:#F4ECDD;")
  }, ex.name), _h("span", {
    style: css("font-size:11px;font-weight:800;color:var(--ac);")
  }, ex.sets, " sets"))), statsDrill.empty && _h(_F, null, _h("div", {
    style: css("text-align:center;padding:14px;color:#8E8475;font-size:12px;font-weight:600;")
  }, statsDrill.emptyMsg))))), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "WEEKLY ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "VOLUME BALANCE"))), _h("div", {
    style: css("margin-top:13px;border-radius:22px;padding:17px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, statsVolume.any && _h(_F, null, _h("div", {
    style: css("display:flex;gap:5px;flex-wrap:wrap;")
  }, statsVolume.weeks.map((w, i) => _h("div", {
    key: i,
    className: "press",
    onClick: w.onClick,
    style: css(w.style)
  }, w.label))), _h("div", {
    style: css("margin-top:12px;display:flex;flex-direction:column;gap:5px;")
  }, statsVolume.rows.map((r, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:10px;")
  }, _h("div", {
    style: css("width:88px;flex-shrink:0;font-size:11.5px;font-weight:800;color:#F4ECDD;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;")
  }, r.name), _h("div", {
    style: css(`flex:1;height:20px;border-radius:6px;background:${r.cellBg};display:flex;align-items:center;justify-content:flex-end;padding-right:8px;`)
  }, _h("span", {
    style: css(`font-size:10.5px;font-weight:800;color:${r.cellFg};`)
  }, r.val))))), _h("div", {
    style: css("margin-top:13px;padding:12px 14px;border-radius:13px;background:rgba(226,106,79,.08);border:1px solid rgba(226,106,79,.25);font-size:11.5px;color:#E8B39F;font-weight:700;line-height:1.5;")
  }, "\u26A0 ", statsVolume.callout)), statsVolume.none && _h(_F, null, _h("div", {
    style: css("text-align:center;padding:16px;color:#8E8475;font-size:12.5px;font-weight:600;")
  }, "Log a few workouts to see your weekly balance here."))), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "EXERCISE ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "PROGRESS"))), _h("div", {
    className: "ilsc",
    style: css("margin-top:13px;display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;")
  }, stats.exChips.map((c, i) => _h("div", {
    key: i,
    className: "press",
    onClick: c.pick,
    style: css(`flex-shrink:0;padding:8px 14px;border-radius:12px;font-size:12px;font-weight:800;background:${c.bg};border:1px solid ${c.bd};color:${c.fg};`)
  }, c.name))), _h("div", {
    style: css("margin-top:12px;border-radius:22px;padding:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("display:flex;gap:10px;")
  }, _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.9px;color:#8E8475;")
  }, "TOP SET"), _h("div", {
    className: "sora",
    style: css("font-size:21px;font-weight:800;color:#F4ECDD;margin-top:4px;")
  }, stats.exBest, " ", _h("span", {
    style: css("font-size:12px;color:#8E8475;")
  }, "kg"))), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.9px;color:#8E8475;")
  }, "EST. 1RM"), _h("div", {
    className: "sora",
    style: css("font-size:21px;font-weight:800;color:var(--ac);margin-top:4px;")
  }, stats.ex1rm, " ", _h("span", {
    style: css("font-size:12px;color:#8E8475;")
  }, "kg"))), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.9px;color:#8E8475;")
  }, "6-WEEK GAIN"), _h("div", {
    className: "sora",
    style: css("font-size:21px;font-weight:800;color:#57C08A;margin-top:4px;")
  }, stats.exGain))), _h("svg", {
    viewBox: "0 0 300 96",
    preserveAspectRatio: "none",
    style: css("width:100%;height:96px;margin-top:14px;overflow:visible;")
  }, _h("path", {
    d: stats.exArea,
    style: css("fill:rgba(var(--acr),.13)")
  }), _h("path", {
    d: stats.exLine,
    style: css("fill:none;stroke:var(--ac);stroke-width:3;stroke-linecap:round;stroke-linejoin:round")
  })), _h("div", {
    style: css("display:flex;justify-content:space-between;margin-top:6px;")
  }, stats.exLabels.map((l, i) => _h("span", {
    key: i,
    style: css("font-size:9.5px;font-weight:700;color:#8E8475;")
  }, l.t)))), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "\uD83C\uDFC6 ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "COMPETITION"))), _h("div", {
    style: css("margin-top:13px;border-radius:22px;padding:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("display:flex;gap:3px;padding:3px;border-radius:13px;background:rgba(255,255,255,.04);")
  }, stats.compTabs.map((t, i) => _h("div", {
    key: i,
    className: "press",
    onClick: t.pick,
    style: css(`flex:1;text-align:center;padding:8px 0;border-radius:10px;font-size:12px;font-weight:800;background:${t.bg};color:${t.fg};`)
  }, t.label))), stats.showCompEx && _h(_F, null, _h("div", {
    className: "ilsc",
    style: css("margin-top:12px;display:flex;gap:7px;overflow-x:auto;padding-bottom:2px;")
  }, stats.compExChips.map((c, i) => _h("div", {
    key: i,
    className: "press",
    onClick: c.pick,
    style: css(`flex-shrink:0;padding:7px 12px;border-radius:11px;font-size:11.5px;font-weight:800;background:${c.bg};border:1px solid ${c.bd};color:${c.fg};`)
  }, c.name)))), _h("div", {
    style: css("margin-top:16px;display:flex;flex-direction:column;gap:13px;")
  }, stats.comp.map((c, i) => _h("div", {
    key: i
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:8px;")
  }, _h("span", {
    style: css("font-size:13px;")
  }, c.medal), _h("span", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, c.name)), _h("span", {
    className: "sora",
    style: css(`font-size:14px;font-weight:800;color:${c.color};`)
  }, c.label)), _h("div", {
    style: css("height:10px;border-radius:5px;background:rgba(255,255,255,.06);overflow:hidden;")
  }, _h("div", {
    style: css(`height:100%;border-radius:5px;width:${c.pct};background:${c.fill};transition:width .6s cubic-bezier(.34,1.56,.64,1);`)
  }))))), _h("div", {
    style: css("margin-top:16px;padding:11px 14px;border-radius:13px;background:rgba(var(--acr),.07);border:1px solid rgba(var(--acr),.2);display:flex;align-items:center;gap:11px;")
  }, _h("span", {
    style: css("font-size:22px;")
  }, "\uD83E\uDD47"), _h("div", null, _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, stats.winner), _h("div", {
    style: css("font-size:12px;font-weight:600;color:#8E8475;")
  }, stats.winnerVal)))), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "PERSONAL ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "RECORDS"))), _h("div", {
    className: "stagger",
    style: css("margin-top:13px;display:flex;flex-direction:column;gap:10px;")
  }, stats.prs.map((pr, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("width:40px;height:40px;border-radius:13px;background:rgba(var(--acr),.14);display:flex;align-items:center;justify-content:center;font-size:18px;")
  }, "\uD83C\uDFC6"), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:7px;")
  }, _h("span", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, pr.ex), _h("span", {
    style: css(`font-size:9px;font-weight:800;letter-spacing:.6px;padding:2px 6px;border-radius:6px;background:${pr.badgeBg};color:${pr.badgeFg};`)
  }, pr.badge)), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;margin-top:2px;")
  }, pr.date, " \xB7 ", pr.prev)), _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:17px;color:var(--ac);")
  }, pr.val)))), _h("div", {
    style: css("margin-top:22px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "RECENT ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "SESSIONS"))), _h("div", {
    className: "stagger",
    style: css("margin-top:13px;display:flex;flex-direction:column;gap:10px;")
  }, stats.sessions.map((s, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:13px;padding:14px 16px;border-radius:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("width:40px;height:40px;border-radius:13px;background:rgba(var(--acr),.13);display:flex;align-items:center;justify-content:center;font-size:19px;")
  }, s.emoji), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, s.workout), _h("div", {
    style: css("font-size:11px;font-weight:600;color:#8E8475;margin-top:2px;")
  }, s.when, " \xB7 ", s.mins, " min \xB7 ", s.level)), _h("div", {
    style: css("text-align:right;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:15px;font-weight:800;color:var(--ac);")
  }, s.tagVal), _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.8px;color:#8E8475;margin-top:2px;")
  }, s.tag))))));
}
export function WeightScreen({
  v
}) {
  const {
    nav,
    openProfile,
    user,
    weight
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "mob-only",
    style: css("display:flex;justify-content:space-between;align-items:flex-start;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "press",
    onClick: openProfile,
    style: css(`width:46px;height:46px;border-radius:15px;background:${user.tint};border:2px solid ${user.ring};display:flex;align-items:center;justify-content:center;color:${user.color};font-family:'Sora',sans-serif;font-weight:800;font-size:16px;`)
  }, user.av)), _h("div", {
    style: css("margin-top:22px;font-size:12px;font-weight:700;letter-spacing:2.5px;color:#8E8475;")
  }, "BODY WEIGHT"), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:40px;line-height:1;letter-spacing:-1.2px;color:#F4ECDD;")
  }, "Your ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "Trend")), _h("div", {
    style: css("margin-top:18px;border-radius:28px;padding:22px;background:linear-gradient(150deg,var(--acl) 0%,var(--ac) 52%,var(--acd) 100%);box-shadow:0 20px 44px rgba(var(--acdr),.32);animation:rise .5s ease both;")
  }, _h("div", {
    style: css("font-size:10px;font-weight:800;letter-spacing:2px;color:rgba(var(--inkr),.6);")
  }, "TODAY'S WEIGHT"), _h("div", {
    style: css("margin-top:8px;display:flex;align-items:baseline;justify-content:space-between;gap:10px;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:44px;line-height:1;letter-spacing:-1.6px;color:var(--ink);")
  }, weight.current, " ", _h("span", {
    style: css("font-size:18px;font-weight:700;")
  }, "kg")), _h("div", {
    style: css(`font-size:12.5px;font-weight:800;color:${weight.changeColor};background:rgba(var(--inkr),.88);padding:6px 12px;border-radius:10px;flex-shrink:0;box-shadow:0 4px 14px rgba(var(--inkr),.28);`)
  }, weight.change)), _h("div", {
    style: css("font-size:12px;font-weight:700;color:rgba(var(--inkr),.62);margin-top:2px;")
  }, "this month"), _h("div", {
    className: "press",
    onClick: weight.onLog,
    style: css("margin-top:16px;padding:14px;border-radius:15px;background:var(--ink);color:var(--acl);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:14px;")
  }, "+ Log today's weight")), _h("div", {
    style: css("margin-top:14px;display:flex;gap:4px;padding:4px;border-radius:15px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.06);")
  }, weight.modes.map((m, i) => _h("div", {
    key: i,
    className: "press",
    onClick: m.pick,
    style: css(`flex:1;text-align:center;padding:9px 0;border-radius:11px;font-size:12px;font-weight:800;background:${m.bg};color:${m.fg};transition:background .2s;`)
  }, m.label))), _h("div", {
    style: css("margin-top:14px;border-radius:26px;padding:22px;background:#221E18;border:1px solid rgba(255,255,255,.06);animation:rise .5s ease both;animation-delay:.05s;")
  }, _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:11px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "WEIGHT TREND"), _h("div", {
    style: css("text-align:right;")
  }, _h("span", {
    className: "sora",
    style: css("font-size:18px;font-weight:800;color:var(--ac);")
  }, weight.goal, " kg"), " ", _h("span", {
    style: css("font-size:11px;font-weight:700;color:#8E8475;")
  }, weight.modeLabel, " target"))), _h("svg", {
    viewBox: "0 0 300 100",
    preserveAspectRatio: "none",
    style: css("width:100%;height:100px;margin-top:14px;overflow:visible;")
  }, _h("path", {
    d: weight.area,
    style: css("fill:rgba(var(--acr),.12)")
  }), _h("path", {
    d: weight.line,
    style: css("fill:none;stroke:var(--ac);stroke-width:3;stroke-linecap:round;stroke-linejoin:round")
  })), _h("div", {
    style: css("margin-top:16px;height:9px;border-radius:5px;background:rgba(255,255,255,.06);overflow:hidden;")
  }, _h("div", {
    style: css(`height:100%;border-radius:5px;width:${weight.pct};background:linear-gradient(90deg,var(--acl),var(--acd));transition:width .5s;`)
  })), _h("div", {
    style: css("display:flex;justify-content:space-between;margin-top:7px;")
  }, _h("span", {
    style: css("font-size:10.5px;font-weight:700;color:#8E8475;")
  }, weight.start, " kg start"), _h("span", {
    style: css("font-size:10.5px;font-weight:800;color:var(--ac);")
  }, weight.pct, " there"), _h("span", {
    style: css("font-size:10.5px;font-weight:700;color:#8E8475;")
  }, weight.goal, " kg goal"))), _h("div", {
    style: css("margin-top:11px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;")
  }, weight.tiles.map((t, i) => _h("div", {
    key: i,
    style: css("background:#221E18;border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:14px 12px;")
  }, _h("div", {
    className: "sora",
    style: css(`font-size:19px;font-weight:800;color:${t.fg};line-height:1;`)
  }, t.n), _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:.8px;color:#8E8475;margin-top:6px;")
  }, t.l)))), _h("div", {
    style: css("margin-top:11px;display:flex;align-items:center;gap:13px;padding:15px 17px;border-radius:20px;background:rgba(var(--acr),.07);border:1px solid rgba(var(--acr),.18);")
  }, _h("span", {
    style: css("font-size:22px;")
  }, weight.modeEmoji), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, weight.planLine), _h("div", {
    style: css("font-size:11.5px;font-weight:600;color:#8E8475;margin-top:2px;")
  }, weight.etaLine))), _h("div", {
    style: css("margin-top:24px;font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "HISTORY"), _h("div", {
    className: "stagger",
    style: css("margin-top:13px;display:flex;flex-direction:column;gap:9px;")
  }, weight.log.map((w, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-radius:16px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.05);")
  }, _h("div", {
    style: css("font-size:13px;font-weight:700;color:#A99E8C;")
  }, w.date), _h("div", {
    style: css("display:flex;align-items:center;gap:10px;")
  }, _h("span", {
    className: "sora",
    style: css("font-weight:800;font-size:16px;color:#F4ECDD;")
  }, w.kg, " kg"), _h("span", {
    style: css(`font-size:11px;font-weight:800;color:${w.dColor};`)
  }, w.d))))));
}
export function SocialScreen({
  v
}) {
  const {
    nav,
    openProfile,
    user,
    social,
    inbox
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "mob-only",
    style: css("display:flex;justify-content:space-between;align-items:flex-start;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "press",
    onClick: openProfile,
    style: css(`width:46px;height:46px;border-radius:15px;background:${user.tint};border:2px solid ${user.ring};display:flex;align-items:center;justify-content:center;color:${user.color};font-family:'Sora',sans-serif;font-weight:800;font-size:16px;`)
  }, user.av)), _h("div", {
    style: css("margin-top:22px;font-size:12px;font-weight:700;letter-spacing:2.5px;color:#8E8475;")
  }, "PEOPLE & MESSAGES"), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:40px;line-height:1;letter-spacing:-1.2px;color:#F4ECDD;")
  }, "Your ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "Social")), inbox.hasList && _h(_F, null, _h("input", {
    value: social.q,
    onChange: social.onQ,
    placeholder: "Search people\u2026",
    style: css("margin-top:18px;width:100%;padding:13px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.08);border-radius:14px;color:#F4ECDD;font-size:13.5px;font-weight:600;outline:none;display:block;")
  }), _h("div", {
    style: css("margin-top:16px;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "TRAINING ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "CIRCLE"), " \xB7 subscribe for a ping when they start"), _h("div", {
    className: "stagger",
    style: css("margin-top:12px;display:flex;flex-direction:column;gap:10px;")
  }, social.people.map((p, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css(`position:relative;width:40px;height:40px;border-radius:13px;background:${p.tint};border:2px solid ${p.ring};display:flex;align-items:center;justify-content:center;color:${p.color};font-family:'Sora',sans-serif;font-weight:800;font-size:14px;flex-shrink:0;`)
  }, p.av, p.live && _h("span", {
    style: css("position:absolute;right:-2px;bottom:-2px;width:11px;height:11px;border-radius:50%;background:#57C08A;border:2.5px solid #221E18;animation:pulseDot 1.6s ease infinite;")
  })), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;display:flex;align-items:center;gap:7px;")
  }, _h("span", {
    style: css("overflow:hidden;text-overflow:ellipsis;white-space:nowrap;")
  }, p.name), p.live && _h("span", {
    style: css("flex:none;font-size:9px;font-weight:800;letter-spacing:.5px;color:#57C08A;background:rgba(87,192,138,.13);border:1px solid rgba(87,192,138,.3);border-radius:6px;padding:2px 5px;")
  }, "LIVE")), _h("div", {
    style: css("font-size:11px;font-weight:700;color:#8E8475;margin-top:2px;display:flex;gap:8px;align-items:center;")
  }, _h("span", null, "\uD83D\uDD25 ", p.streak, "d"), _h("span", {
    style: css("color:#6F6659;")
  }, "\xB7"), _h("span", null, p.week, " kg"), _h("span", {
    style: css("color:#6F6659;")
  }, "\xB7"), _h("span", {
    style: css("overflow:hidden;text-overflow:ellipsis;white-space:nowrap;")
  }, p.sessions, " ", p.sessions === "1" ? "session" : "sessions"))), _h("div", {
    style: css("display:flex;align-items:center;gap:7px;flex:none;")
  }, _h("div", {
    className: "press",
    onClick: p.onSub,
    style: css(p.subOn ? "width:34px;height:34px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:rgba(var(--acr),.15);border:1px solid rgba(var(--acr),.42);color:var(--ac);" : "width:34px;height:34px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#8E8475;")
  }, p.subOn ? _h("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    style: css("fill:currentColor;stroke:currentColor;stroke-width:2;stroke-linejoin:round;")
  }, _h("path", {
    d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
  }), _h("path", {
    d: "M13.7 21a2 2 0 0 1-3.4 0",
    style: css("fill:none;stroke-linecap:round;")
  })) : _h("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;")
  }, _h("path", {
    d: "M18 8a6 6 0 0 0-9.3-5"
  }), _h("path", {
    d: "M6 8c0 7-3 9-3 9h15"
  }), _h("path", {
    d: "M13.7 21a2 2 0 0 1-3.4 0"
  }), _h("path", {
    d: "M2 2l20 20"
  }))), _h("div", {
    className: "press",
    onClick: p.onMsg,
    style: css("width:34px;height:34px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#8E8475;")
  }, _h("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;")
  }, _h("rect", {
    x: "2.5",
    y: "4.5",
    width: "19",
    height: "15",
    rx: "2.5"
  }), _h("path", {
    d: "m21 7-9 5.5L3 7"
  })))))), social.empty && _h("div", {
    style: css("text-align:center;padding:26px;color:#8E8475;font-size:12.5px;font-weight:600;")
  }, "No one matches that search.")), _h("div", {
    style: css("margin-top:26px;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "MESSAGES"), _h("div", {
    className: "press",
    onClick: inbox.toggleCompose,
    style: css("margin-top:18px;display:flex;align-items:center;gap:11px;padding:14px 16px;border-radius:18px;background:rgba(var(--acr),.09);border:1px dashed rgba(var(--acr),.35);")
  }, _h("div", {
    style: css("width:34px;height:34px;border-radius:11px;background:rgba(var(--acr),.16);display:flex;align-items:center;justify-content:center;color:var(--ac);font-size:16px;font-weight:800;")
  }, "\u270E"), _h("span", {
    style: css("font-size:13.5px;font-weight:800;color:var(--ac);")
  }, "New message")), inbox.composeOpen && _h(_F, null, _h("div", {
    className: "ilsc",
    style: css("margin-top:11px;display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;")
  }, inbox.people.map((p, i) => _h("div", {
    key: i,
    className: "press",
    onClick: p.open,
    style: css("flex-shrink:0;display:flex;align-items:center;gap:8px;padding:8px 13px 8px 8px;border-radius:14px;background:#221E18;border:1px solid rgba(255,255,255,.07);")
  }, _h("div", {
    style: css(`width:28px;height:28px;border-radius:9px;background:${p.tint};border:1px solid ${p.ring};display:flex;align-items:center;justify-content:center;color:${p.color};font-family:'Sora',sans-serif;font-weight:800;font-size:11px;`)
  }, p.av), _h("span", {
    style: css("font-size:12.5px;font-weight:800;color:#F4ECDD;")
  }, p.name))))), _h("div", {
    style: css("margin-top:14px;display:flex;flex-direction:column;gap:11px;")
  }, inbox.msgs.map((m, i) => _h("div", {
    key: i,
    className: "press",
    onClick: m.open,
    style: css(`display:flex;gap:13px;padding:16px;border-radius:20px;background:#221E18;border:1px solid ${m.border};animation:rise .5s ease both;animation-delay:${m.delay};`)
  }, _h("div", {
    style: css(`width:44px;height:44px;border-radius:14px;background:${m.tint};border:2px solid ${m.ring};display:flex;align-items:center;justify-content:center;color:${m.color};font-family:'Sora',sans-serif;font-weight:800;font-size:15px;flex-shrink:0;`)
  }, m.av), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:center;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, m.from), _h("div", {
    style: css("font-size:10px;color:#6E665B;font-weight:700;")
  }, m.time)), _h("div", {
    style: css("font-size:13px;font-weight:700;color:var(--ac);margin-top:2px;")
  }, m.subject), _h("div", {
    style: css("font-size:12px;color:#8E8475;font-weight:500;margin-top:3px;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;")
  }, m.preview)), m.unread && _h("div", {
    style: css("width:9px;height:9px;border-radius:50%;background:var(--ac);flex-shrink:0;margin-top:4px;")
  }))))), inbox.hasThread && _h(_F, null, _h("div", {
    style: css("margin-top:18px;display:flex;align-items:center;gap:12px;padding:13px 15px;border-radius:20px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    className: "press",
    onClick: inbox.back,
    style: css("width:34px;height:34px;border-radius:11px;background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    style: css(`width:38px;height:38px;border-radius:12px;background:${inbox.tTint};border:2px solid ${inbox.tRing};display:flex;align-items:center;justify-content:center;color:${inbox.tColor};font-family:'Sora',sans-serif;font-weight:800;font-size:13px;flex-shrink:0;`)
  }, inbox.tAv), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:14.5px;font-weight:800;color:#F4ECDD;")
  }, inbox.tName), _h("div", {
    style: css("font-size:11px;font-weight:600;color:#57C08A;margin-top:1px;")
  }, inbox.tStatus))), _h("div", {
    style: css("margin-top:12px;display:flex;flex-direction:column;gap:9px;min-height:280px;")
  }, inbox.bubbles.map((b, i) => _h("div", {
    key: i,
    style: css(`display:flex;justify-content:${b.align};`)
  }, _h("div", {
    style: css(`max-width:76%;padding:11px 14px;border-radius:${b.radius};background:${b.bg};`)
  }, _h("div", {
    style: css(`font-size:13.5px;font-weight:600;line-height:1.45;color:${b.fg};`)
  }, b.t), _h("div", {
    style: css(`font-size:9.5px;font-weight:700;color:${b.meta};margin-top:4px;text-align:right;`)
  }, b.at))))), _h("div", {
    style: css("margin-top:14px;display:flex;gap:9px;align-items:center;")
  }, _h("input", {
    value: inbox.draft,
    onChange: inbox.onDraft,
    onKeyDown: inbox.onKey,
    placeholder: "Write a message\u2026",
    style: css("flex:1;min-width:0;padding:14px 16px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.08);color:#F4ECDD;font-family:'Manrope',sans-serif;font-size:13.5px;font-weight:600;outline:none;")
  }), _h("div", {
    className: "press",
    onClick: inbox.send,
    style: css("width:48px;height:48px;border-radius:16px;background:linear-gradient(135deg,var(--acl),var(--acd));display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M22 2L11 13"
  }), _h("path", {
    d: "M22 2l-7 20-4-9-9-4 20-7z"
  }))))));
}
const V5_LEVELS = [{
  v: 1,
  n: "EASY",
  c: "#57C08A",
  s: "4+ reps left in the tank"
}, {
  v: 2,
  n: "LIGHT",
  c: "#9BC85F",
  s: "3-4 reps left"
}, {
  v: 3,
  n: "SOLID",
  c: "#F2B33D",
  s: "2-3 reps left"
}, {
  v: 4,
  n: "HARD",
  c: "#E8883F",
  s: "1-2 reps left"
}, {
  v: 5,
  n: "FAILURE",
  c: "#E26A4F",
  s: "nothing left"
}];
function V5Effort({
  value,
  onPick,
  onClear
}) {
  const trackRef = useRef(null);
  const idx = value ? value - 1 : null;
  const L = idx != null ? V5_LEVELS[idx] : null;
  const p = idx != null ? idx / 4 : 0;
  const pick = clientX => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (clientX - r.left - 9) / (r.width - 18);
    onPick(Math.max(1, Math.min(5, Math.round(x * 4) + 1)));
  };
  const down = e => {
    e.preventDefault();
    pick(e.clientX);
    const mv = ev => pick(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  };
  return _h("div", {
    style: css("margin-top:12px")
  }, _h("div", {
    style: css("display:flex;align-items:baseline;justify-content:space-between;gap:8px")
  }, _h("div", null, _h("span", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.16em;color:#8E8475")
  }, "HOW HARD WAS IT?"), _h("span", {
    style: css("font-size:10.5px;font-weight:700;color:#6E665B;margin-left:5px")
  }, "optional")), _h("div", {
    className: "press",
    onClick: onClear,
    style: css("font-size:10px;font-weight:800;color:#5A5147")
  }, "CLEAR")), _h("div", {
    style: css("display:flex;align-items:baseline;justify-content:space-between;margin-top:5px")
  }, _h("div", {
    className: "sora",
    style: {
      ...css("font-weight:800;font-size:14px"),
      color: L ? L.c : "#5A5147"
    }
  }, L ? L.n : "Not rated"), _h("div", {
    style: css("font-size:10.5px;font-weight:700;color:#6E665B")
  }, L ? L.s : "drag to rate")), _h("div", {
    ref: trackRef,
    onPointerDown: down,
    style: css("position:relative;height:30px;touch-action:none;cursor:pointer")
  }, _h("div", {
    style: css("position:absolute;left:9px;right:9px;top:14px;height:2px;background:rgba(255,255,255,.10);border-radius:2px")
  }), _h("div", {
    style: {
      ...css("position:absolute;left:9px;top:14px;height:2px;border-radius:2px;transition:width .16s ease,background .16s ease"),
      width: `calc(${p * 100}% - ${p * 18}px)`,
      background: L ? L.c : "transparent"
    }
  }), [0, 1, 2, 3, 4].map(i => _h("div", {
    key: i,
    style: {
      ...css("position:absolute;top:11px;width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.12)"),
      left: `calc(${i * 25}% + ${9 - i * 4.5}px)`
    }
  })), _h("div", {
    style: {
      ...css("position:absolute;top:6px;width:18px;height:18px;border-radius:50%;border:2px solid #0C0906;transition:left .16s ease,background .16s ease,box-shadow .16s ease"),
      left: `calc(${p * 100}% - ${p * 18}px)`,
      background: L ? L.c : "#3E3830",
      boxShadow: L ? `0 0 12px ${L.c}66` : "none"
    }
  })));
}
function V5Plan({
  rows,
  onReorder
}) {
  const listRef = useRef(null);
  const st = useRef({
    held: null,
    from: -1,
    timer: null,
    startY: 0
  });
  const clear = () => {
    if (st.current.timer) {
      clearTimeout(st.current.timer);
      st.current.timer = null;
    }
  };
  const rowsEls = () => Array.from(listRef.current ? listRef.current.children : []);
  const down = e => {
    const row = e.target.closest("[data-row]");
    if (!row) return;
    st.current.startY = e.clientY;
    st.current.timer = setTimeout(() => {
      st.current.held = row;
      st.current.from = Number(row.dataset.row);
      row.style.transform = "scale(1.035)";
      row.style.boxShadow = "0 14px 30px rgba(0,0,0,.55)";
      row.style.borderColor = "var(--ac)";
      row.style.position = "relative";
      row.style.zIndex = "5";
      try {
        if (navigator.vibrate) navigator.vibrate(12);
      } catch (err) {}
    }, 400);
  };
  const move = e => {
    const h = st.current.held;
    if (!h) {
      if (Math.abs(e.clientY - st.current.startY) > 8) clear();
      return;
    }
    e.preventDefault();
    const list = listRef.current;
    for (const r of rowsEls()) {
      if (r === h) continue;
      const b = r.getBoundingClientRect();
      if (e.clientY > b.top && e.clientY < b.bottom) {
        const hb = h.getBoundingClientRect();
        if (hb.top < b.top) list.insertBefore(r, h);else list.insertBefore(h, r);
        break;
      }
    }
  };
  const up = () => {
    const h = st.current.held;
    clear();
    if (!h) return;
    h.style.transform = "";
    h.style.boxShadow = "";
    h.style.borderColor = "";
    h.style.zIndex = "";
    const to = rowsEls().indexOf(h);
    const from = st.current.from;
    st.current.held = null;
    st.current.from = -1;
    if (to > -1 && from > -1 && to !== from && onReorder) onReorder(from, to);
  };
  useEffect(() => {
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  });
  return _h("div", {
    style: css("margin-top:11px;padding:11px 13px 13px;border-radius:20px 20px 0 0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-bottom:none")
  }, _h("div", {
    style: css("width:34px;height:4px;border-radius:3px;background:rgba(255,255,255,.16);margin:0 auto 10px")
  }), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;margin-bottom:8px")
  }, _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.16em;color:#8E8475")
  }, "WORKOUT PLAN"), _h("div", {
    style: css("font-size:10px;font-weight:700;color:#6E665B")
  }, "hold + drag to reorder")), _h("div", {
    ref: listRef,
    onPointerDown: down,
    onPointerMove: move,
    style: css("display:flex;flex-direction:column;gap:6px;touch-action:none")
  }, rows.map((p, i) => _h("div", {
    key: i,
    "data-row": i,
    style: {
      ...css("display:flex;align-items:center;gap:10px;padding:10px 11px;border-radius:12px;transition:transform .16s ease,box-shadow .16s ease,opacity .16s ease"),
      background: p.isCurrent ? "rgba(var(--acr),.13)" : "rgba(255,255,255,.035)",
      border: "1px solid " + (p.isCurrent ? "var(--ac)" : "rgba(255,255,255,.06)"),
      opacity: p.done || p.skipped ? 0.42 : 1
    }
  }, _h("span", {
    style: css("color:#4E463C;font-size:14px;letter-spacing:-2px;user-select:none")
  }, "\u283F"), _h("span", {
    style: css("flex:1;min-width:0;font-size:12px;font-weight:800;color:#F4ECDD;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")
  }, p.name, p.switched ? " ↻" : "", p.added ? " +" : ""), _h("span", {
    style: css("font-size:10px;font-weight:700;color:#6E665B;flex:none")
  }, p.done ? "done" : p.skipped ? "skipped" : p.scheme)))));
}
export function ActiveWorkoutV5({
  v,
  onFinishAsk
}) {
  const aw = v.aw;
  if (!aw || !aw.curName) return null;
  const c = aw.coach || {};
  return _h("div", {
    className: "screen",
    style: css("min-height:100%;padding:16px 16px 130px;animation:scrnIn .5s ease both")
  }, _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;gap:10px")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:15px;letter-spacing:-.3px;line-height:1.25;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")
  }, aw.programName, _h("span", {
    style: css("color:#5A5147;margin:0 5px")
  }, "\xB7"), aw.workoutName, aw.gymName && _h(_F, null, _h("span", {
    style: css("color:#5A5147;margin:0 5px")
  }, "\xB7"), _h("span", {
    style: css("color:#A99E8C;font-weight:700")
  }, "\uD83D\uDCCD ", aw.gymName))), _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:17px;font-variant-numeric:tabular-nums;flex:none")
  }, aw.clock)), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:9px")
  }, _h("div", {
    style: css("flex:1;height:5px;border-radius:4px;background:rgba(255,255,255,.07);overflow:hidden")
  }, _h("div", {
    style: {
      ...css("height:100%;border-radius:4px;background:linear-gradient(90deg,var(--acl),var(--acd));transition:width .3s ease"),
      width: aw.sessionPct
    }
  })), _h("div", {
    style: css("display:flex;gap:6px;flex:none")
  }, _h("div", {
    className: "press",
    onClick: aw.minimize,
    style: css("padding:7px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);font-size:11px;font-weight:800;color:#A99E8C")
  }, "\u2199 Min"), _h("div", {
    className: "press",
    onClick: onFinishAsk,
    style: css("padding:7px 12px;border-radius:10px;background:rgba(87,192,138,.11);border:1px solid rgba(87,192,138,.32);font-size:11px;font-weight:800;color:#7FD3A6")
  }, "\u2713 Finish"))), _h("div", {
    style: css("font-size:11px;font-weight:700;color:#8E8475;margin-top:5px")
  }, aw.sessionLabel, " \xB7 ", aw.loggedCount, " sets logged \xB7 ", aw.sessionPct), _h("div", {
    style: css("margin-top:12px;background:#221E18;border:1px solid rgba(255,255,255,.06);border-radius:22px;padding:16px")
  }, c.has && _h("div", {
    style: css("padding:11px 12px;border-radius:14px;background:linear-gradient(135deg,rgba(var(--aclr),.13),rgba(var(--acdr),.06));border:1px solid rgba(var(--acr),.28)")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:7px")
  }, _h("span", {
    style: css("width:6px;height:6px;border-radius:50%;background:var(--ac);display:inline-block")
  }), _h("span", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.16em;color:#A99E8C")
  }, c.muscle, c.readiness != null ? ` · ${c.readiness}% READY` : "", c.conf ? ` · ${String(c.conf).toUpperCase()}` : "")), _h("div", {
    className: "sora",
    style: css("font-size:14.5px;font-weight:800;margin-top:5px;line-height:1.35;color:#F4ECDD")
  }, c.line)), aw.isSuperset && _h("div", {
    style: css("margin-top:11px;font-size:11px;font-weight:700;color:#8E8475;text-align:center")
  }, "SUPERSET ", aw.ssPos, " \xB7 ", aw.chain.map((x, i) => _h("span", {
    key: i,
    style: {
      color: x.color,
      fontWeight: x.weight
    }
  }, x.name, x.sep))), _h("div", {
    className: "sora",
    style: css("font-size:20px;font-weight:800;margin-top:12px;text-align:center;color:#F4ECDD")
  }, aw.curName), _h("div", {
    style: css("font-size:11px;font-weight:700;color:#8E8475;text-align:center;margin-top:3px")
  }, "set ", aw.setNum, " of ", aw.plannedSets, " \xB7 target ", aw.repRange), _h("div", {
    className: "press",
    onClick: aw.howTo,
    style: css("text-align:center;margin-top:6px;font-size:10.5px;font-weight:800;color:var(--ac)")
  }, "\uD83D\uDCD6 How to do this"), _h("div", {
    style: css("display:flex;gap:9px;margin-top:12px")
  }, _h("div", {
    style: css("flex:1")
  }, _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.16em;color:#8E8475;margin-bottom:6px")
  }, "WEIGHT (KG)"), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);border-radius:15px;padding:8px 10px")
  }, _h("div", {
    className: "press",
    ...holdRepeat(aw.kgMinus),
    style: css("width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#F4ECDD;font-size:20px;font-weight:700;user-select:none")
  }, "\u2212"), _h("input", {
    value: aw.kg,
    onChange: aw.onKg,
    type: "text",
    inputMode: "decimal",
    style: css("width:74px;text-align:center;background:transparent;border:none;outline:none;color:#F4ECDD;font-family:'Sora',sans-serif;font-weight:800;font-size:26px")
  }), _h("div", {
    className: "press",
    ...holdRepeat(aw.kgPlus),
    style: css("width:36px;height:36px;border-radius:11px;background:rgba(var(--acr),.16);display:flex;align-items:center;justify-content:center;color:var(--ac);font-size:20px;font-weight:700;user-select:none")
  }, "+"))), _h("div", {
    style: css("flex:1")
  }, _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.16em;color:#8E8475;margin-bottom:6px")
  }, "REPS"), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);border-radius:15px;padding:8px 10px")
  }, _h("div", {
    className: "press",
    ...holdRepeat(aw.repsMinus),
    style: css("width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#F4ECDD;font-size:20px;font-weight:700;user-select:none")
  }, "\u2212"), _h("input", {
    value: aw.reps,
    onChange: aw.onReps,
    type: "text",
    inputMode: "numeric",
    placeholder: "0",
    style: css("width:74px;text-align:center;background:transparent;border:none;outline:none;color:#F4ECDD;font-family:'Sora',sans-serif;font-weight:800;font-size:26px")
  }), _h("div", {
    className: "press",
    ...holdRepeat(aw.repsPlus),
    style: css("width:36px;height:36px;border-radius:11px;background:rgba(var(--acr),.16);display:flex;align-items:center;justify-content:center;color:var(--ac);font-size:20px;font-weight:700;user-select:none")
  }, "+")))), aw.gymNote && _h("div", {
    style: css(aw.gymNoteStyle)
  }, aw.gymNote), aw.hasLast && _h("div", {
    className: "press",
    onClick: aw.useLastKg,
    style: css("margin-top:8px;text-align:center;padding:8px 0;border-radius:11px;background:rgba(var(--acr),.09);border:1px solid rgba(var(--acr),.26);font-size:11.5px;font-weight:800;color:var(--ac)")
  }, aw.useLastLabel), _h("div", {
    className: "press",
    onClick: aw.toggleDrop,
    style: css("margin-top:11px;display:flex;align-items:center;gap:9px")
  }, _h("div", {
    style: {
      ...css("width:19px;height:19px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--ink);font-weight:800"),
      border: "1.5px solid " + aw.dropBorder,
      background: aw.dropBg
    }
  }, aw.dropCheck), _h("span", {
    style: css("font-size:12px;font-weight:800;color:#A99E8C")
  }, "\uD83D\uDD3B Dropset", aw.dropCount > 0 ? ` · ${aw.dropCount} added` : "")), aw.hasDrops && _h("div", {
    style: css("margin-top:8px;display:flex;flex-direction:column;gap:5px")
  }, aw.dropList.map((d, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;justify-content:space-between;padding:7px 11px;border-radius:10px;background:rgba(255,255,255,.04)")
  }, _h("span", {
    style: css("font-size:11.5px;font-weight:700;color:#C9BEAD")
  }, d.label), _h("span", {
    className: "press",
    onClick: d.onRemove,
    style: css("font-size:11px;font-weight:800;color:#E26A4F")
  }, "\u2715")))), _h(V5Effort, {
    value: aw.feelValue,
    onPick: aw.setFeel,
    onClear: aw.clearFeel
  }), _h("div", {
    className: "press",
    onClick: aw.toggleNote,
    style: css("margin-top:11px;font-size:11.5px;font-weight:800;color:#8E8475")
  }, "\uD83D\uDCDD ", aw.noteOpen ? "Hide note" : "Add note"), aw.noteOpen && _h("input", {
    value: aw.note,
    onChange: aw.onNote,
    placeholder: "How did it feel, form cues\u2026",
    style: css("margin-top:8px;width:100%;padding:11px 13px;border-radius:13px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#F4ECDD;font-size:13px;font-weight:600;outline:none")
  }), _h("div", {
    className: "press",
    onClick: aw.logSet,
    style: css("margin-top:13px;padding:15px;border-radius:16px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-family:'Sora',sans-serif;font-weight:800;font-size:15px;text-align:center;box-shadow:0 12px 28px rgba(var(--acdr),.32)")
  }, aw.logLabel), _h("div", {
    style: css("margin-top:12px")
  }, _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.16em;color:#8E8475;margin-bottom:6px")
  }, "REST AFTER"), _h("div", {
    style: css("display:flex;gap:5px")
  }, aw.restOpts.map((r, i) => _h("div", {
    key: i,
    className: "press",
    onClick: r.onPick,
    style: css(r.style)
  }, r.label)))), _h("div", {
    style: css("display:flex;align-items:center;justify-content:center;gap:13px;margin-top:13px;padding:11px 0;border-top:1px solid rgba(255,255,255,.06)")
  }, _h("span", {
    className: "press",
    onClick: aw.skipSet,
    style: css("font-size:11.5px;font-weight:800;color:#8E8475")
  }, "Skip set"), _h("span", {
    style: css("color:#3E3830;font-size:11px")
  }, "\xB7"), _h("span", {
    className: "press",
    onClick: aw.skipEx,
    style: css("font-size:11.5px;font-weight:800;color:#8E8475")
  }, "Skip exercise"), _h("span", {
    style: css("color:#3E3830;font-size:11px")
  }, "\xB7"), _h("span", {
    className: "press",
    onClick: aw.switchEx,
    style: css("font-size:11.5px;font-weight:800;color:var(--ac)")
  }, "Switch"))), aw.addClosed && _h("div", {
    className: "press",
    onClick: aw.addToggle,
    style: css("margin-top:11px;text-align:center;padding:11px 0;border-radius:14px;background:rgba(255,255,255,.03);border:1.5px dashed rgba(255,255,255,.1);font-size:11.5px;font-weight:800;color:#8E8475")
  }, "+ Add an exercise"), aw.addOpen && _h("div", {
    style: css("margin-top:11px;border-radius:18px;border:1.5px solid rgba(87,192,138,.35);background:rgba(87,192,138,.06);padding:15px;animation:pop .3s ease both;")
  }, _h("div", {
    style: css("font-size:10.5px;font-weight:800;color:#57C08A;letter-spacing:1.2px;")
  }, "ADD EXERCISE \u2014 THIS SESSION ONLY"), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;margin-top:3px;")
  }, "Your saved program stays untouched."), _h("input", {
    value: aw.addQ,
    onChange: aw.onAddQ,
    placeholder: "Search exercise\u2026",
    style: css("margin-top:11px;width:100%;padding:11px 13px;background:rgba(255,255,255,.05);border:1.5px solid rgba(87,192,138,.3);border-radius:12px;font-size:14px;color:#F4ECDD;outline:none;box-sizing:border-box;")
  }), aw.addHasMatches && _h("div", {
    style: css("margin-top:9px;display:flex;flex-wrap:wrap;gap:7px;")
  }, aw.addMatches.map((am, i) => _h("div", {
    key: i,
    className: "press",
    onClick: am.onPick,
    style: css("padding:7px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#C9BEAD;font-size:12px;font-weight:700;")
  }, am.name))), _h("div", {
    style: css("margin-top:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;")
  }, [["SETS", aw.addSets, aw.addSetsMinus, aw.addSetsPlus], ["MIN REPS", aw.addLo, aw.addLoMinus, aw.addLoPlus], ["MAX REPS", aw.addHi, aw.addHiMinus, aw.addHiPlus]].map(([lbl, val, dec, inc], i) => _h("div", {
    key: i,
    style: css("border-radius:13px;background:rgba(255,255,255,.04);padding:9px;")
  }, _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1px;color:#8E8475;text-align:center;")
  }, lbl), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;margin-top:6px;")
  }, _h("div", {
    className: "press",
    ...holdRepeat(dec),
    style: css("width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.06);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-weight:700;")
  }, "\u2212"), _h("div", {
    className: "sora",
    style: css("font-size:16px;font-weight:800;color:#F4ECDD;")
  }, val), _h("div", {
    className: "press",
    ...holdRepeat(inc),
    style: css("width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.06);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-weight:700;")
  }, "+"))))), _h("div", {
    style: css("margin-top:13px;display:flex;gap:9px;")
  }, _h("div", {
    className: "press",
    onClick: aw.addConfirm,
    style: css("flex:1;text-align:center;padding:12px;border-radius:12px;background:#57C08A;color:#06150E;font-weight:800;font-size:13px;font-family:'Sora',sans-serif;")
  }, "\uFF0B Add to session"), _h("div", {
    className: "press",
    onClick: aw.addToggle,
    style: css("padding:12px 16px;border-radius:12px;background:rgba(255,255,255,.06);color:#A99E8C;font-weight:800;font-size:13px;")
  }, "Cancel"))), _h(V5Plan, {
    rows: aw.plan,
    onReorder: aw.reorder
  }));
}
export function ActiveWorkoutScreen({
  v
}) {
  const {
    aw,
    gyms
  } = v;
  return v.isActive && _h("div", {
    style: css("min-height:838px;padding:56px 18px 40px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:flex-start;gap:10px;")
  }, _h("div", null, _h("div", {
    style: css("font-size:10px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "ACTIVE SESSION"), _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:23px;color:#F4ECDD;margin-top:2px;")
  }, aw.emoji, " ", aw.name), _h("div", {
    style: css("font-size:12px;font-weight:700;color:var(--ac);margin-top:3px;")
  }, aw.meta)), _h("div", {
    style: css("display:flex;gap:8px;flex-shrink:0;")
  }, _h("div", {
    className: "press",
    onClick: aw.minimize,
    style: css("display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:50px;height:50px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:#C9BEAD;")
  }, _h("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round")
  }, _h("path", {
    d: "M5 12h14"
  })), _h("span", {
    style: css("font-size:9px;font-weight:800;")
  }, "Min")), _h("div", {
    className: "press",
    onClick: aw.finish,
    style: css("display:flex;align-items:center;justify-content:center;padding:0 18px;height:50px;border-radius:14px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-family:'Sora',sans-serif;font-weight:800;font-size:14px;box-shadow:0 8px 20px rgba(var(--acdr),.3);")
  }, "Finish"))), _h("div", {
    style: css("margin-top:15px;display:flex;align-items:center;gap:11px;")
  }, _h("span", {
    style: css("font-size:10px;font-weight:800;letter-spacing:1px;color:#8E8475;flex-shrink:0;")
  }, "PROGRESS"), _h("div", {
    style: css("flex:1;height:7px;border-radius:5px;background:rgba(255,255,255,.07);overflow:hidden;")
  }, _h("div", {
    style: css(`height:100%;border-radius:5px;background:linear-gradient(90deg,var(--acl),var(--acd));width:${aw.sessionPct};transition:width .55s cubic-bezier(.2,.8,.2,1);box-shadow:0 0 12px rgba(var(--acr),.5);`)
  })), _h("span", {
    className: "sora",
    style: css("font-size:12px;font-weight:800;color:var(--ac);flex-shrink:0;")
  }, aw.sessionLabel)), aw.nudge && _h("div", {
    style: css("margin-top:15px;border-radius:18px;border:1.5px solid rgba(226,106,79,.45);background:linear-gradient(150deg,rgba(226,106,79,.14),rgba(226,106,79,.05));padding:15px 16px;animation:pop .4s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("div", {
    style: css("display:flex;gap:11px;align-items:flex-start;")
  }, _h("div", {
    style: css("font-size:20px;")
  }, "\u23F0"), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, "Still training?"), _h("div", {
    style: css("font-size:12px;color:#C9BEAD;font-weight:600;margin-top:2px;")
  }, "10 min without a set. Move your ass \u2014 or wrap it up."))), _h("div", {
    style: css("margin-top:12px;display:flex;gap:9px;")
  }, _h("div", {
    className: "press",
    onClick: aw.nudgeStill,
    style: css("flex:1;text-align:center;padding:11px;border-radius:12px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-weight:800;font-size:12.5px;font-family:'Sora',sans-serif;")
  }, "\uD83D\uDCAA Still here \u2014 training!"), _h("div", {
    className: "press",
    onClick: aw.finish,
    style: css("flex:1;text-align:center;padding:11px;border-radius:12px;background:rgba(255,255,255,.06);color:#C9BEAD;font-weight:800;font-size:12.5px;")
  }, "Finish workout"))), _h("div", {
    style: css("margin-top:15px;display:flex;align-items:center;gap:8px;")
  }, _h("span", {
    style: css("font-size:14px;")
  }, "\uD83D\uDCCD"), gyms.list.map((g, i) => _h("div", {
    key: i,
    className: "press",
    onClick: g.onSelect,
    style: css(g.style)
  }, g.name)), _h("div", {
    className: "press",
    onClick: gyms.onAdd,
    style: css("padding:7px 12px;border-radius:11px;border:1.5px dashed rgba(var(--acr),.4);color:var(--ac);font-size:12px;font-weight:800;")
  }, "+ Add gym")), _h("div", {
    style: css("height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);margin:16px 4px;")
  }), aw.isSuperset && _h("div", {
    style: css("border-radius:18px;border:1.5px solid rgba(var(--acr),.4);background:linear-gradient(150deg,rgba(var(--aclr),.08),rgba(var(--acdr),.04));padding:15px 16px;display:flex;gap:12px;animation:pop .4s cubic-bezier(.34,1.4,.5,1) both;")
  }, _h("div", {
    style: css("font-size:18px;flex-shrink:0;")
  }, "\uD83D\uDD17"), _h("div", null, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:.5px;color:var(--ac);text-align:center;margin-bottom:6px;")
  }, "SUPERSET (", aw.ssPos, ")"), _h("div", {
    style: css("font-size:12.5px;line-height:1.55;font-weight:600;color:#A99E8C;")
  }, aw.chain.map((c, i) => _h(React.Fragment, {
    key: i
  }, _h("span", {
    style: css(`color:${c.color};font-weight:${c.weight};`)
  }, c.name), _h("span", {
    style: css("color:#6E665B;")
  }, c.sep)))))), _h("div", {
    style: css("margin-top:15px;border-radius:24px;background:#221E18;border:1px solid rgba(255,255,255,.06);padding:20px 18px;box-shadow:0 14px 34px rgba(0,0,0,.28);")
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:flex-start;gap:12px;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:27px;line-height:1.05;color:#F4ECDD;")
  }, aw.curName), _h("div", {
    style: css("flex-shrink:0;text-align:center;background:rgba(var(--acr),.14);border:1px solid rgba(var(--acr),.3);border-radius:13px;padding:8px 12px;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:18px;color:var(--ac);line-height:1;")
  }, aw.setNum), _h("div", {
    style: css("font-size:8px;font-weight:800;letter-spacing:1px;color:var(--ac);margin-top:2px;")
  }, "SET"))), _h("div", {
    style: css("font-size:13px;font-weight:700;color:#8E8475;margin-top:8px;")
  }, "Set ", aw.setNum, " of ", aw.plannedSets, " \xB7 Target: ", aw.repRange, " reps"), _h("div", {
    className: "press",
    onClick: aw.howTo,
    style: css("margin-top:13px;display:inline-flex;align-items:center;gap:7px;padding:9px 14px;border-radius:12px;background:rgba(var(--acr),.12);color:var(--ac);font-size:13px;font-weight:800;")
  }, "\uD83D\uDCCB How to do this"), _h("div", {
    style: css("margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:13px;")
  }, _h("div", {
    style: css("border-radius:18px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.05);padding:13px;")
  }, _h("div", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1px;color:#8E8475;text-align:center;")
  }, "WEIGHT (KG)"), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;margin-top:11px;")
  }, _h("div", {
    className: "press",
    ...holdRepeat(aw.kgMinus),
    style: css("width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#F4ECDD;font-size:20px;font-weight:700;")
  }, "\u2212"), _h("input", {
    value: aw.kg,
    onChange: aw.onKg,
    inputMode: "decimal",
    style: css("width:56px;background:transparent;border:none;outline:none;text-align:center;color:#F4ECDD;font-family:'Sora',sans-serif;font-weight:800;font-size:26px;")
  }), _h("div", {
    className: "press",
    ...holdRepeat(aw.kgPlus),
    style: css("width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#F4ECDD;font-size:20px;font-weight:700;")
  }, "+"))), _h("div", {
    style: css("border-radius:18px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.05);padding:13px;")
  }, _h("div", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1px;color:#8E8475;text-align:center;")
  }, "REPS ", _h("span", {
    style: css("color:var(--ac);")
  }, aw.repRange)), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;margin-top:11px;")
  }, _h("div", {
    className: "press",
    ...holdRepeat(aw.repsMinus),
    style: css("width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#F4ECDD;font-size:20px;font-weight:700;")
  }, "\u2212"), _h("input", {
    value: aw.reps,
    onChange: aw.onReps,
    inputMode: "numeric",
    placeholder: "0",
    style: css("width:56px;background:transparent;border:none;outline:none;text-align:center;color:#F4ECDD;font-family:'Sora',sans-serif;font-weight:800;font-size:26px;")
  }), _h("div", {
    className: "press",
    ...holdRepeat(aw.repsPlus),
    style: css("width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#F4ECDD;font-size:20px;font-weight:700;")
  }, "+")))), _h("div", {
    style: css(aw.gymNoteStyle)
  }, aw.gymNote), _h("div", {
    className: "press",
    onClick: aw.toggleDrop,
    style: css("margin-top:15px;display:flex;align-items:center;gap:10px;")
  }, _h("div", {
    style: css(`width:22px;height:22px;border-radius:7px;border:2px solid ${aw.dropBorder};background:${aw.dropBg};display:flex;align-items:center;justify-content:center;`)
  }, aw.dropCheck), _h("span", {
    style: css("font-size:14px;font-weight:700;color:#C9BEAD;")
  }, "\uD83D\uDD3B Dropset")), _h("div", {
    className: "press",
    onClick: aw.toggleNote,
    style: css("margin-top:13px;display:inline-flex;align-items:center;gap:7px;padding:9px 13px;border-radius:11px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);color:#A99E8C;font-size:13px;font-weight:700;")
  }, "\uD83D\uDCDD Add note"), aw.noteOpen && _h("input", {
    value: aw.note,
    onChange: aw.onNote,
    placeholder: "How did it feel?",
    style: css("margin-top:10px;width:100%;padding:11px 14px;background:rgba(255,255,255,.05);border:1.5px solid rgba(var(--acr),.22);border-radius:12px;font-size:13px;color:#F4ECDD;outline:none;animation:pop .3s ease both;")
  }), _h("div", {
    style: css("margin-top:18px;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#8E8475;text-align:center;")
  }, "HOW DID THAT SET FEEL? ", _h("span", {
    style: css("font-weight:700;letter-spacing:0;color:#6E665B;")
  }, "\xB7 optional")), _h("div", {
    style: css("margin-top:11px;display:grid;grid-template-columns:repeat(5,1fr);gap:6px;")
  }, aw.feelOpts.map((f, i) => _h("div", {
    key: i,
    className: "press",
    onClick: f.onPick,
    style: css(f.style)
  }, _h("div", {
    style: css("font-size:16px;line-height:1;")
  }, f.icon), _h("div", {
    style: css("margin-top:4px;font-size:8.5px;font-weight:800;letter-spacing:.3px;")
  }, f.label)))), _h("div", {
    style: css("margin-top:18px;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#8E8475;text-align:center;")
  }, "REST AFTER"), _h("div", {
    style: css("margin-top:11px;display:grid;grid-template-columns:repeat(5,1fr);gap:7px;")
  }, aw.restOpts.map((r, i) => _h("div", {
    key: i,
    className: "press",
    onClick: r.onPick,
    style: css(r.style)
  }, r.label))), _h("div", {
    className: "press",
    onClick: aw.logSet,
    style: css("margin-top:18px;padding:16px;border-radius:16px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:15px;box-shadow:0 12px 26px rgba(var(--acdr),.3);")
  }, aw.logLabel), _h("div", {
    style: css("margin-top:11px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;")
  }, _h("div", {
    className: "press",
    onClick: aw.skipSet,
    style: css("padding:12px 6px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);text-align:center;color:#A99E8C;font-size:12px;font-weight:700;")
  }, "\u23ED Skip set"), _h("div", {
    className: "press",
    onClick: aw.skipEx,
    style: css("padding:12px 6px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);text-align:center;color:#A99E8C;font-size:12px;font-weight:700;")
  }, "\u23ED\u23ED Skip exercise"), _h("div", {
    className: "press",
    onClick: aw.switchEx,
    style: css("padding:12px 6px;border-radius:14px;background:rgba(var(--acr),.1);border:1px solid rgba(var(--acr),.34);text-align:center;color:var(--ac);font-size:12px;font-weight:800;")
  }, "\uD83D\uDD04 Switch"))), _h("div", {
    style: css("margin-top:24px;font-size:12px;font-weight:800;letter-spacing:1.5px;color:#8E8475;text-align:center;")
  }, "WORKOUT PLAN"), _h("div", {
    className: "stagger",
    style: css("margin-top:13px;display:flex;flex-direction:column;")
  }, aw.plan.map((row, i) => _h("div", {
    key: i,
    className: "press",
    onClick: row.onJump,
    style: css(`display:flex;align-items:center;gap:12px;padding:11px 6px;border-left:2px solid ${row.tick};`)
  }, _h("div", {
    style: css(row.numStyle)
  }, row.n), row.isFirstSS && _h("div", {
    style: css("background:rgba(var(--acr),.16);color:var(--ac);font-size:9px;font-weight:800;padding:3px 6px;border-radius:6px;")
  }, "SS"), _h("div", {
    style: css(`flex:1;font-size:14px;font-weight:${row.weight};color:${row.color};`)
  }, row.name), row.added && _h("div", {
    style: css("background:rgba(87,192,138,.18);color:#57C08A;font-size:9px;font-weight:800;padding:3px 6px;border-radius:6px;letter-spacing:.5px;")
  }, "ADDED"), _h("div", {
    style: css("font-size:12px;font-weight:700;color:#6E665B;")
  }, row.scheme)))), aw.addClosed && _h("div", {
    className: "press",
    onClick: aw.addToggle,
    style: css("margin-top:16px;text-align:center;padding:13px;border-radius:14px;border:1.5px dashed rgba(87,192,138,.45);color:#57C08A;font-size:13px;font-weight:800;")
  }, "\uFF0B Add exercise (this session only)"), aw.addOpen && _h("div", {
    style: css("margin-top:16px;border-radius:20px;border:1.5px solid rgba(87,192,138,.35);background:rgba(87,192,138,.06);padding:16px;animation:pop .3s ease both;")
  }, _h("div", {
    style: css("font-size:11px;font-weight:800;color:#57C08A;letter-spacing:1.2px;")
  }, "ADD EXERCISE \u2014 THIS SESSION ONLY"), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;margin-top:3px;")
  }, "Your saved program stays untouched."), _h("input", {
    value: aw.addQ,
    onChange: aw.onAddQ,
    placeholder: "Search exercise\u2026",
    style: css("margin-top:11px;width:100%;padding:12px 14px;background:rgba(255,255,255,.05);border:1.5px solid rgba(87,192,138,.3);border-radius:12px;font-size:14px;color:#F4ECDD;outline:none;")
  }), aw.addHasMatches && _h("div", {
    style: css("margin-top:9px;display:flex;flex-wrap:wrap;gap:7px;")
  }, aw.addMatches.map((am, i) => _h("div", {
    key: i,
    className: "press",
    onClick: am.onPick,
    style: css("padding:7px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#C9BEAD;font-size:12px;font-weight:700;")
  }, am.name))), _h("div", {
    style: css("margin-top:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;")
  }, _h("div", {
    style: css("border-radius:13px;background:rgba(255,255,255,.04);padding:9px;")
  }, _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1px;color:#8E8475;text-align:center;")
  }, "SETS"), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;margin-top:6px;")
  }, _h("div", {
    className: "press",
    onClick: aw.addSetsMinus,
    style: css("width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.06);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-weight:700;")
  }, "\u2212"), _h("div", {
    className: "sora",
    style: css("font-size:16px;font-weight:800;color:#F4ECDD;")
  }, aw.addSets), _h("div", {
    className: "press",
    onClick: aw.addSetsPlus,
    style: css("width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.06);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-weight:700;")
  }, "+"))), _h("div", {
    style: css("border-radius:13px;background:rgba(255,255,255,.04);padding:9px;")
  }, _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1px;color:#8E8475;text-align:center;")
  }, "MIN REPS"), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;margin-top:6px;")
  }, _h("div", {
    className: "press",
    onClick: aw.addLoMinus,
    style: css("width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.06);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-weight:700;")
  }, "\u2212"), _h("div", {
    className: "sora",
    style: css("font-size:16px;font-weight:800;color:#F4ECDD;")
  }, aw.addLo), _h("div", {
    className: "press",
    onClick: aw.addLoPlus,
    style: css("width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.06);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-weight:700;")
  }, "+"))), _h("div", {
    style: css("border-radius:13px;background:rgba(255,255,255,.04);padding:9px;")
  }, _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1px;color:#8E8475;text-align:center;")
  }, "MAX REPS"), _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;margin-top:6px;")
  }, _h("div", {
    className: "press",
    onClick: aw.addHiMinus,
    style: css("width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.06);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-weight:700;")
  }, "\u2212"), _h("div", {
    className: "sora",
    style: css("font-size:16px;font-weight:800;color:#F4ECDD;")
  }, aw.addHi), _h("div", {
    className: "press",
    onClick: aw.addHiPlus,
    style: css("width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.06);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-weight:700;")
  }, "+")))), _h("div", {
    style: css("margin-top:13px;display:flex;gap:9px;")
  }, _h("div", {
    className: "press",
    onClick: aw.addConfirm,
    style: css("flex:1;text-align:center;padding:12px;border-radius:12px;background:#57C08A;color:#06150E;font-weight:800;font-size:13px;font-family:'Sora',sans-serif;")
  }, "\uFF0B Add to session"), _h("div", {
    className: "press",
    onClick: aw.addToggle,
    style: css("padding:12px 16px;border-radius:12px;background:rgba(255,255,255,.06);color:#A99E8C;font-weight:800;font-size:13px;")
  }, "Cancel"))));
}
export function PostWorkoutScreen({
  v
}) {
  const {
    post,
    bodyLab,
    nav
  } = v;
  return _h("div", {
    style: css("min-height:838px;padding:90px 24px 60px;display:flex;flex-direction:column;align-items:center;text-align:center;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("width:96px;height:96px;border-radius:50%;background:linear-gradient(140deg,var(--acl),var(--acd));display:flex;align-items:center;justify-content:center;box-shadow:0 16px 40px rgba(var(--acdr),.4);animation:pop .5s cubic-bezier(.34,1.5,.5,1) both;")
  }, _h("svg", {
    width: "46",
    height: "46",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:var(--ink);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M5 13l4 4 10-11"
  }))), _h("div", {
    style: css("margin-top:24px;font-size:12px;font-weight:800;letter-spacing:2px;color:#8E8475;animation:rise .5s ease both;animation-delay:.1s;")
  }, "SESSION COMPLETE"), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:33px;letter-spacing:-1px;color:#F4ECDD;animation:rise .5s ease both;animation-delay:.14s;")
  }, "Nicely ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "done.")), _h("div", {
    style: css("margin-top:6px;font-size:14px;color:#8E8475;font-weight:600;")
  }, post.title), _h("div", {
    style: css("margin-top:28px;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:13px;")
  }, post.stats.map((st, i) => _h("div", {
    key: i,
    style: {
      ...css("border-radius:22px;padding:22px 16px;animation:pop .45s cubic-bezier(.34,1.4,.5,1) both;"),
      background: st.bg,
      animationDelay: st.delay
    }
  }, _h("div", {
    className: "sora",
    style: {
      ...css("font-weight:800;font-size:32px;line-height:1;"),
      color: st.fg
    }
  }, st.value), _h("div", {
    style: {
      ...css("margin-top:8px;font-size:11px;font-weight:800;letter-spacing:1.2px;"),
      color: st.muted
    }
  }, st.label)))), _h("div", {
    style: css("margin-top:26px;width:100%;text-align:left;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "MUSCLES ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "HIT")), _h("div", {
    style: css("margin-top:12px;display:flex;justify-content:center;")
  }, _h("div", {
    style: css("width:100%;max-width:342px;border-radius:26px;overflow:hidden;border:1px solid rgba(255,255,255,.07);box-shadow:0 16px 40px rgba(0,0,0,.3);")
  }, _h(Body3D, {
    chrome: "mini",
    mode: "trained",
    heat: post.heat,
    accent: bodyLab.accent,
    background: "transparent",
    autoRotate: bodyLab.autoRotate,
    onReady: bodyLab.onReady,
    height: "456px"
  }))), _h("div", {
    style: css("margin-top:11px;display:flex;flex-wrap:wrap;gap:8px;")
  }, post.muscleChips.map((mc, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:11px;background:rgba(194,59,44,.13);border:1px solid rgba(194,59,44,.35);")
  }, _h("span", {
    style: css("width:9px;height:9px;border-radius:50%;background:#C23B2C;")
  }), _h("span", {
    style: css("font-size:12px;font-weight:800;color:#F4ECDD;")
  }, mc.name), _h("span", {
    style: css("font-size:10.5px;font-weight:700;color:#C9BEAD;")
  }, mc.sets))))), _h("div", {
    style: css("margin-top:22px;width:100%;text-align:left;")
  }, _h("div", {
    style: css("font-size:12px;font-weight:800;letter-spacing:2px;color:#8E8475;")
  }, "SHARE YOUR ", _h("span", {
    style: css("color:#F4ECDD;")
  }, "SESSION")), _h("div", {
    style: css("margin-top:12px;border-radius:26px;padding:22px 20px;background:linear-gradient(160deg,#26201720,#1B1712);background-color:#1E1913;border:1px solid rgba(var(--acr),.22);position:relative;overflow:hidden;")
  }, _h("div", {
    style: css("position:absolute;top:-50px;right:-50px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(var(--acr),.16),transparent 70%);pointer-events:none;")
  }), _h("div", {
    className: "sora",
    style: css("font-size:13px;font-weight:800;letter-spacing:3.5px;color:var(--ac);")
  }, "IRONLOG"), _h("div", {
    className: "sora",
    style: css("margin-top:9px;font-size:23px;font-weight:800;color:#F4ECDD;line-height:1.12;")
  }, post.shareTitle), _h("div", {
    style: css("font-size:12px;color:#8E8475;font-weight:700;margin-top:4px;")
  }, post.shareMeta), _h("div", {
    style: css("margin-top:15px;border-radius:16px;padding:14px 16px;background:linear-gradient(135deg,var(--acl),var(--acd));display:flex;justify-content:space-between;")
  }, _h("div", {
    style: css("text-align:center;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:20px;font-weight:800;color:var(--ink);line-height:1;")
  }, post.dur), _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1px;color:rgba(var(--inkr),.65);margin-top:4px;")
  }, "MINUTES")), _h("div", {
    style: css("text-align:center;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:20px;font-weight:800;color:var(--ink);line-height:1;")
  }, post.sets), _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1px;color:rgba(var(--inkr),.65);margin-top:4px;")
  }, "SETS")), _h("div", {
    style: css("text-align:center;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:20px;font-weight:800;color:var(--ink);line-height:1;")
  }, post.vol), _h("div", {
    style: css("font-size:9px;font-weight:800;letter-spacing:1px;color:rgba(var(--inkr),.65);margin-top:4px;")
  }, "VOLUME KG"))), _h("div", {
    style: css("margin-top:14px;font-size:10px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "TOP LIFTS"), _h("div", {
    style: css("margin-top:8px;display:flex;flex-direction:column;gap:6px;")
  }, post.tops.map((tp, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    style: css("font-size:12.5px;font-weight:700;color:#C9BEAD;")
  }, tp.ex), _h("div", {
    className: "sora",
    style: css("font-size:12.5px;font-weight:800;color:#F4ECDD;")
  }, tp.disp)))), _h("div", {
    style: css("margin-top:12px;font-size:11px;color:#8E8475;font-weight:600;")
  }, "Muscles hit: ", _h("span", {
    style: css("color:#C9BEAD;")
  }, post.shareMuscles)), _h("div", {
    style: css("margin-top:16px;display:flex;gap:10px;")
  }, _h("div", {
    className: "press",
    onClick: post.onShare,
    style: css("flex:1;text-align:center;padding:13px;border-radius:13px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-family:'Sora',sans-serif;font-weight:800;font-size:13px;")
  }, "\uD83D\uDCE4 Share"), _h("div", {
    className: "press",
    onClick: post.onSaveImg,
    style: css("padding:13px 18px;border-radius:13px;background:rgba(255,255,255,.06);color:#C9BEAD;font-weight:800;font-size:13px;")
  }, "Save image")), post.shareMsg && _h("div", {
    style: css("margin-top:10px;font-size:12px;font-weight:700;color:#57C08A;")
  }, post.shareMsg))), _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("margin-top:28px;width:100%;padding:16px;border-radius:16px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-family:'Sora',sans-serif;font-weight:800;font-size:15px;")
  }, "Back to home"), _h("div", {
    className: "press",
    onClick: nav.stats,
    style: css("margin-top:12px;font-size:13px;font-weight:800;color:#8E8475;")
  }, "View stats \u2192"));
}
export function SettingsHub({
  v
}) {
  const {
    nav,
    user,
    settings
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "mob-only",
    style: css("display:flex;justify-content:space-between;align-items:flex-start;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  })))), _h("div", {
    style: css("margin-top:18px;display:flex;justify-content:space-between;align-items:center;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:26px;letter-spacing:-1px;color:#F4ECDD;")
  }, "Settings")), _h("div", {
    style: css("margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:11px;")
  }, _h("div", {
    className: "press",
    onClick: nav.acct,
    style: css("grid-column:span 2;display:flex;align-items:center;gap:14px;padding:16px;border-radius:22px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("position:relative;width:54px;height:54px;flex-shrink:0;")
  }, user.hasPhoto && _h("div", {
    role: "img",
    "aria-label": "Profile photo",
    style: {
      ...css("width:54px;height:54px;border-radius:18px;background-size:cover;background-position:center;"),
      border: `2px solid ${user.ring}`,
      backgroundImage: user.photoCss
    }
  }), user.noPhoto && _h("div", {
    style: {
      ...css("width:54px;height:54px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:800;font-size:19px;"),
      background: user.tint,
      border: `2px solid ${user.ring}`,
      color: user.color
    }
  }, user.av)), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:17px;font-weight:800;color:#F4ECDD;")
  }, user.name), _h("div", {
    style: css("font-size:11px;font-weight:700;color:#8E8475;margin-top:2px;")
  }, settings.email)), _h("span", {
    style: css("color:#5A5147;font-size:15px;")
  }, "\u203A")), _h("div", {
    className: "press",
    onClick: nav.billing,
    style: css("grid-column:span 2;border-radius:22px;padding:18px;background:linear-gradient(150deg,var(--acl),var(--ac) 55%,var(--acd));box-shadow:0 14px 30px rgba(var(--acdr),.26);")
  }, _h("div", {
    style: css("display:flex;align-items:center;justify-content:space-between;")
  }, _h("span", {
    style: css("font-size:22px;")
  }, settings.planIcon), _h("span", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:1.2px;color:rgba(var(--inkr),.6);")
  }, settings.planBadge)), _h("div", {
    className: "sora",
    style: css("margin-top:12px;font-size:19px;font-weight:800;color:var(--ink);")
  }, settings.planName), _h("div", {
    style: css("font-size:11.5px;font-weight:700;color:rgba(var(--inkr),.68);margin-top:2px;")
  }, settings.planSub, " \xB7 manage \u203A")), settings.tiles.map((t, i) => _h("div", {
    key: i,
    className: "press",
    onClick: t.onTap,
    style: css(t.style)
  }, _h("div", {
    style: css("font-size:22px;")
  }, t.icon), _h("div", {
    style: {
      ...css("margin-top:12px;font-size:13.5px;font-weight:800;"),
      color: t.fg
    }
  }, t.label), _h("div", {
    style: css("font-size:10.5px;font-weight:700;color:#8E8475;margin-top:2px;")
  }, t.sub))), _h("div", {
    style: css("grid-column:span 2;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.06);")
  }, settings.rows.map((it, i) => _h("div", {
    key: i,
    className: "press",
    onClick: it.onTap,
    style: css(it.style)
  }, _h("span", {
    style: css("font-size:16px;width:22px;flex-shrink:0;")
  }, it.icon), _h("span", {
    style: {
      ...css("flex:1;min-width:0;font-size:13.5px;font-weight:700;"),
      color: it.fg
    }
  }, it.label), _h("span", {
    style: css("font-size:11.5px;font-weight:700;color:#6E665B;")
  }, it.value), _h("span", {
    style: css("color:#5A5147;font-size:14px;")
  }, "\u203A"))))), _h("div", {
    className: "press",
    onClick: settings.logout,
    style: css("margin-top:16px;padding:15px;border-radius:16px;border:1px solid rgba(255,255,255,.1);text-align:center;font-size:14px;font-weight:800;color:#C9BEAD;")
  }, "Log out"), _h("div", {
    style: css("margin-top:20px;text-align:center;font-size:11px;font-weight:600;color:#5A5147;line-height:1.6;")
  }, "IronLog ", settings.version, _h("br", null), "Made for people who actually lift"));
}
export function AccountPage({
  v
}) {
  const {
    sub,
    user
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isAcct && _h(_F, null, _h("div", {
    style: css("margin-top:24px;display:flex;flex-direction:column;gap:14px;")
  }, _h("div", {
    style: css("display:flex;flex-direction:column;align-items:center;gap:13px;padding:20px;border-radius:22px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css("position:relative;width:92px;height:92px;")
  }, user.hasPhoto && _h("div", {
    role: "img",
    "aria-label": "Your profile photo",
    style: {
      ...css("width:92px;height:92px;border-radius:30px;background-size:cover;background-position:center;"),
      border: `2.5px solid ${user.ring}`,
      backgroundImage: user.photoCss
    }
  }), user.noPhoto && _h("div", {
    style: {
      ...css("width:92px;height:92px;border-radius:30px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:800;font-size:32px;"),
      background: user.tint,
      border: `2.5px solid ${user.ring}`,
      color: user.color
    }
  }, user.av), _h("label", {
    style: css("position:absolute;right:-4px;bottom:-4px;width:32px;height:32px;border-radius:11px;background:linear-gradient(135deg,var(--acl),var(--acd));border:2.5px solid #221E18;display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;")
  }, "\uD83D\uDCF7", _h("input", {
    type: "file",
    accept: "image/*",
    onChange: sub.onPhoto,
    style: css("position:absolute;inset:0;opacity:0;cursor:pointer;")
  }))), _h("div", {
    style: css("text-align:center;")
  }, _h("div", {
    style: css("font-size:12.5px;font-weight:800;color:#F4ECDD;")
  }, "Profile photo"), _h("div", {
    style: css("font-size:10.5px;font-weight:600;color:#8E8475;margin-top:2px;")
  }, "Shown on your card in Social")), user.hasPhoto && _h(_F, null, _h("div", {
    className: "press",
    onClick: sub.removePhoto,
    style: css("padding:7px 13px;border-radius:10px;background:rgba(226,106,79,.12);border:1px solid rgba(226,106,79,.3);font-size:11px;font-weight:800;color:#E26A4F;")
  }, "Remove photo"))), _h("div", null, _h("div", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1.2px;color:#8E8475;margin-bottom:8px;")
  }, "NAME"), _h("input", {
    value: sub.name,
    onChange: sub.onName,
    style: css("width:100%;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:14px;color:#F4ECDD;font-size:14.5px;font-weight:600;outline:none;display:block;")
  })), _h("div", null, _h("div", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1.2px;color:#8E8475;margin-bottom:8px;")
  }, "EMAIL"), _h("input", {
    value: sub.email,
    onChange: sub.onEmail,
    style: css("width:100%;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:14px;color:#F4ECDD;font-size:14.5px;font-weight:600;outline:none;display:block;")
  })), _h("div", null, _h("div", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1.2px;color:#8E8475;margin-bottom:8px;")
  }, "AVATAR COLOR"), _h("div", {
    style: css("display:flex;gap:10px;")
  }, sub.colors.map((c, i) => _h("div", {
    key: i,
    className: "press",
    onClick: c.onPick,
    style: {
      ...css("width:36px;height:36px;border-radius:12px;"),
      background: c.hex,
      border: `2.5px solid ${c.border}`
    }
  })))), _h("div", {
    className: "press",
    onClick: sub.changePw,
    style: css("display:flex;align-items:center;justify-content:space-between;padding:15px 17px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:13.5px;font-weight:700;color:#F4ECDD;")
  }, "Change password"), _h("span", {
    style: css("color:#5A5147;")
  }, "\u203A")), _h("div", {
    className: "press",
    onClick: sub.save,
    style: css("margin-top:6px;padding:15px;border-radius:16px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:14.5px;")
  }, "Save changes"))));
}
export function BillingPage({
  v
}) {
  const {
    sub,
    settings
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isBilling && _h(_F, null, _h("div", {
    style: css("margin-top:22px;border-radius:22px;padding:19px;background:linear-gradient(150deg,var(--acl),var(--ac) 55%,var(--acd));box-shadow:0 16px 36px rgba(var(--acdr),.28);")
  }, _h("div", {
    style: css("font-size:10px;font-weight:800;letter-spacing:1.6px;color:rgba(var(--inkr),.6);")
  }, "CURRENT PLAN"), _h("div", {
    className: "sora",
    style: css("margin-top:8px;font-size:25px;font-weight:800;color:var(--ink);")
  }, settings.planName), _h("div", {
    style: css("font-size:12px;font-weight:700;color:rgba(var(--inkr),.68);margin-top:3px;")
  }, settings.planSub)), _h("div", {
    style: css("margin-top:12px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.06);")
  }, sub.billRows.map((r, i) => _h("div", {
    key: i,
    style: css(r.style)
  }, _h("span", {
    style: css("font-size:13px;font-weight:700;color:#8E8475;")
  }, r.k), _h("span", {
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, r.v)))), _h("div", {
    className: "press",
    onClick: sub.manage,
    style: css("margin-top:14px;padding:15px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.08);text-align:center;font-size:14px;font-weight:800;color:#F4ECDD;")
  }, "Manage in App Store \u2197"), _h("div", {
    className: "press",
    onClick: sub.restore,
    style: css("margin-top:10px;padding:15px;border-radius:16px;border:1px solid rgba(255,255,255,.09);text-align:center;font-size:14px;font-weight:800;color:#C9BEAD;")
  }, "Restore purchases"), _h("div", {
    className: "press",
    onClick: sub.changePlan,
    style: css("margin-top:10px;text-align:center;font-size:13px;font-weight:800;color:var(--ac);")
  }, "See all plans")));
}
export function NotifPrefsPage({
  v
}) {
  const {
    sub,
    nav
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isNotif && _h(_F, null, _h("div", {
    style: css("margin-top:22px;display:flex;flex-direction:column;gap:10px;")
  }, sub.notifs.map((n, i) => _h("div", {
    key: i,
    className: "press",
    onClick: n.onToggle,
    style: css("display:flex;align-items:center;gap:13px;padding:15px 17px;border-radius:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:19px;flex-shrink:0;")
  }, n.icon), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:13.5px;font-weight:800;color:#F4ECDD;")
  }, n.label), _h("div", {
    style: css("font-size:11.5px;font-weight:600;color:#8E8475;margin-top:2px;")
  }, n.sub)), _h("div", {
    style: css(n.trackStyle)
  }, _h("div", {
    style: css(n.knobStyle)
  }))))), _h("div", {
    style: css("margin-top:16px;padding:13px 15px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);font-size:11.5px;font-weight:600;color:#8E8475;line-height:1.6;")
  }, "Per-person training pings live in ", _h("span", {
    className: "press",
    onClick: nav.inbox,
    style: css("color:var(--ac);font-weight:800;")
  }, "Social"), ".")));
}
export function LegalPage({
  v
}) {
  const {
    sub
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isDoc && _h(_F, null, _h("div", {
    style: css("margin-top:20px;font-size:11px;font-weight:700;letter-spacing:1.2px;color:#5A5147;")
  }, sub.docMeta), _h("div", {
    style: css("margin-top:16px;display:flex;flex-direction:column;gap:18px;")
  }, sub.docBlocks.map((b, i) => _h("div", {
    key: i
  }, _h("div", {
    style: css("font-size:13.5px;font-weight:800;color:#F4ECDD;")
  }, b.h), _h("div", {
    style: css("margin-top:7px;font-size:13px;line-height:1.65;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, b.p)))), sub.docHasContact && _h(_F, null, _h("div", {
    style: css("margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);font-size:11.5px;font-weight:700;color:#8E8475;")
  }, "Questions? ", _h("span", {
    style: css("color:var(--ac);")
  }, sub.docContact)))));
}
export function HelpPage({
  v
}) {
  const {
    sub
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isHelp && _h(_F, null, _h("input", {
    value: sub.helpQ,
    onChange: sub.onHelpQ,
    placeholder: "\uD83D\uDD0D  Search help\u2026",
    style: css("width:100%;margin-top:20px;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(var(--acr),.3);border-radius:15px;color:#F4ECDD;font-size:13.5px;font-weight:600;outline:none;display:block;box-sizing:border-box;")
  }), _h("div", {
    style: css("margin-top:20px;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "COMMON QUESTIONS"), _h("div", {
    style: css("margin-top:11px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.06);")
  }, sub.faqs.map((f, i) => _h("div", {
    key: i,
    className: "press",
    onClick: f.onTap,
    style: css(f.style)
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:11px;")
  }, _h("span", {
    style: css("flex:1;min-width:0;font-size:13px;font-weight:700;color:#F4ECDD;")
  }, f.q), _h("span", {
    style: css(f.chevStyle)
  }, "\u203A")), f.open && _h(_F, null, _h("div", {
    style: css("margin-top:9px;font-size:12.5px;line-height:1.65;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, f.a))))), sub.faqEmpty && _h(_F, null, _h("div", {
    style: css("margin-top:14px;text-align:center;padding:22px;font-size:12.5px;font-weight:600;color:#8E8475;")
  }, "Nothing matches that. Try emailing us below.")), _h("div", {
    className: "press",
    onClick: sub.emailSupport,
    style: css("margin-top:16px;padding:15px 17px;border-radius:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:12px;")
  }, _h("span", {
    style: css("font-size:18px;")
  }, "\uD83D\uDCAC"), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:12.5px;font-weight:800;color:#F4ECDD;")
  }, "Still stuck?"), _h("div", {
    style: css("font-size:10.5px;font-weight:700;color:#8E8475;margin-top:1px;")
  }, "Reply within one working day")), _h("span", {
    style: css("font-size:11.5px;font-weight:800;color:var(--ac);")
  }, "Email us"))));
}
export function AboutPage({
  v
}) {
  const {
    sub
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isAbout && _h(_F, null, _h("div", {
    style: css("margin-top:34px;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:27px;font-weight:800;line-height:1.28;letter-spacing:-1px;color:#F4ECDD;text-wrap:pretty;")
  }, "No AI coach.", _h("br", null), "No ads.", _h("br", null), "No selling your data.", _h("br", null), _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "Just your numbers,", _h("br", null), "kept honestly.")), _h("div", {
    style: css("margin-top:22px;font-size:13px;line-height:1.75;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, "IronLog is a small operation. We built it because every other lifting app either buried the data or charged us to see it."), _h("div", {
    style: css("margin-top:14px;font-size:13px;line-height:1.75;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, "If something's broken or missing, email us. It comes straight to the people who wrote the code.")), _h("div", {
    style: css("margin-top:30px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;")
  }, _h("span", {
    style: css("font-size:10.5px;font-weight:700;letter-spacing:1.2px;color:#5A5147;")
  }, "V3.1 \xB7 BUILD 412"), _h("div", {
    className: "press",
    onClick: sub.credits,
    style: css("font-size:11.5px;font-weight:800;color:var(--ac);")
  }, "Credits & licences \u203A"))));
}
export function DeleteAccountPage({
  v
}) {
  const {
    sub,
    settings
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isDelete && _h(_F, null, _h("div", {
    style: css("margin-top:16px;display:flex;gap:5px;")
  }, sub.delDots.map((d, i) => _h("div", {
    key: i,
    style: css(d.style)
  }))), sub.delStep1 && _h(_F, null, _h("div", {
    style: css("margin-top:20px;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:23px;font-weight:800;letter-spacing:-.9px;line-height:1.14;color:#F4ECDD;")
  }, "Before you go \u2014", _h("br", null), "would one of these help?"), _h("div", {
    style: css("margin-top:8px;font-size:12.5px;font-weight:600;color:#8E8475;")
  }, "No hard sell. If none fit, deleting is right below.")), _h("div", {
    style: css("margin-top:16px;display:flex;flex-direction:column;gap:9px;")
  }, sub.delAlts.map((a, i) => _h("div", {
    key: i,
    className: "press",
    onClick: a.onTap,
    style: css("display:flex;align-items:center;gap:11px;padding:14px 15px;border-radius:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:18px;flex-shrink:0;")
  }, a.icon), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:12.5px;font-weight:800;color:#F4ECDD;")
  }, a.title), _h("div", {
    style: css("font-size:10.5px;font-weight:600;color:#8E8475;margin-top:1px;")
  }, a.sub)), _h("span", {
    style: css("color:#5A5147;")
  }, "\u203A")))), _h("div", {
    style: css("margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);")
  }, _h("div", {
    style: css("font-size:11.5px;line-height:1.6;font-weight:700;color:#8E8475;")
  }, "Still want to delete? This removes 186 sessions, 14 PRs and 4 programs."), _h("div", {
    className: "press",
    onClick: sub.delNext,
    style: css("margin-top:12px;padding:14px;border-radius:15px;border:1.5px solid rgba(226,106,79,.4);text-align:center;font-size:13px;font-weight:800;color:#E26A4F;")
  }, "Continue to delete"))), sub.delStep2 && _h(_F, null, _h("div", {
    style: css("margin-top:20px;border-radius:22px;padding:19px;background:rgba(226,106,79,.08);border:1.5px solid rgba(226,106,79,.32);")
  }, _h("div", {
    style: css("font-size:28px;")
  }, "\u26A0\uFE0F"), _h("div", {
    className: "sora",
    style: css("margin-top:11px;font-size:18px;font-weight:800;color:#F4ECDD;")
  }, "We'll wait 30 days"), _h("div", {
    style: css("margin-top:8px;font-size:12.5px;line-height:1.6;font-weight:600;color:#E8B39F;text-wrap:pretty;")
  }, "Your account is deactivated immediately. Nothing is permanently erased until 5 September \u2014 log back in any time before then to cancel.")), _h("div", {
    style: css("margin-top:16px;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "WHAT GETS ERASED ON 5 SEPT"), _h("div", {
    style: css("margin-top:11px;display:flex;flex-direction:column;gap:9px;")
  }, sub.delRows.map((r, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:10px;")
  }, _h("span", {
    style: css("color:#E26A4F;font-size:13px;")
  }, "\u2715"), _h("span", {
    style: css("font-size:12.5px;font-weight:700;color:#8E8475;")
  }, r.t)))), _h("div", {
    style: css("margin-top:14px;padding:12px 14px;border-radius:13px;background:rgba(242,179,61,.07);border:1px solid rgba(var(--acr),.24);font-size:11px;line-height:1.6;font-weight:700;color:var(--ac);")
  }, "\u26A0 Your subscription won't auto-refund. Cancel it in the App Store first."), _h("div", {
    className: "press",
    onClick: sub.exportFirst,
    style: css("margin-top:16px;padding:15px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.08);text-align:center;font-size:14px;font-weight:800;color:#F4ECDD;")
  }, "Export my data first"), _h("input", {
    value: sub.delConfirm,
    onChange: sub.onDelConfirm,
    placeholder: "Type DELETE to confirm",
    style: css("width:100%;margin-top:12px;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(226,106,79,.3);border-radius:14px;color:#F4ECDD;font-size:14px;font-weight:700;outline:none;display:block;text-align:center;letter-spacing:2px;box-sizing:border-box;")
  }), _h("div", {
    className: "press",
    onClick: sub.delNext,
    style: {
      ...css("margin-top:12px;padding:15px;border-radius:16px;text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:14.5px;"),
      background: sub.delBtnBg,
      color: sub.delBtnFg
    }
  }, "Continue"), _h("div", {
    className: "press",
    onClick: sub.delBack,
    style: css("margin-top:10px;text-align:center;font-size:12.5px;font-weight:800;color:#8E8475;")
  }, "Back")), sub.delStep3 && _h(_F, null, _h("div", {
    style: css("margin-top:24px;width:56px;height:56px;border-radius:19px;background:rgba(226,106,79,.13);display:flex;align-items:center;justify-content:center;font-size:24px;")
  }, "\uD83D\uDD10"), _h("div", {
    className: "sora",
    style: css("margin-top:16px;font-size:22px;font-weight:800;letter-spacing:-.85px;color:#F4ECDD;")
  }, "Confirm it's you"), _h("div", {
    style: css("margin-top:9px;font-size:13px;line-height:1.6;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, "Last step. Enter your password to schedule deletion of ", settings.email, "."), _h("input", {
    value: sub.delPw,
    onChange: sub.onDelPw,
    type: "password",
    placeholder: "Your password",
    style: css("width:100%;margin-top:18px;padding:14px 16px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:14px;color:#F4ECDD;font-size:14.5px;font-weight:600;outline:none;display:block;box-sizing:border-box;")
  }), _h("div", {
    className: "press",
    onClick: sub.faceId,
    style: css("margin-top:11px;display:flex;align-items:center;gap:9px;padding:12px 14px;border-radius:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);")
  }, _h("span", {
    style: css("font-size:16px;")
  }, "\uD83D\uDE42"), _h("span", {
    style: css("flex:1;font-size:12px;font-weight:700;color:#C9BEAD;")
  }, "Use Face ID instead"), _h("span", {
    style: css("color:#5A5147;")
  }, "\u203A")), _h("div", {
    className: "press",
    onClick: sub.doDelete,
    style: {
      ...css("margin-top:16px;padding:15px;border-radius:16px;text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:14.5px;"),
      background: sub.delFinalBg,
      color: sub.delFinalFg
    }
  }, "Schedule deletion"), _h("div", {
    className: "press",
    onClick: sub.delBack,
    style: css("margin-top:10px;text-align:center;font-size:12.5px;font-weight:800;color:#8E8475;")
  }, "Back"))));
}
export function ExportPage({
  v
}) {
  const {
    sub
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isExport && _h(_F, null, _h("div", {
    style: css("margin-top:22px;font-size:13.5px;line-height:1.6;font-weight:600;color:#8E8475;text-wrap:pretty;")
  }, "Download everything IronLog holds about you as a single file. Includes every set, program, body-weight entry and personal record."), _h("div", {
    style: css("margin-top:18px;display:flex;flex-direction:column;gap:10px;")
  }, sub.exportFmts.map((f, i) => _h("div", {
    key: i,
    className: "press",
    onClick: f.onPick,
    style: css("display:flex;align-items:center;gap:13px;padding:15px 17px;border-radius:18px;background:#221E18;border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:19px;")
  }, f.icon), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:13.5px;font-weight:800;color:#F4ECDD;")
  }, f.label), _h("div", {
    style: css("font-size:11.5px;font-weight:600;color:#8E8475;margin-top:2px;")
  }, f.sub)), _h("span", {
    style: css("font-size:11.5px;font-weight:800;color:var(--ac);")
  }, f.size))))));
}
export function ReferralPage({
  v
}) {
  const {
    sub
  } = v;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:13px;")
  }, _h("div", {
    className: "press",
    onClick: sub.back,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    className: "sora",
    style: css("font-size:22px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, sub.title)), sub.isReferral && _h(_F, null, _h("div", {
    style: css("margin-top:22px;border-radius:24px;padding:22px;background:linear-gradient(150deg,var(--acl),var(--ac) 55%,var(--acd));box-shadow:0 16px 36px rgba(var(--acdr),.3);text-align:center;")
  }, _h("div", {
    style: css("font-size:38px;")
  }, "\uD83C\uDF81"), _h("div", {
    className: "sora",
    style: css("margin-top:10px;font-size:22px;font-weight:800;color:var(--ink);line-height:1.15;")
  }, "Give a month,", _h("br", null), "get a month"), _h("div", {
    style: css("margin-top:9px;font-size:12.5px;font-weight:700;color:rgba(var(--inkr),.7);")
  }, "They start free. You get 30 days on us when they subscribe.")), _h("div", {
    style: css("margin-top:16px;display:flex;align-items:center;gap:10px;padding:15px 17px;border-radius:16px;background:#221E18;border:1.5px dashed rgba(var(--acr),.4);")
  }, _h("span", {
    className: "sora",
    style: css("flex:1;font-size:17px;font-weight:800;letter-spacing:2px;color:var(--ac);")
  }, sub.refCode), _h("div", {
    className: "press",
    onClick: sub.copyCode,
    style: css("padding:8px 13px;border-radius:11px;background:rgba(var(--acr),.15);font-size:11.5px;font-weight:800;color:var(--ac);")
  }, "Copy")), _h("div", {
    className: "press",
    onClick: sub.share,
    style: css("margin-top:12px;padding:15px;border-radius:16px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:14.5px;")
  }, "Share invite link"), _h("div", {
    style: css("margin-top:20px;display:flex;gap:10px;")
  }, _h("div", {
    style: css("flex:1;padding:14px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);text-align:center;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:20px;font-weight:800;color:#F4ECDD;")
  }, sub.refInvited), _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.8px;color:#8E8475;margin-top:4px;")
  }, "INVITED")), _h("div", {
    style: css("flex:1;padding:14px;border-radius:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);text-align:center;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:20px;font-weight:800;color:#57C08A;")
  }, sub.refEarned), _h("div", {
    style: css("font-size:9.5px;font-weight:800;letter-spacing:.8px;color:#8E8475;margin-top:4px;")
  }, "MONTHS EARNED")))));
}
export function AdminScreen({
  v
}) {
  const {
    isAdmin,
    nav,
    admin,
    jump
  } = v;
  if (!isAdmin) return null;
  return _h("div", {
    className: "screen",
    style: css("min-height:838px;padding:60px 22px 132px;animation:scrnIn .5s ease both;")
  }, _h("div", {
    className: "press",
    onClick: nav.home,
    style: css("width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;")
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: css("fill:none;stroke:#F4ECDD;stroke-width:2;stroke-linecap:round;stroke-linejoin:round")
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  }))), _h("div", {
    style: css("margin-top:22px;font-size:12px;font-weight:700;letter-spacing:2.5px;color:#8E8475;")
  }, "\u2699\uFE0F ADMIN PANEL"), _h("div", {
    className: "sora",
    style: css("margin-top:7px;font-weight:800;font-size:36px;line-height:1;letter-spacing:-1.2px;color:#F4ECDD;")
  }, "Manage ", _h("span", {
    style: css("background:linear-gradient(135deg,var(--acl),var(--acd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;")
  }, "Data")), admin.locked && _h(_F, null, _h("div", {
    style: css("margin-top:24px;border-radius:22px;padding:22px;background:#221E18;border:1.5px solid rgba(var(--acr),.25);")
  }, _h("div", {
    style: css("width:52px;height:52px;border-radius:18px;background:rgba(var(--acr),.13);display:flex;align-items:center;justify-content:center;font-size:23px;")
  }, "\uD83D\uDD10"), _h("div", {
    className: "sora",
    style: css("margin-top:14px;font-size:19px;font-weight:800;letter-spacing:-.7px;color:#F4ECDD;")
  }, "Password required"), _h("div", {
    style: css("margin-top:8px;font-size:12.5px;line-height:1.6;font-weight:600;color:#8E8475;")
  }, "Admin tools and the demo screen jumper are hidden from the public build."), _h("input", {
    value: admin.pw,
    onChange: admin.onPw,
    type: "password",
    placeholder: "Admin password",
    style: {
      ...css("width:100%;margin-top:18px;padding:14px 16px;background:rgba(255,255,255,.05);border-radius:14px;color:#F4ECDD;font-size:16px;font-weight:700;outline:none;display:block;text-align:center;letter-spacing:5px;box-sizing:border-box;"),
      border: "1.5px solid " + admin.pwBorder
    }
  }), admin.err && _h(_F, null, _h("div", {
    style: css("margin-top:9px;text-align:center;font-size:12px;font-weight:800;color:#E26A4F;")
  }, "Wrong password \u2717")), _h("div", {
    className: "press",
    onClick: admin.unlock,
    style: css("margin-top:14px;padding:15px;border-radius:16px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:14.5px;")
  }, "Unlock"))), admin.unlocked && _h(_F, null, _h("div", {
    style: css("margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:13px;")
  }, admin.stats.map((a, i) => _h("div", {
    key: i,
    style: {
      ...css("border-radius:20px;padding:20px 16px;background:#221E18;border:1px solid rgba(255,255,255,.06);animation:pop .4s cubic-bezier(.34,1.4,.5,1) both;"),
      animationDelay: a.delay
    }
  }, _h("div", {
    style: css("font-size:24px;")
  }, a.emoji), _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:26px;color:#F4ECDD;margin-top:8px;")
  }, a.value), _h("div", {
    style: css("font-size:11px;font-weight:800;letter-spacing:.8px;color:#8E8475;margin-top:2px;")
  }, a.label)))), _h("div", {
    style: css("margin-top:18px;display:flex;flex-direction:column;gap:11px;")
  }, admin.rows.map((r, i) => _h("div", {
    key: i,
    className: "press",
    style: css("display:flex;align-items:center;gap:13px;padding:16px;border-radius:16px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);")
  }, _h("span", {
    style: css("font-size:20px;")
  }, r.emoji), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, r.title), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;")
  }, r.sub)), _h("span", {
    style: css("color:#6E665B;")
  }, "\u203A")))), _h("div", {
    style: css("margin-top:22px;border-radius:20px;background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.12);padding:17px 16px;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:9px;")
  }, _h("span", {
    style: css("font-size:16px;")
  }, "\uD83E\uDDEA"), _h("div", {
    style: css("flex:1;")
  }, _h("div", {
    style: css("font-size:13.5px;font-weight:800;color:#F4ECDD;")
  }, "Jump to any screen"), _h("div", {
    style: css("font-size:10.5px;color:#8E8475;font-weight:600;margin-top:1px;")
  }, "Demo shortcut \u2014 not in the real build"))), jump.groups.map((g, i) => _h(React.Fragment, {
    key: i
  }, _h("div", {
    style: css("margin-top:14px;font-size:9.5px;font-weight:800;letter-spacing:1.2px;color:#6E665B;")
  }, g.title), _h("div", {
    style: css("margin-top:7px;display:flex;flex-wrap:wrap;gap:6px;")
  }, g.items.map((j, k) => _h("div", {
    key: k,
    className: "press",
    onClick: j.go,
    style: css(j.style)
  }, j.label)))))), _h("div", {
    className: "press",
    onClick: admin.lock,
    style: css("margin-top:18px;padding:14px;border-radius:15px;border:1px solid rgba(255,255,255,.1);text-align:center;font-size:13px;font-weight:800;color:#C9BEAD;")
  }, "\uD83D\uDD12 Lock admin panel")));
}
export function ProgramEditor({
  v
}) {
  const {
    ed
  } = v;
  if (!ed.open) return null;
  return _h("div", {
    style: css("position:absolute;inset:0;z-index:93;background:#16120D;overflow-y:auto;animation:fadeIn .2s ease both;")
  }, _h("div", {
    style: css("position:sticky;top:0;z-index:5;background:#16120D;border-bottom:1px solid rgba(255,255,255,.06);padding:26px 20px 15px;display:flex;align-items:center;justify-content:space-between;gap:12px;")
  }, _h("div", {
    style: css("min-width:0;")
  }, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:20px;color:#F4ECDD;")
  }, ed.title), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;margin-top:2px;")
  }, ed.sub)), _h("div", {
    style: css("display:flex;gap:8px;flex-shrink:0;")
  }, _h("div", {
    className: "press",
    onClick: ed.cancel,
    style: css("padding:11px 15px;border-radius:13px;background:rgba(255,255,255,.06);color:#A99E8C;font-size:13px;font-weight:800;")
  }, "Cancel"), _h("div", {
    className: "press",
    onClick: ed.save,
    style: css("padding:11px 18px;border-radius:13px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-size:13px;font-weight:800;font-family:'Sora',sans-serif;")
  }, "Save"))), _h("div", {
    style: css("padding:18px 20px 150px;")
  }, ed.hasErr && _h(_F, null, _h("div", {
    style: css("margin-bottom:14px;padding:12px 14px;border-radius:13px;background:rgba(232,90,90,.12);border:1px solid rgba(232,90,90,.3);color:#E8807A;font-size:12.5px;font-weight:800;")
  }, ed.err)), _h("div", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "ICON"), _h("div", {
    style: css("margin-top:9px;display:flex;align-items:center;gap:11px;")
  }, _h("div", {
    className: "press",
    onClick: ed.toggleEmoji,
    style: css(ed.emojiBtnStyle)
  }, ed.emoji), _h("div", {
    style: css("font-size:12px;color:#8E8475;font-weight:600;")
  }, ed.emojiHint)), ed.emojiOpen && _h(_F, null, _h("div", {
    style: css("margin-top:11px;display:flex;flex-wrap:wrap;gap:6px;padding:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);border-radius:16px;animation:pop .28s ease both;")
  }, ed.emojis.map((pe1, i) => _h("div", {
    key: i,
    className: "press",
    onClick: pe1.onPick,
    style: css(pe1.style)
  }, pe1.ch)))), _h("div", {
    style: css("margin-top:18px;font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "PROGRAM NAME"), _h("input", {
    value: ed.name,
    onChange: ed.onName,
    placeholder: "e.g. PPL 2026, Bro Split",
    style: css("margin-top:9px;width:100%;box-sizing:border-box;padding:13px 15px;background:rgba(255,255,255,.05);border:1.5px solid rgba(var(--acr),.22);border-radius:14px;font-size:15px;font-weight:700;color:#F4ECDD;outline:none;font-family:'Manrope',sans-serif;")
  }), _h("div", {
    style: css("margin-top:16px;font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "DESCRIPTION"), _h("input", {
    value: ed.desc,
    onChange: ed.onDesc,
    placeholder: "Short description",
    style: css("margin-top:9px;width:100%;box-sizing:border-box;padding:13px 15px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.08);border-radius:14px;font-size:14px;font-weight:600;color:#F4ECDD;outline:none;font-family:'Manrope',sans-serif;")
  }), _h("div", {
    style: css("margin-top:18px;font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "TRAINING TYPE"), _h("div", {
    style: css("margin-top:9px;display:flex;gap:9px;")
  }, ed.types.map((tt, i) => _h("div", {
    key: i,
    className: "press",
    onClick: tt.onClick,
    style: css(tt.style)
  }, tt.label))), _h("div", {
    className: "press",
    onClick: ed.togglePub,
    style: css("margin-top:16px;display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:15px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);")
  }, _h("div", {
    style: css(ed.switchStyle)
  }, _h("div", {
    style: css(ed.knobStyle)
  })), _h("div", {
    style: css("font-size:12.5px;font-weight:700;color:#A99E8C;")
  }, ed.pubLabel)), _h("div", {
    style: css("margin-top:24px;display:flex;align-items:center;justify-content:space-between;gap:12px;")
  }, _h("div", {
    style: css("font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, ed.wCount), _h("div", {
    className: "press",
    onClick: ed.addWorkout,
    style: css("padding:9px 14px;border-radius:12px;background:rgba(var(--acr),.13);border:1px solid rgba(var(--acr),.3);color:var(--ac);font-size:12px;font-weight:800;")
  }, "\uFF0B Add workout")), _h("div", {
    style: css("margin-top:13px;display:flex;flex-direction:column;gap:14px;")
  }, ed.workouts.map((ew, wi) => _h("div", {
    key: wi,
    style: css("border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);padding:14px;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:9px;")
  }, _h("div", {
    className: "press",
    onClick: ew.toggleEmoji,
    style: css(ew.emojiBtnStyle)
  }, ew.emoji), _h("input", {
    value: ew.name,
    onChange: ew.onName,
    placeholder: "Workout name",
    style: css("flex:1;min-width:0;padding:11px 13px;background:rgba(255,255,255,.05);border:1.5px solid rgba(var(--acr),.2);border-radius:12px;font-size:14px;font-weight:700;color:#F4ECDD;outline:none;font-family:'Manrope',sans-serif;")
  }), _h("div", {
    className: "press",
    onClick: ew.onRemove,
    style: css("width:34px;height:34px;border-radius:11px;background:rgba(232,90,90,.12);color:#E8807A;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;")
  }, "\u2715")), ew.emojiOpen && _h(_F, null, _h("div", {
    style: css("margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;padding:11px;background:rgba(255,255,255,.05);border-radius:14px;animation:pop .28s ease both;")
  }, ew.emojis.map((we, i) => _h("div", {
    key: i,
    className: "press",
    onClick: we.onPick,
    style: css(we.style)
  }, we.ch)))), _h("div", {
    style: css("margin-top:12px;display:flex;flex-direction:column;gap:9px;")
  }, ew.entries.map((en, ei) => _h("div", {
    key: ei,
    style: css("display:flex;gap:7px;align-items:flex-start;")
  }, _h("div", {
    style: css("display:flex;flex-direction:column;gap:5px;padding-top:9px;flex-shrink:0;")
  }, _h("div", {
    className: "press",
    onClick: en.onUp,
    style: css(en.upStyle)
  }, "\u2191"), _h("div", {
    className: "press",
    onClick: en.onDown,
    style: css(en.downStyle)
  }, "\u2193")), _h("div", {
    style: css("flex:1;min-width:0;")
  }, en.isPlain && _h(_F, null, _h("div", {
    style: css("background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:15px;padding:11px 12px;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:8px;")
  }, _h("input", {
    value: en.name,
    onChange: en.onName,
    onFocus: en.onFocus,
    placeholder: "Exercise name",
    style: css("flex:1;min-width:0;padding:10px 12px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:11px;font-size:13px;font-weight:700;color:#F4ECDD;outline:none;font-family:'Manrope',sans-serif;")
  }), _h("div", {
    className: "press",
    onClick: en.onRemove,
    style: css("width:30px;height:30px;border-radius:10px;background:rgba(232,90,90,.1);color:#E8807A;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;")
  }, "\u2715")), en.hasSugg && _h(_F, null, _h("div", {
    style: css("margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;")
  }, en.sugg.map((sg, i) => _h("div", {
    key: i,
    className: "press",
    onClick: sg.onPick,
    style: css("padding:7px 11px;border-radius:10px;background:rgba(var(--acr),.1);border:1px solid rgba(var(--acr),.26);color:var(--ac);font-size:11px;font-weight:800;")
  }, sg.name)))), _h("div", {
    style: css("margin-top:10px;display:flex;gap:8px;")
  }, en.nums.map((nm, i) => _h("div", {
    key: i,
    style: css("flex:1;background:rgba(255,255,255,.04);border-radius:12px;padding:8px 9px;")
  }, _h("div", {
    style: css("font-size:8.5px;font-weight:800;letter-spacing:.8px;color:#8E8475;text-align:center;")
  }, nm.label), _h("div", {
    style: css("margin-top:6px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    className: "press",
    onClick: nm.onMinus,
    style: css("width:24px;height:24px;border-radius:8px;background:rgba(255,255,255,.07);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-size:14px;")
  }, "\u2212"), _h("div", {
    className: "sora",
    style: css("font-size:14px;font-weight:800;color:#F4ECDD;")
  }, nm.value), _h("div", {
    className: "press",
    onClick: nm.onPlus,
    style: css("width:24px;height:24px;border-radius:8px;background:rgba(255,255,255,.07);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-size:13px;")
  }, "\uFF0B"))))))), en.isSS && _h(_F, null, _h("div", null, _h("div", {
    style: css(en.ssHeadStyle)
  }, _h("div", {
    style: css("font-size:15px;")
  }, "\uD83D\uDD17"), _h("div", {
    style: css("flex:1;min-width:0;")
  }, _h("div", {
    style: css("font-size:11.5px;font-weight:800;color:var(--ac);letter-spacing:.8px;")
  }, "SUPERSET"), en.ssClosed && _h(_F, null, _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:600;margin-top:1px;")
  }, en.ssCount))), _h("div", {
    className: "press",
    onClick: en.toggleSS,
    style: css("padding:6px 11px;border-radius:9px;background:rgba(var(--acr),.15);color:var(--ac);font-size:11.5px;font-weight:800;flex-shrink:0;")
  }, en.ssLabel), _h("div", {
    className: "press",
    onClick: en.onRemove,
    style: css("width:28px;height:28px;border-radius:9px;background:rgba(232,90,90,.1);color:#E8807A;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;")
  }, "\u2715")), en.ssOpen && _h(_F, null, _h("div", {
    style: css("background:rgba(var(--acr),.05);border:1.5px solid rgba(var(--acr),.25);border-top:none;border-radius:0 0 15px 15px;padding:11px 11px 12px;display:flex;flex-direction:column;gap:8px;")
  }, en.exs.map((sx, si) => _h("div", {
    key: si,
    style: css("background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:10px 11px;")
  }, _h("div", {
    style: css("display:flex;align-items:center;gap:8px;")
  }, _h("input", {
    value: sx.name,
    onChange: sx.onName,
    onFocus: sx.onFocus,
    placeholder: "Exercise name",
    style: css("flex:1;min-width:0;padding:9px 11px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:11px;font-size:12.5px;font-weight:700;color:#F4ECDD;outline:none;font-family:'Manrope',sans-serif;")
  }), _h("div", {
    className: "press",
    onClick: sx.onRemove,
    style: css("width:28px;height:28px;border-radius:9px;background:rgba(232,90,90,.1);color:#E8807A;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;")
  }, "\u2715")), sx.hasSugg && _h(_F, null, _h("div", {
    style: css("margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;")
  }, sx.sugg.map((sg2, i) => _h("div", {
    key: i,
    className: "press",
    onClick: sg2.onPick,
    style: css("padding:7px 11px;border-radius:10px;background:rgba(var(--acr),.1);border:1px solid rgba(var(--acr),.26);color:var(--ac);font-size:11px;font-weight:800;")
  }, sg2.name)))), _h("div", {
    style: css("margin-top:9px;display:flex;gap:8px;")
  }, sx.nums.map((nm2, i) => _h("div", {
    key: i,
    style: css("flex:1;background:rgba(255,255,255,.04);border-radius:11px;padding:7px 8px;")
  }, _h("div", {
    style: css("font-size:8.5px;font-weight:800;letter-spacing:.8px;color:#8E8475;text-align:center;")
  }, nm2.label), _h("div", {
    style: css("margin-top:5px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    className: "press",
    onClick: nm2.onMinus,
    style: css("width:22px;height:22px;border-radius:7px;background:rgba(255,255,255,.07);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-size:13px;")
  }, "\u2212"), _h("div", {
    className: "sora",
    style: css("font-size:13px;font-weight:800;color:#F4ECDD;")
  }, nm2.value), _h("div", {
    className: "press",
    onClick: nm2.onPlus,
    style: css("width:22px;height:22px;border-radius:7px;background:rgba(255,255,255,.07);color:#F4ECDD;display:flex;align-items:center;justify-content:center;font-size:12px;")
  }, "\uFF0B"))))))), _h("div", {
    className: "press",
    onClick: en.addSSEx,
    style: css("text-align:center;padding:10px;border-radius:12px;border:1.5px dashed rgba(var(--acr),.4);color:var(--ac);font-size:12px;font-weight:800;")
  }, "\uFF0B Add exercise to superset"))), en.showPreview && _h(_F, null, _h("div", {
    style: css("background:rgba(var(--acr),.04);border:1.5px solid rgba(var(--acr),.25);border-top:none;border-radius:0 0 15px 15px;padding:9px 13px 11px;font-size:11.5px;font-weight:700;color:#A99E8C;")
  }, en.ssPreview)))))))), _h("div", {
    style: css("margin-top:12px;display:flex;gap:8px;")
  }, _h("div", {
    className: "press",
    onClick: ew.addEx,
    style: css("flex:1;text-align:center;padding:11px 6px;border-radius:13px;border:1.5px dashed rgba(var(--acr),.32);color:var(--ac);font-size:12px;font-weight:800;")
  }, "\uFF0B Exercise"), _h("div", {
    className: "press",
    onClick: ew.addSS,
    style: css("flex:1;text-align:center;padding:11px 6px;border-radius:13px;border:1.5px dashed rgba(var(--acr),.32);background:rgba(var(--acr),.06);color:var(--ac);font-size:12px;font-weight:800;")
  }, "\uD83D\uDD17 Superset"), _h("div", {
    className: "press",
    onClick: ew.byMuscle,
    style: css("flex:1;text-align:center;padding:11px 6px;border-radius:13px;border:1.5px dashed rgba(var(--acr),.32);color:var(--ac);font-size:12px;font-weight:800;")
  }, "\uD83E\uDDCD By muscle")))))));
}
export function MuscleBuilderModal({
  v
}) {
  const {
    builder,
    bodyLab
  } = v;
  if (!builder.open) return null;
  return _h(_F, null, _h("div", {
    style: css("position:absolute;inset:0;z-index:94;background:rgba(8,6,4,.72);animation:fadeIn .22s ease both;"),
    onClick: builder.close
  }), _h("div", {
    className: "ilsc",
    style: css(builder.sheetStyle)
  }, _h("div", {
    style: css("display:flex;justify-content:space-between;align-items:flex-start;")
  }, _h("div", null, _h("div", {
    className: "sora",
    style: css("font-weight:800;font-size:20px;color:#F4ECDD;")
  }, "\uD83E\uDDCD Build by muscle"), _h("div", {
    style: css("font-size:12px;color:#8E8475;font-weight:600;margin-top:3px;")
  }, "Tap a muscle on the body \u2192 add its exercises")), _h("div", {
    className: "press",
    onClick: builder.close,
    style: css("width:34px;height:34px;border-radius:11px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#A99E8C;flex-shrink:0;")
  }, "\u2715")), builder.toWorkout && _h(_F, null, _h("div", {
    style: css("margin-top:11px;padding:10px 13px;border-radius:12px;background:rgba(var(--acr),.1);border:1px solid rgba(var(--acr),.26);font-size:11.5px;font-weight:800;color:var(--ac);")
  }, "Adding straight into \u201C", builder.toWorkoutName, "\u201D")), _h("div", {
    style: css("margin-top:13px;display:flex;justify-content:center;")
  }, _h("div", {
    style: css("width:100%;max-width:306px;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.07);")
  }, _h(Body3D, {
    tag: "builder",
    chrome: "mini",
    mode: builder.mode,
    heat: builder.heat,
    accent: bodyLab.accent,
    background: "transparent",
    selected: builder.sel,
    autoRotate: false,
    onPick: builder.onPick,
    onReady: bodyLab.onReady,
    height: "408px"
  }))), builder.hasCoverage && _h(_F, null, _h("div", {
    style: css("margin-top:12px;font-size:10px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "THIS WORKOUT LIGHTS UP"), _h("div", {
    style: css("margin-top:8px;display:flex;flex-wrap:wrap;gap:7px;")
  }, builder.coverage.map((cv, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:10px;background:rgba(var(--acr),.12);border:1px solid rgba(var(--acr),.3);")
  }, _h("span", {
    style: css("font-size:11.5px;font-weight:800;color:#F4ECDD;")
  }, cv.name), _h("span", {
    style: css("font-size:10.5px;font-weight:700;color:var(--ac);")
  }, cv.sets))))), builder.noSel && _h(_F, null, _h("div", {
    style: css("margin-top:13px;text-align:center;font-size:12.5px;color:#8E8475;font-weight:600;padding:6px 0;")
  }, "Rotate & tap a muscle to see its exercises")), builder.hasSel && _h(_F, null, _h("div", {
    style: css("margin-top:13px;display:flex;align-items:center;justify-content:space-between;")
  }, _h("div", {
    className: "sora",
    style: css("font-size:16px;font-weight:800;color:#F4ECDD;")
  }, builder.selName, " exercises"), _h("div", {
    className: "press",
    onClick: builder.clearSel,
    style: css("font-size:11px;font-weight:800;color:#8E8475;")
  }, "\u2039 pick another")), _h("div", {
    style: css("margin-top:10px;display:flex;flex-direction:column;gap:8px;")
  }, builder.exs.map((be, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:11px;padding:10px 13px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.05);border-radius:13px;")
  }, _h("div", {
    style: css("flex:1;font-size:13px;font-weight:700;color:#F4ECDD;")
  }, be.name), _h("div", {
    className: "press",
    onClick: be.onAdd,
    style: css(be.addStyle)
  }, be.addLabel))))), builder.hasAdded && _h(_F, null, _h("div", {
    style: css("margin-top:16px;font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:#8E8475;")
  }, "WORKOUT DRAFT \xB7 ", builder.count), _h("div", {
    style: css("margin-top:9px;display:flex;flex-direction:column;gap:7px;")
  }, builder.added.map((ba, i) => _h("div", {
    key: i,
    style: css("display:flex;align-items:center;gap:10px;padding:9px 13px;border-radius:12px;background:rgba(var(--acr),.08);border:1px solid rgba(var(--acr),.25);")
  }, _h("div", {
    style: css("font-size:12.5px;font-weight:800;color:#F4ECDD;flex:1;")
  }, ba.name), _h("div", {
    style: css("font-size:11px;color:#8E8475;font-weight:700;")
  }, "3 \xD7 8-12"), _h("div", {
    className: "press",
    onClick: ba.onRemove,
    style: css("width:24px;height:24px;border-radius:8px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#A99E8C;font-size:12px;")
  }, "\u2715")))), _h("div", {
    className: "press",
    onClick: builder.save,
    style: css("margin-top:13px;padding:14px;border-radius:14px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);text-align:center;font-family:'Sora',sans-serif;font-weight:800;font-size:14px;")
  }, "Save as workout \u2192"))));
}
