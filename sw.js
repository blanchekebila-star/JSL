const cacheName = 'jsl-v1';
const assets = ['./', './index.html', './manifest.json'];

// Installation rapide
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

// Activation immédiate
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Réponse ultra-rapide (Priorité au cache)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
