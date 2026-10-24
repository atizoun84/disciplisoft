// Service worker manuel pour DiscipliSoft
const VERSION = 'disciplisoft-v5'; // <-- Version courante
const CACHE_STATIQUE = `${VERSION}-static`;
const CACHE_RUNTIME  = `${VERSION}-runtime`;

const PRECACHE = [
  '/disciplisoft/',
  '/disciplisoft/index.html',
  '/disciplisoft/manifest.webmanifest',
  '/disciplisoft/icon-192.png',
  '/disciplisoft/icon-512.png',
  '/disciplisoft/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIQUE).then((cache) => {
      return cache.addAll(PRECACHE).catch((err) => {
        console.warn('[SW] Précache partiel :', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copie = res.clone();
          caches.open(CACHE_RUNTIME).then((c) => c.put(req, copie));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/disciplisoft/index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        fetch(req).then((res) => {
          if (res && res.status === 200) {
            caches.open(CACHE_RUNTIME).then((c) => c.put(req, res));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copie = res.clone();
          caches.open(CACHE_RUNTIME).then((c) => c.put(req, copie));
        }
        return res;
      }).catch(() => caches.match('/disciplisoft/index.html'));
    })
  );
});

// Message pour forcer la mise à jour immédiate
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING' || (event.data && event.data.type === 'SKIP_WAITING')) {
    self.skipWaiting();
  }
});
