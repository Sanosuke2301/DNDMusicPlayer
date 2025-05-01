const CACHE_NAME = "dnd-music-cache-v1";
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
