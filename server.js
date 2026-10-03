import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app    = express();
const PORT   = Number(process.env.PORT) || 3001;
const DB     = path.join(__dirname, "db.json");
const STATIC = path.join(__dirname, "public");

app.use(cors());
app.use(express.json({ limit: "10mb" }));

function readDB() {
  if (!fs.existsSync(DB)) return null;
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}
// Atomic write: temp file + rename, so a crash mid-write can never leave a
// half-written (corrupt) db.json behind.
function writeDB(data) {
  const tmp = DB + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, DB);
}
// Coalesced saves: many handlers call save() per request; batching them into
// one disk write per 50ms tick keeps rapid bursts cheap. In-memory `db` is the
// single source of truth (nothing re-reads the file while running).
let saveTimer = null;
function save() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try { writeDB(db); } catch (e) { console.error("db save failed:", e.message); }
  }, 50);
}
function flushSave() {
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  try { writeDB(db); } catch (e) {}
}
["SIGINT","SIGTERM"].forEach(sig => process.on(sig, () => { flushSave(); process.exit(0); }));
process.on("beforeExit", flushSave);

// Daily backup rotation (keep 7): one snapshot per day, taken at first boot.
function rotateBackup() {
  try {
    if (!fs.existsSync(DB)) return;
    const dir = path.join(__dirname, "db-backups");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const dest = path.join(dir, "db-" + new Date().toISOString().slice(0,10) + ".json");
    if (!fs.existsSync(dest)) fs.copyFileSync(DB, dest);
    const files = fs.readdirSync(dir).filter(f => /^db-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
    while (files.length > 7) fs.unlinkSync(path.join(dir, files.shift()));
  } catch (e) { console.error("backup rotation failed:", e.message); }
}
rotateBackup();

// Ensure new data keys exist on older databases without touching existing data.
function migrate(d) {
  if (!d) return d;
  if (!d.history) d.history = {};
  if (!d.weights) d.weights = {};
  if (!d.gyms) d.gyms = {};                 // per-user list of gym names
  if (!d.activeSessions) d.activeSessions = {}; // per-user in-progress workout
  if (!d.subscriptions) d.subscriptions = {};   // per-user list of followed userIds
  if (!d.accounts) d.accounts = {};             // email accounts (auth + trial/billing)
  if (!d.authTokens) d.authTokens = {};         // session token -> { email, createdAt }
  if (!d.prefs) d.prefs = {};                   // per-user UI prefs (photo, favourites, notifications)
  if (!d.activeTombstones) d.activeTombstones = {}; // userId -> updatedAt of the last ENDED session (blocks stale re-posts)
  if (!d.checkins) d.checkins = {};             // per-user muscle readiness check-ins [{ts,muscle,level}]
  (d.users || []).forEach(u => {
    if (!d.history[u.id]) d.history[u.id] = [];
    if (!d.weights[u.id]) d.weights[u.id] = [];
    if (!d.gyms[u.id]) d.gyms[u.id] = [];
    if (!d.subscriptions[u.id]) d.subscriptions[u.id] = [];
    if (!d.prefs[u.id]) d.prefs[u.id] = {};
    if (!d.checkins[u.id]) d.checkins[u.id] = [];
  });
  return d;
}

function initDB() {
  const seed = {
    users: [
      { id:"alex", name:"Alex", av:"A", pin:null, color:"#2ec97e" },
      { id:"sam", name:"Sam", av:"S", pin:"1234", color:"#ff8fab" },
      { id:"maria", name:"Maria", av:"M", pin:null, color:"#a78bfa" },
    ],
    collections: [
      {
        id:"c1", owner:"alex", name:"PPL Program", emoji:"🔄",
        desc:"Push Pull Legs 6-day split", pub:true,
        workouts:[
          { id:"w1", name:"Push A", emoji:"💪", entries:[
            { type:"ex", id:"e1", name:"Bench Press", sets:4, repsMin:6, repsMax:10 },
            { type:"ex", id:"e2", name:"Incline DB Press", sets:3, repsMin:8, repsMax:12 },
            { type:"ss", id:"e3", exercises:[
              { id:"e3a", name:"Overhead Press", sets:3, repsMin:8, repsMax:12 },
              { id:"e3b", name:"Lateral Raise", sets:3, repsMin:12, repsMax:15 }
            ]},
            { type:"ex", id:"e4", name:"Tricep Pushdown", sets:3, repsMin:12, repsMax:15 }
          ]},
          { id:"w2", name:"Pull A", emoji:"🔙", entries:[
            { type:"ex", id:"e5", name:"Deadlift", sets:3, repsMin:4, repsMax:6 },
            { type:"ex", id:"e6", name:"Pull-Up", sets:4, repsMin:6, repsMax:10 },
            { type:"ss", id:"e7", exercises:[
              { id:"e7a", name:"Barbell Row", sets:3, repsMin:8, repsMax:12 },
              { id:"e7b", name:"Face Pull", sets:3, repsMin:15, repsMax:20 }
            ]},
            { type:"ex", id:"e8", name:"Bicep Curl", sets:3, repsMin:10, repsMax:14 }
          ]},
          { id:"w3", name:"Legs A", emoji:"🦵", entries:[
            { type:"ex", id:"e9", name:"Squat", sets:4, repsMin:6, repsMax:10 },
            { type:"ex", id:"e10", name:"Romanian Deadlift", sets:3, repsMin:8, repsMax:12 },
            { type:"ss", id:"e11", exercises:[
              { id:"e11a", name:"Leg Press", sets:3, repsMin:10, repsMax:15 },
              { id:"e11b", name:"Leg Curl", sets:3, repsMin:12, repsMax:15 }
            ]},
            { type:"ex", id:"e12", name:"Calf Raise", sets:4, repsMin:15, repsMax:20 }
          ]}
        ]
      },
      {
        id:"c2", owner:"alex", name:"Bro Split", emoji:"🏆",
        desc:"Classic 5-day bodybuilder split", pub:true,
        workouts:[
          { id:"w4", name:"Chest Day", emoji:"💥", entries:[
            { type:"ex", id:"f1", name:"Bench Press", sets:4, repsMin:6, repsMax:10 },
            { type:"ss", id:"f2", exercises:[
              { id:"f2a", name:"Incline Bench", sets:3, repsMin:8, repsMax:12 },
              { id:"f2b", name:"Cable Fly", sets:3, repsMin:12, repsMax:15 }
            ]},
            { type:"ex", id:"f3", name:"Dip", sets:3, repsMin:10, repsMax:15 }
          ]},
          { id:"w5", name:"Back Day", emoji:"🔙", entries:[
            { type:"ex", id:"f4", name:"Deadlift", sets:3, repsMin:4, repsMax:6 },
            { type:"ex", id:"f5", name:"Pull-Up", sets:3, repsMin:6, repsMax:10 },
            { type:"ss", id:"f6", exercises:[
              { id:"f6a", name:"Barbell Row", sets:3, repsMin:8, repsMax:12 },
              { id:"f6b", name:"Lat Pulldown", sets:3, repsMin:10, repsMax:14 }
            ]}
          ]},
          { id:"w6", name:"Shoulder Day", emoji:"🎯", entries:[
            { type:"ex", id:"f7", name:"Overhead Press", sets:4, repsMin:6, repsMax:10 },
            { type:"ss", id:"f8", exercises:[
              { id:"f8a", name:"Lateral Raise", sets:3, repsMin:12, repsMax:15 },
              { id:"f8b", name:"Front Raise", sets:3, repsMin:12, repsMax:15 }
            ]},
            { type:"ex", id:"f9", name:"Face Pull", sets:3, repsMin:15, repsMax:20 }
          ]},
          { id:"w7", name:"Arm Day", emoji:"💪", entries:[
            { type:"ss", id:"f10", exercises:[
              { id:"f10a", name:"Bicep Curl", sets:4, repsMin:10, repsMax:14 },
              { id:"f10b", name:"Tricep Pushdown", sets:4, repsMin:10, repsMax:14 }
            ]},
            { type:"ss", id:"f11", exercises:[
              { id:"f11a", name:"Hammer Curl", sets:3, repsMin:10, repsMax:14 },
              { id:"f11b", name:"Skull Crusher", sets:3, repsMin:10, repsMax:14 }
            ]}
          ]},
          { id:"w8", name:"Leg Day", emoji:"🦵", entries:[
            { type:"ex", id:"f12", name:"Squat", sets:4, repsMin:6, repsMax:10 },
            { type:"ss", id:"f13", exercises:[
              { id:"f13a", name:"Leg Press", sets:3, repsMin:10, repsMax:15 },
              { id:"f13b", name:"Leg Curl", sets:3, repsMin:12, repsMax:15 }
            ]},
            { type:"ex", id:"f14", name:"Calf Raise", sets:4, repsMin:15, repsMax:20 }
          ]}
        ]
      }
    ],
    history: { alex: [], sam: [], maria: [] },
    weights: { alex: [], sam: [], maria: [] },
    gyms: { alex: [], sam: [], maria: [] },
    activeSessions: {},
    messages: [
      { id:"m1", from:"sam", to:"alex", subject:"Love the PPL!", body:"Hey Alex! Tried your Push A — those supersets are brutal! 😅", time:"2025-04-01T10:00:00Z", read:false },
      { id:"m2", from:"maria", to:"alex", subject:"Rest tip 💡", body:"For supersets I rest 90s after the second exercise. Makes it way more intense!", time:"2025-04-01T15:00:00Z", read:false }
    ]
  };
  writeDB(seed);
  console.log("✅ Created fresh db.json with seed data");
  return seed;
}

let db = migrate(readDB() || initDB());
save(); // persist any newly-added keys (gyms / activeSessions) for existing databases

// ── Scheduled-deletion purge — honors the 30-day grace period for real.
// Runs at boot and every 6 hours; removes the account, its tokens, and the
// linked profile with all its data (that's what the delete flow promises).
function removeUserData(id) {
  db.users       = db.users.filter(u => u.id !== id);
  db.messages    = (db.messages||[]).filter(m => m.from !== id && m.to !== id);
  db.collections = db.collections.filter(c => c.owner !== id);
  delete db.history[id];
  delete db.weights[id];
  delete db.gyms[id];
  if (db.activeSessions) delete db.activeSessions[id];
  if (db.subscriptions) {
    delete db.subscriptions[id];
    Object.keys(db.subscriptions).forEach(k => { db.subscriptions[k] = (db.subscriptions[k]||[]).filter(s => s !== id); });
  }
  if (db.prefs) delete db.prefs[id];
}
function purgeExpiredDeletes() {
  const now = Date.now();
  let purged = 0;
  Object.values(db.accounts || {}).forEach(acc => {
    if (acc.deleteScheduledAt && acc.deleteScheduledAt < now) {
      if (acc.userId) removeUserData(acc.userId);
      Object.keys(db.authTokens || {}).forEach(t => { if (db.authTokens[t].email === acc.email) delete db.authTokens[t]; });
      delete db.accounts[acc.email];
      purged++;
    }
  });
  if (purged) { save(); console.log("🗑️  Purged " + purged + " account(s) past their 30-day deletion grace period"); }
}
purgeExpiredDeletes();
setInterval(purgeExpiredDeletes, 6*3600e3);

// ── Locked-account write enforcement — the lock is per-email; profiles linked
// to a locked account can't write training data server-side (the promise is
// subscribe / export / log out only). Household profiles with no account are
// unaffected. Reads stay open so export always works.
function isUserLocked(userId) {
  if (!userId) return false;
  const acc = Object.values(db.accounts || {}).find(a => a.userId === userId);
  if (!acc) return false;
  return accountLocked(acc, Date.now());
}
function rejectIfLocked(userId, res) {
  if (isUserLocked(userId)) {
    res.status(403).json({ error:"locked", message:"Free month is over — subscribe to keep logging. Your data is safe." });
    return true;
  }
  return false;
}

// ── Payload sanity — a workout entry is text + numbers; anything huge is a bug
// or abuse. Caps keep one bad client from ballooning db.json.
const MAX_ENTRY_BYTES = 200*1024;   // one history entry
const MAX_ENTRY_SETS  = 500;
const MAX_BULK_ENTRIES = 2000;
const MAX_PHOTO_BYTES = 400*1024;   // data-URL profile photo
function entryTooBig(entry) {
  if (!entry || typeof entry !== "object") return "entry required";
  if (Array.isArray(entry.sets) && entry.sets.length > MAX_ENTRY_SETS) return "too many sets in one session";
  if (JSON.stringify(entry).length > MAX_ENTRY_BYTES) return "entry too large";
  return null;
}

// The admin panel is disabled unless IRONLOG_ADMIN_PASS is set.
const ADMIN_PASS = process.env.IRONLOG_ADMIN_PASS || "";
function requireAdmin(req, res, next) {
  if (!ADMIN_PASS) return res.status(503).json({ error: "Admin panel disabled - set IRONLOG_ADMIN_PASS" });
  if (req.headers["x-admin-pass"] === ADMIN_PASS) return next();
  res.status(401).json({ error: "Admin authorization required" });
}

// The gate is guessable over HTTP, so cap attempts the same way /api/auth is.
const adminHits = new Map();
setInterval(() => {
  const cutoff = Date.now() - 60e3;
  adminHits.forEach((rec, ip) => { if (rec.t0 < cutoff) adminHits.delete(ip); });
}, 600e3).unref();
function adminRateLimit(req, res, next) {
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || "?";
  const rec = adminHits.get(ip);
  if (!rec || now - rec.t0 > 60e3) { adminHits.set(ip, { t0: now, n: 1 }); return next(); }
  if (++rec.n > 10) return res.status(429).json({ error: "Too many attempts - try again in a minute" });
  next();
}

const authHits = new Map();
setInterval(() => {
  const cutoff = Date.now() - 60e3;
  authHits.forEach((rec, ip) => { if (rec.t0 < cutoff) authHits.delete(ip); });
}, 600e3).unref();
app.use("/api/auth", (req, res, next) => {
  if (req.method !== "POST") return next();
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || "?";
  const rec = authHits.get(ip);
  if (!rec || now - rec.t0 > 60e3) { authHits.set(ip, { t0: now, n: 1 }); return next(); }
  if (++rec.n > 20) return res.status(429).json({ error: "Too many attempts - try again in a minute" });
  next();
});

// ── API ───────────────────────────────────────────────────────────────────────

app.get("/api/data", (req, res) => {
  // In-memory db is the source of truth — re-reading the file here would race
  // the coalesced saves and could resurrect stale state. (Edit db.json only
  // with the server stopped.) Never ship password hashes or session tokens.
  const { accounts, authTokens, ...pub } = db;
  res.json(pub);
});

// Slim poll — exactly what the 45s live-poll consumes (messages, who's
// training, users, follow-lists). Keeps the recurring payload tiny: prefs
// (profile photos!), full histories and programs stay out of the hot path.
app.get("/api/poll", (req, res) => {
  res.json({
    messages: db.messages || [],
    activeSessions: db.activeSessions || {},
    users: db.users || [],
    subscriptions: db.subscriptions || {},
  });
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  if (db.users.find(u => u.id === user.id)) return res.status(409).json({ error:"Exists" });
  db.users.push(user);
  db.history[user.id] = [];
  db.weights[user.id] = [];
  db.gyms[user.id] = [];
  if (!db.subscriptions) db.subscriptions = {};
  db.subscriptions[user.id] = [];
  save(); res.json({ ok:true });
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.users       = db.users.filter(u => u.id !== id);
  db.messages    = db.messages.filter(m => m.from !== id && m.to !== id);
  db.collections = db.collections.filter(c => c.owner !== id);
  delete db.history[id];
  delete db.weights[id];
  delete db.gyms[id];
  if (db.activeSessions) delete db.activeSessions[id];
  if (db.subscriptions) {
    delete db.subscriptions[id];
    Object.keys(db.subscriptions).forEach(k => { db.subscriptions[k] = (db.subscriptions[k]||[]).filter(s => s !== id); });
  }
  if (db.prefs) delete db.prefs[id];
  if (db.accounts) Object.values(db.accounts).forEach(a => { if (a.userId === id) a.userId = null; });
  save(); res.json({ ok:true });
});

app.post("/api/collections", (req, res) => {
  const c = req.body;
  if (rejectIfLocked(c.owner, res)) return;
  const idx = db.collections.findIndex(x => x.id === c.id);
  if (idx >= 0) db.collections[idx] = c; else db.collections.push(c);
  save(); res.json({ ok:true });
});

app.delete("/api/collections/:id", requireAdmin, (req, res) => {
  db.collections = db.collections.filter(c => c.id !== req.params.id);
  save(); res.json({ ok:true });
});

app.post("/api/history", (req, res) => {
  const { userId, entry } = req.body;
  if (rejectIfLocked(userId, res)) return;
  const bad = entryTooBig(entry);
  if (bad) return res.status(400).json({ error: bad });
  if (!db.history[userId]) db.history[userId] = [];
  db.history[userId].unshift(entry);
  save(); res.json({ ok:true });
});

// Bulk history import (CSV import feature) — merges, dedupes by id, sorts newest-first
app.post("/api/history/bulk", (req, res) => {
  const { userId, entries } = req.body;
  if (!userId || !Array.isArray(entries)) return res.status(400).json({ error:"userId and entries[] required" });
  if (rejectIfLocked(userId, res)) return;
  if (entries.length > MAX_BULK_ENTRIES) return res.status(400).json({ error:"Too many sessions in one import (max "+MAX_BULK_ENTRIES+") — split the file" });
  for (const e of entries) { const bad = entryTooBig(e); if (bad) return res.status(400).json({ error: bad }); }
  if (!db.history[userId]) db.history[userId] = [];
  const existingIds = new Set(db.history[userId].map(h=>h.id));
  const fresh = entries.filter(e => e && e.id && !existingIds.has(e.id));
  db.history[userId] = [...fresh, ...db.history[userId]].sort((a,b)=>{
    const ta = a.ts || Date.parse((a.date||"")+"T18:00:00") || 0;
    const tb = b.ts || Date.parse((b.date||"")+"T18:00:00") || 0;
    return tb - ta;
  });
  save(); res.json({ ok:true, imported: fresh.length, skipped: entries.length - fresh.length });
});

app.post("/api/weights", (req, res) => {
  const { userId, entry } = req.body;
  if (rejectIfLocked(userId, res)) return;
  if (!db.weights[userId]) db.weights[userId] = [];
  db.weights[userId].push(entry);
  save(); res.json({ ok:true });
});

app.post("/api/checkins", (req, res) => {
  const { userId, entry } = req.body;
  if (rejectIfLocked(userId, res)) return;
  if (!entry || !Number.isFinite(Number(entry.ts)) || !entry.muscle ||
      !Number.isFinite(Number(entry.level)) || entry.level < 1 || entry.level > 4) {
    return res.status(400).json({ error: "Bad check-in" });
  }
  if (!db.checkins[userId]) db.checkins[userId] = [];
  db.checkins[userId].push({ ts: Number(entry.ts), muscle: String(entry.muscle), level: Number(entry.level) });
  if (db.checkins[userId].length > 200) db.checkins[userId] = db.checkins[userId].slice(-200);
  save(); res.json({ ok: true });
});

app.post("/api/messages", (req, res) => {
  db.messages.push(req.body);
  save(); res.json({ ok:true });
});

app.patch("/api/messages/:id", (req, res) => {
  const msg = db.messages.find(m => m.id === req.params.id);
  if (!msg) return res.status(404).json({ error:"No such message" });
  Object.assign(msg, req.body); save();
  res.json({ ok:true });
});

// Patch session note
app.patch("/api/history/note", (req, res) => {
  const { userId, entryId, note } = req.body;
  if (db.history[userId]) {
    const entry = db.history[userId].find(h=>h.id===entryId);
    if (entry) { entry.sessionNote = note; save(); }
  }
  res.json({ ok:true });
});

// ── Active workout session (resume after closing the browser / on any device) ─
// Finishing a workout races with in-flight debounced auto-saves: the DELETE can
// land first and a stale POST then resurrects the session as a zombie "paused"
// workout. Tombstone: on end we remember the ended snapshot's own updatedAt
// (client clock), and reject any POST whose updatedAt isn't newer. A genuinely
// new workout carries a later client timestamp, so clock skew doesn't matter.
function endActive(userId, endedAt) {
  if (!db.activeSessions) db.activeSessions = {};
  if (!db.activeTombstones) db.activeTombstones = {};
  const cur = db.activeSessions[userId];
  // Prefer the client's own end timestamp (same clock as snapshot.updatedAt);
  // fall back to the last stored snapshot time, then server time.
  const stamp = Number(endedAt) || cur?.updatedAt || Date.now();
  db.activeTombstones[userId] = Math.max(db.activeTombstones[userId]||0, stamp);
  delete db.activeSessions[userId];
}
app.post("/api/active", (req, res) => {
  const { userId, session, endedAt } = req.body;
  if (!userId) return res.status(400).json({ error:"userId required" });
  if (!db.activeSessions) db.activeSessions = {};
  if (session) {
    const tomb = (db.activeTombstones||{})[userId] || 0;
    if ((session.updatedAt||0) <= tomb) return res.json({ ok:true, ignored:"stale snapshot after session end" });
    db.activeSessions[userId] = session;
  } else {
    endActive(userId, endedAt);
  }
  save(); res.json({ ok:true });
});

app.delete("/api/active/:userId", (req, res) => {
  endActive(req.params.userId, req.query.endedAt);
  save(); res.json({ ok:true });
});

// ── Gyms (per-user list of gyms; weights are remembered per gym client-side) ────
app.post("/api/gyms", (req, res) => {
  const { userId, gyms } = req.body;
  if (!userId) return res.status(400).json({ error:"userId required" });
  if (!db.gyms) db.gyms = {};
  db.gyms[userId] = Array.isArray(gyms) ? gyms : [];
  save(); res.json({ ok:true });
});

// ── Subscriptions (get notified when a followed user starts training) ──────────
app.post("/api/subscriptions", (req, res) => {
  const { userId, subs } = req.body;
  if (!userId) return res.status(400).json({ error:"userId required" });
  if (!db.subscriptions) db.subscriptions = {};
  db.subscriptions[userId] = Array.isArray(subs) ? subs : [];
  save(); res.json({ ok:true });
});

// ── Per-user UI prefs (profile photo, home favourites, notification prefs) ─────
app.post("/api/prefs", (req, res) => {
  const { userId, prefs } = req.body;
  if (!userId) return res.status(400).json({ error:"userId required" });
  if (prefs && typeof prefs.photo === "string" && prefs.photo.length > MAX_PHOTO_BYTES) {
    return res.status(400).json({ error:"Photo too large — try a smaller image" });
  }
  if (!db.prefs) db.prefs = {};
  db.prefs[userId] = { ...(db.prefs[userId]||{}), ...(prefs||{}) };
  save(); res.json({ ok:true, prefs: db.prefs[userId] });
});

// ── Accounts / auth / trial / billing ─────────────────────────────────────────
// One account per email; every new account gets a 30-day free trial, then the
// app locks for that email until a plan is active. Household profile-picker
// users without an email account are grandfathered - no trial, no lock.
// No SMTP is wired up, so verification/reset codes come back in the response
// as devCode; the UI presents them as such rather than pretending mail was sent.
// Mock billing: purchases are recorded with mock:true - no money moves.
const TRIAL_DAYS = 30;
const PLANS = {
  m1:   { label:"1 month",   price:2.99,  months:1 },
  m3:   { label:"3 months",  price:6.99,  months:3 },
  m6:   { label:"6 months",  price:11.99, months:6 },
  y1:   { label:"12 months", price:19.99, months:12 },
  life: { label:"Lifetime",  price:29.99, months:null },
};

function hashPass(password, salt) {
  return crypto.scryptSync(String(password), salt, 64).toString("hex");
}
function newToken() { return crypto.randomBytes(24).toString("hex"); }
function sixDigits() { return String(Math.floor(100000 + Math.random()*900000)); }

function accountFor(req) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  const sess = token && db.authTokens ? db.authTokens[token] : null;
  const acc = sess && db.accounts ? db.accounts[sess.email] : null;
  return acc ? { acc, token } : null;
}

function subActive(acc, now) {
  const s = acc.subscription;
  if (!s) return false;
  if (s.lifetime) return true;
  return s.until && s.until > now;
}

// The date the app closes without a plan: trial + referral bonus days,
// pushed out further by a one-time pause.
function effectiveTrialEnd(acc) {
  const base = acc.trialStartedAt + (TRIAL_DAYS + (acc.bonusDays||0))*24*3600e3;
  return Math.max(base, acc.pauseUntil || 0);
}
function accountLocked(acc, now) {
  return !subActive(acc, now) && now > effectiveTrialEnd(acc);
}

function publicAccount(acc) {
  const now = Date.now();
  const trialEndsAt = effectiveTrialEnd(acc);
  const active = subActive(acc, now);
  return {
    email: acc.email,
    createdAt: acc.createdAt,
    verified: !!acc.verifiedAt,
    trialStartedAt: acc.trialStartedAt,
    trialEndsAt,
    trialDaysLeft: Math.max(0, Math.ceil((trialEndsAt - now)/(24*3600e3))),
    subscription: acc.subscription || null,
    subscriptionActive: active,
    purchases: acc.purchases || [],
    locked: accountLocked(acc, now),
    deleteScheduledAt: acc.deleteScheduledAt || null,
    userId: acc.userId || null,
    referralCode: acc.referralCode || null,
    invited: acc.invited || 0,
    earnedMonths: acc.earnedMonths || 0,
    pausedUntil: acc.pauseUntil || null,
    canPause: !acc.pausedOnce && !subActive(acc, now),
  };
}

function makeReferralCode(email) {
  const base = (email.split("@")[0].toUpperCase().replace(/[^A-Z]/g,"") || "IRON").slice(0, 8);
  for (let i = 0; i < 50; i++) {
    const code = base + String(Math.floor(10 + Math.random()*90));
    if (!Object.values(db.accounts).some(a => a.referralCode === code)) return code;
  }
  return base + Date.now().toString().slice(-4);
}

app.post("/api/auth/signup", (req, res) => {
  const email = String(req.body.email||"").trim().toLowerCase();
  const password = String(req.body.password||"");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error:"Enter a valid email address" });
  if (password.length < 6) return res.status(400).json({ error:"Password must be at least 6 characters" });
  if (db.accounts[email]) return res.status(409).json({ error:"An account with this email already exists" });
  const now = Date.now();
  const salt = crypto.randomBytes(16).toString("hex");
  const verifyCode = sixDigits();
  db.accounts[email] = {
    email, salt, passHash: hashPass(password, salt),
    createdAt: now, trialStartedAt: now,
    verifiedAt: null, verifyCode,
    resetCode: null, resetCodeExpiresAt: null,
    subscription: null, purchases: [],
    deleteScheduledAt: null, userId: null,
    referralCode: makeReferralCode(email),
    bonusDays: 0, invited: 0, earnedMonths: 0,
    pauseUntil: null, pausedOnce: false,
  };
  // Referral: give a month, get a month. The new account's trial grows by 30
  // days; the referrer's active plan extends a month (or banks bonus trial days).
  let referralApplied = false;
  const refCode = String(req.body.referralCode||"").trim().toUpperCase();
  if (refCode) {
    const referrer = Object.values(db.accounts).find(a => a.referralCode === refCode && a.email !== email);
    if (referrer) {
      db.accounts[email].bonusDays = 30;
      referrer.invited = (referrer.invited||0) + 1;
      referrer.earnedMonths = (referrer.earnedMonths||0) + 1;
      if (referrer.subscription && !referrer.subscription.lifetime && referrer.subscription.until) {
        referrer.subscription.until += 30*24*3600e3;
      } else if (!referrer.subscription) {
        referrer.bonusDays = (referrer.bonusDays||0) + 30;
      }
      referralApplied = true;
    }
  }
  const token = newToken();
  db.authTokens[token] = { email, createdAt: now };
  save();
  res.json({ ok:true, token, account: publicAccount(db.accounts[email]), devVerifyCode: verifyCode, referralApplied });
});

// One-time pause: pushes the lock date 3 months out for accounts without an
// active plan. Offered as an alternative in the delete flow.
app.post("/api/auth/pause", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  if (found.acc.pausedOnce) return res.status(400).json({ error:"You've already used your one pause" });
  if (subActive(found.acc, Date.now())) return res.status(400).json({ error:"Your plan is active — nothing to pause" });
  found.acc.pauseUntil = Math.max(Date.now(), effectiveTrialEnd(found.acc)) + 90*24*3600e3;
  found.acc.pausedOnce = true;
  save();
  res.json({ ok:true, account: publicAccount(found.acc) });
});

app.post("/api/auth/signin", (req, res) => {
  const email = String(req.body.email||"").trim().toLowerCase();
  const password = String(req.body.password||"");
  const acc = db.accounts[email];
  if (!acc || hashPass(password, acc.salt) !== acc.passHash) {
    return res.status(401).json({ error:"Wrong email or password" });
  }
  let deleteCancelled = false;
  if (acc.deleteScheduledAt) { acc.deleteScheduledAt = null; deleteCancelled = true; }
  const token = newToken();
  db.authTokens[token] = { email, createdAt: Date.now() };
  save();
  res.json({ ok:true, token, account: publicAccount(acc), deleteCancelled });
});

app.post("/api/auth/signout", (req, res) => {
  const found = accountFor(req);
  if (found) { delete db.authTokens[found.token]; save(); }
  res.json({ ok:true });
});

app.get("/api/auth/me", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  res.json({ ok:true, account: publicAccount(found.acc) });
});

app.post("/api/auth/verify", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  if (found.acc.verifiedAt) return res.json({ ok:true, account: publicAccount(found.acc) });
  if (String(req.body.code||"") !== found.acc.verifyCode) return res.status(400).json({ error:"Wrong code" });
  found.acc.verifiedAt = Date.now();
  found.acc.verifyCode = null;
  save();
  res.json({ ok:true, account: publicAccount(found.acc) });
});

app.post("/api/auth/resend-verify", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  if (found.acc.verifiedAt) return res.json({ ok:true, account: publicAccount(found.acc) });
  found.acc.verifyCode = sixDigits();
  save();
  res.json({ ok:true, devVerifyCode: found.acc.verifyCode });
});

app.post("/api/auth/forgot", (req, res) => {
  const email = String(req.body.email||"").trim().toLowerCase();
  const acc = db.accounts[email];
  if (!acc) return res.status(404).json({ error:"No account with this email" });
  acc.resetCode = sixDigits();
  acc.resetCodeExpiresAt = Date.now() + 30*60e3;
  save();
  res.json({ ok:true, devResetCode: acc.resetCode });
});

app.post("/api/auth/reset", (req, res) => {
  const email = String(req.body.email||"").trim().toLowerCase();
  const acc = db.accounts[email];
  const code = String(req.body.code||"");
  const password = String(req.body.password||"");
  if (!acc || !acc.resetCode || acc.resetCode !== code) return res.status(400).json({ error:"Wrong code" });
  if (Date.now() > acc.resetCodeExpiresAt) return res.status(400).json({ error:"Code expired - request a new one" });
  if (password.length < 6) return res.status(400).json({ error:"Password must be at least 6 characters" });
  acc.salt = crypto.randomBytes(16).toString("hex");
  acc.passHash = hashPass(password, acc.salt);
  acc.resetCode = null; acc.resetCodeExpiresAt = null;
  save();
  res.json({ ok:true });
});

app.post("/api/auth/change-password", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  const { current, next } = req.body;
  if (hashPass(String(current||""), found.acc.salt) !== found.acc.passHash) return res.status(401).json({ error:"Current password is wrong" });
  if (String(next||"").length < 6) return res.status(400).json({ error:"New password must be at least 6 characters" });
  found.acc.salt = crypto.randomBytes(16).toString("hex");
  found.acc.passHash = hashPass(String(next), found.acc.salt);
  save();
  res.json({ ok:true });
});

// Link the signed-in account to an app user profile (existing or freshly created)
app.post("/api/auth/link-user", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  const { userId, user } = req.body;
  if (user && user.id) {
    if (!db.users.find(u => u.id === user.id)) {
      db.users.push(user);
      db.history[user.id] = [];
      db.weights[user.id] = [];
      db.gyms[user.id] = [];
      db.subscriptions[user.id] = [];
      db.prefs[user.id] = {};
    }
    found.acc.userId = user.id;
  } else if (userId) {
    if (!db.users.find(u => u.id === userId)) return res.status(404).json({ error:"No such profile" });
    found.acc.userId = userId;
  } else {
    return res.status(400).json({ error:"userId or user required" });
  }
  save();
  res.json({ ok:true, account: publicAccount(found.acc) });
});

// Delete account: scheduled with a 30-day grace period, cancelled by signing in
// before the date. Data stays untouched until then (and nothing auto-purges in
// this household build - the scheduled date is honored by the UI, not a cron).
app.post("/api/auth/delete-account", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  if (hashPass(String(req.body.password||""), found.acc.salt) !== found.acc.passHash) {
    return res.status(401).json({ error:"Password is wrong" });
  }
  found.acc.deleteScheduledAt = Date.now() + 30*24*3600e3;
  save();
  res.json({ ok:true, account: publicAccount(found.acc) });
});

app.post("/api/auth/cancel-delete", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  found.acc.deleteScheduledAt = null;
  save();
  res.json({ ok:true, account: publicAccount(found.acc) });
});

// Mock purchase - records the plan and unlocks, clearly marked mock:true.
// Real StoreKit/Play Billing + server-side receipt validation is still on the
// launch-blocking list; this exercises the full UI flow end to end.
app.post("/api/billing/purchase", (req, res) => {
  const found = accountFor(req);
  if (!found) return res.status(401).json({ error:"Not signed in" });
  const plan = PLANS[req.body.plan];
  if (!plan) return res.status(400).json({ error:"Unknown plan" });
  const now = Date.now();
  const base = (found.acc.subscription && !found.acc.subscription.lifetime && found.acc.subscription.until > now)
    ? found.acc.subscription.until : now;
  found.acc.subscription = {
    plan: req.body.plan, label: plan.label, price: plan.price,
    since: found.acc.subscription?.since || now,
    until: plan.months ? base + plan.months*30*24*3600e3 : null,
    lifetime: !plan.months,
    mock: true,
  };
  found.acc.purchases = found.acc.purchases || [];
  found.acc.purchases.push({ plan: req.body.plan, label: plan.label, price: plan.price, at: now, mock: true });
  save();
  res.json({ ok:true, account: publicAccount(found.acc) });
});

// ── Data export (real download: JSON full dump, CSV flat sets or weights) ──────
app.get("/api/export/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = db.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error:"No such user" });
  const format = req.query.format || "json";
  const stamp = new Date().toISOString().slice(0,10);
  if (format === "json") {
    const dump = {
      exportedAt: new Date().toISOString(),
      user: { id:user.id, name:user.name },
      history: db.history[userId] || [],
      weights: db.weights[userId] || [],
      gyms: db.gyms[userId] || [],
      programs: db.collections.filter(c => c.owner === userId),
    };
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="ironlog-${user.name}-${stamp}.json"`);
    return res.send(JSON.stringify(dump, null, 2));
  }
  if (format === "csv") {
    const what = req.query.what || "workouts";
    const esc = (v) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    let rows;
    if (what === "weights") {
      rows = [["date","kg"].join(",")];
      (db.weights[userId]||[]).forEach(w => rows.push([esc(w.date), esc(w.kg)].join(",")));
    } else {
      rows = [["date","workout","program","gym","exercise","set","kg","reps","dropset","feel","note"].join(",")];
      (db.history[userId]||[]).forEach(h => {
        const perEx = {};
        (h.sets||[]).forEach(s => {
          perEx[s.ex] = (perEx[s.ex]||0) + 1;
          const kg = s.drops&&s.drops.length ? s.drops.map(d=>d.kg).join("/") : s.kg;
          const reps = s.drops&&s.drops.length ? s.drops.map(d=>d.reps).join("/") : s.reps;
          rows.push([esc(h.date), esc(h.workoutName), esc(h.collectionName), esc(s.gym||h.gym||""), esc(s.ex), perEx[s.ex], esc(kg), esc(reps), s.drops&&s.drops.length?"yes":"", esc(s.feel||""), esc(s.note||"")].join(","));
        });
      });
    }
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="ironlog-${user.name}-${what}-${stamp}.csv"`);
    return res.send(rows.join("\n"));
  }
  res.status(400).json({ error:"format must be json or csv" });
});

// ── Admin endpoints ──────────────────────────────────────────────────────────

// Delete a single history entry
app.delete("/api/history/:userId/:entryId", requireAdmin, (req, res) => {
  const { userId, entryId } = req.params;
  if (db.history[userId]) db.history[userId] = db.history[userId].filter(h=>h.id!==entryId);
  save(); res.json({ ok:true });
});

// Delete all history for a user
app.delete("/api/history/:userId", requireAdmin, (req, res) => {
  db.history[req.params.userId] = [];
  save(); res.json({ ok:true });
});

// Delete a single weight entry by index
app.delete("/api/weights/:userId/:idx", requireAdmin, (req, res) => {
  const { userId, idx } = req.params;
  if (db.weights[userId]) db.weights[userId] = db.weights[userId].filter((_,i)=>i!==parseInt(idx));
  save(); res.json({ ok:true });
});

// Delete all weights for a user
app.delete("/api/weights/:userId", requireAdmin, (req, res) => {
  db.weights[req.params.userId] = [];
  save(); res.json({ ok:true });
});

// Delete a single message
app.delete("/api/messages/:id", requireAdmin, (req, res) => {
  db.messages = db.messages.filter(m=>m.id!==req.params.id);
  save(); res.json({ ok:true });
});

// Delete all messages
app.delete("/api/messages", requireAdmin, (req, res) => {
  db.messages = [];
  save(); res.json({ ok:true });
});

// Full data reset (keeps users, wipes everything else)
// Password check for the admin gate. The client must not compare the password
// itself, or a custom IRONLOG_ADMIN_PASS locks the panel out on both sides.
app.get("/api/admin/check", adminRateLimit, requireAdmin, (req, res) => res.json({ ok:true }));

app.post("/api/admin/reset", requireAdmin, (req, res) => {
  db.collections = [];
  db.messages = [];
  db.activeSessions = {};
  db.users.forEach(u => { db.history[u.id]=[]; db.weights[u.id]=[]; });
  save(); res.json({ ok:true });
});

// Unknown API route = JSON 404, never the SPA shell
app.use("/api", (req, res) => res.status(404).json({ error:"Unknown API route: " + req.method + " " + req.originalUrl }));

// JSON error handler — malformed bodies, oversized payloads and handler throws
// come back as JSON with a sane status instead of an HTML stack page.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err?.type === "entity.too.large" ? 413 : (err?.status || err?.statusCode || 500);
  if (status >= 500) console.error("API error:", err?.message || err);
  res.status(status).json({ error: status === 413 ? "Payload too large" : (err?.expose ? err.message : "Request failed") });
});

// ── Serve built React app ─────────────────────────────────────────────────────
// No-cache: this app ships via manual rebuilds, not hashed filenames, so a
// browser silently serving a stale App.js from disk cache is a real trap.
// Always revalidate; the app itself still works fully offline via its own
// service-worker/offline-queue layer, this only stops STALE code from sticking.
const noCache = (res) => res.set("Cache-Control", "no-cache, must-revalidate");
if (fs.existsSync(STATIC)) {
  app.use(express.static(STATIC, { setHeaders: noCache }));
  app.get("/*path", (req, res) => {
    noCache(res);
    res.sendFile(path.join(STATIC, "index.html"));
  });
  console.log("📦 Serving app from public/");
} else {
  app.get("/", (req, res) => res.send("public/index.html is missing."));
  console.log("⚠️  No public/ folder found");
}

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("💪 IRONLOG is running!");
  console.log("   Local:   http://localhost:" + PORT);
  console.log("   Network: http://YOUR-IP:" + PORT + "  (run: ipconfig getifaddr en0)");
  console.log("");
});
