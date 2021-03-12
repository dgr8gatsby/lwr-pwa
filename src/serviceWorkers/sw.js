const CACHE = "pwabuilder-precache";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.CacheFirst({
    cacheName: CACHE
  })
);
// const cacheName = 'staledadjokes_v17';

// const APPFILES = [
//   //'./public/main.html',
//   './assets/favicon.ico',
//   './assets/mustache.svg',
// ];

// self.addEventListener('install', e => {
//   e.waitUntil(
//     caches
//       .open(cacheName)
//       .then(cache => {
//         return cache.addAll(APPFILES);
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   );
// });

// self.addEventListener('fetch', e => {
//   e.respondWith(
//     caches.match(e.request).then(r => {
//       console.log('[Service Worker] Fetching resource: ' + e.request.url);
//       return (
//         r ||
//         fetch(e.request).then(response => {
//           return caches.open(cacheName).then(cache => {
//             cache.put(e.request, response.clone());
//             response.status = 200
//             return response;
//           });
//         })
//       );
//     })
//   );
// });
