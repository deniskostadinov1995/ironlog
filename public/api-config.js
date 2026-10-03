/* IronLog backend endpoint.
   WEB (served by server.js): leave this file as-is - the app uses same-origin.
   NATIVE (Capacitor Android/iOS): the app is served from https://localhost, so
   same-origin points at nothing. Set the URL of your hosted IronLog server:

     window.__IRONLOG_API__ = "https://api.yourdomain.com/api";

   Must be HTTPS for the app stores. Until this is set, a native build runs
   local-only: the UI and the recovery engine work, nothing syncs. */
// window.__IRONLOG_API__ = "https://api.yourdomain.com/api";
