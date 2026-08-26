// Minimal service worker: enables "Add to Home Screen" install prompts.
// Deliberately does not cache app data, since staff need live/current data
// every time they open the app.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("fetch", () => {});
