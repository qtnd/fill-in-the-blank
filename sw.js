const CACHE_NAME = 'fillblanks-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Ajoute ici tous les fichiers CSS, JS, images nécessaires
];

// Installation du service worker et mise en cache des fichiers essentiels
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation - nettoyage des anciennes caches si besoin
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

// Interception des requêtes pour servir depuis le cache si possible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
