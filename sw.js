// Service Worker for Windows 11 Portfolio
const CACHE_NAME = 'win11-portfolio-v1';

// Core assets to pre-cache for offline support
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './favicon.svg',
    './manifest.json',
    './404.html'
];

// Install: pre-cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
    );
    self.skipWaiting();
});

// Activate: remove outdated caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    // Only handle GET requests for same-origin or pre-cached assets
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;

            return fetch(event.request).then((response) => {
                // Cache valid same-origin responses
                if (
                    response &&
                    response.status === 200 &&
                    response.type === 'basic'
                ) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(() => {
                // Offline fallback for navigation requests
                if (event.request.destination === 'document') {
                    return caches.match('./404.html');
                }
            });
        })
    );
});
