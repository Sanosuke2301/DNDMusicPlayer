const CACHE_NAME = "dnd-music-cache-v2";
const FILES_TO_CACHE = [
  "index.html",
  "css/style.css",
  "js/app.js",
  "manifest.json",
  "images/icons/icon-192.png",
  "images/icons/icon-512.png"
  // Add your audio files here if you want them offline
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // Force this service to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🔁 Delete old caches
          }
        })
      );
    })
  );
  self.clients.claim(); // 👈 Take control of all open clients immediately
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
