'use strict';

const CACHE_NAME = "beautyfinder-cache";

const FILES_TO_CACHE = [
    'bootstrap.bundle.min.js',
    'main.js',
    'offline.js',
    'searchResults.js',
    'bootstrap.min.css',
    'font-awesome.min.css',
    'style.css',
    'dadosOffline.json',
    'offline.png',
    'offline.html',
    'index.html',
    'searchResults.html',
    'imgs/mao1.jpeg',
    'imgs/mao2.jpeg',
    'imgs/mao3.jpeg',
    'imgs/mao4.jpeg',
    'imgs/mao5.jpeg',
    'imgs/mao6.jpeg',
    'imgs/mao7.jpeg',
    'imgs/salao1.jpeg',
    'imgs/salao2.jpeg',
    'imgs/salao7.png',
    'imgs/salao6.png',
    'imgs/cabelo1.png',
    'imgs/corte1.jpg',
    'imgs/corte3.jpg',
    'imgs/pe2.jpeg',
    'imgs/pe.jpeg',
    'imgs/logo.png'
];

self.addEventListener('install', (evt) => {

    evt.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {

            console.log("Service Worker está adicionando o cache estático");
            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});

self.addEventListener('activate', (evt) => {

    console.log("Service Worker em ativação");

    evt.waitUntil(

        caches.keys().then((keylist) => {

            return Promise.all(keylist.map((key) => {

                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }

            }));

        })

    );

    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {

        const cache = await caches.open(CACHE_NAME);

        try {
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
                console.log('cachedResponse: ', event.request.url);
                return cachedResponse;
            }

            const fetchResponse = await fetch(event.request);
            if (fetchResponse) {
                console.log('fetchResponse: ', event.request.url);
                await cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            }
        } catch (error) {
            console.log('Fetch failed: ', error);
            const cachedResponse = await cache.match('offline.html');
            return cachedResponse;
        }
    })());
});