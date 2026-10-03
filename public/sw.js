/* IronLog service worker - app shell cache + offline.
   Strategy:
     - /api        network-first  (freshness; falls back to cache offline)
     - JS bundles  network-first  (App.js/design.js change every build; a stale
                   bundle is the single most confusing failure mode, and the
                   cache still answers when offline)
     - everything  cache-first    (html/css/glb/json/icons - big and stable)
   VERSION is auto-bumped by scripts/babel-build.cjs on every build. */
const VERSION = "ironlog-1786361368058";
const SHELL = [
  "/", "/index.css", "/main.js", "/App.js", "/design.js",
  "/body3d.js", "/zones.json", "/manifest.webmanifest",
  "/icon-192.png", "/icon-512.png", "/favicon.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const netFirst = (req) =>
  fetch(req)
    .then((res) => { const cp = res.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return res; })
    .catch(() => caches.match(req));

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;              // writes: network + the app's own offline queue
  if (url.origin !== location.origin) return;          // CDN/fonts: let the browser handle it

  if (url.pathname.startsWith("/api/")) { e.respondWith(netFirst(e.request)); return; }
  if (/\.js$/.test(url.pathname) || url.pathname === "/") { e.respondWith(netFirst(e.request)); return; }

  e.respondWith(
    caches.match(e.request).then((hit) => {
      const net = fetch(e.request)
        .then((res) => { if (res.ok) { const cp = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, cp)); } return res; })
        .catch(() => hit);
      return hit || net;
    })
  );
});
