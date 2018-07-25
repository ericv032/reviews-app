var CACHE_NAME = 'restaurant—reviews-static-v4';
var urlsToCache = [
		'/index.html',
		'/restaurant.html',
		'/js/main.js',
		'/css/styles.css',
		'/js/main.js',
		'/js/sw.js',
		'/js/restaurant_info.js',
		'/js/dbhelper.js',
		'/data/restaurants.json',
        '/img/1.jpg',
		'/img/2.jpg',
		'/img/3.jpg',
		'/img/4.jpg',
		'/img/5.jpg',
		'/img/6.jpg',
		'/img/7.jpg',
		'/img/8.jpg',
		'/img/9.jpg',
		'/img/10.jpg',
        'http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic'
];

self.addEventListener('install', function(event) {
	// Perform install steps
	event.waitUntil(
	  caches.open(CACHE_NAME)
		.then(function(cache) {
		  console.log('Opened cache');
		  return cache.addAll(urlsToCache);
		})
	);
  });

  self.addEventListener('fetch', function(event) {
	event.respondWith(
	  caches.match(event.request)
		.then(function(response) {
		  // Cache hit - return response
		  if (response) {
			return response;
		  }
		  return fetch(event.request);
		}
	  )
	);
  });

  self.addEventListener('activate', function(event) {

	var cacheWhitelist = ['restaurant—reviews-static-v4'];
  
	event.waitUntil(
	  caches.keys().then(function(cacheNames) {
		return Promise.all(
		  cacheNames.map(function(cacheName) {
			if (cacheWhitelist.indexOf(cacheName) === -1) {
			  return caches.delete(cacheName);
			}
		  })
		);
	  })
	);
  });
