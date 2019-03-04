self.addEventListener('install', function (event) {
    console.log('SW installed');
    event.waitUntil(
        caches.open('test-worker').then(function (cache) {
            cache.addAll([
                '/',
                '/index.html',
                'js/app.js',
                '/images/apple-touch-icon.png',
                '/images/apple-touch-icon-152x152.png',
                '/images/apple-touch-icon-180x180.png',
                '/images/apple-touch-icon-120x120.png',
                '/css/app.css'
            ]);
        })
    );
});

self.addEventListener('activate', function () {
    console.log('SW activated');
});

self.addEventListener('fetch', function (event) {
   event.respondWith(
       caches.match(event.request).then(function (res) {
           if (res) {
               return res;
           } else {
               fetch(event.request);
           }
       })
   );
});