const cacheName = 'staledadjokes_v12';

const APPFILES = [
  //'./public/main.html',
  //'./assets/favicon.ico',
  './assets/mustache.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        return cache.addAll(APPFILES);
      })
      .catch(error => {
        console.log(error);
      })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return (
        r ||
        fetch(e.request).then(response => {
          return caches.open(cacheName).then(cache => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
