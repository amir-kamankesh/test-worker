/*self.addEventListener('install', function (event) {
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
*/


// const prechaches = self.__precacheManifest;

let urls = [
    '/',
    '/index.html',
    'js/app.js',
    '/images/apple-touch-icon.png',
    '/images/apple-touch-icon-152x152.png',
    '/images/apple-touch-icon-180x180.png',
    '/images/apple-touch-icon-120x120.png',
    '/css/app.css'
];

/*prechaches.forEach(prechache => {
    urls.push(prechache.url);
});*/

const RUNTIME = 'test-worker';


self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('installing sw');
    event.waitUntil(
        caches.open(RUNTIME)
            .then(function(cache) {
                console.log('Opened cache');
                var x = cache.addAll(urls);
                console.log('cache added');
                return x;
            })
    );
});


self.addEventListener('activate', event => {
    self.clients.claim();
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    // The fetch handler serves responses for same-origin resources from a cache.
    // If no response is found, it populates the runtime cache with the response
    // from the network before returning it to the page.
    // console.log(event.request.url);
    if (!event.request.url.startsWith('http://2mrdl.mocklab.io')) {

        // console.log('i am in');
        event.respondWith(
            // Intercept all resource requests
            caches.match(event.request).then(cachedResponse => {
                // check if cached data exist
                if (cachedResponse) {
                    // console.log('cached data responded');
                    return cachedResponse;
                }

                // if cache not exist open runtime cache
                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            // console.log('cache data put to runtime cache');
                            return response;
                        });
                    });
                });
            })
        )
    } else {
        // console.log('send request to network');
        return fetch(event.request).then(response => {
            return response;
        });
    }
});