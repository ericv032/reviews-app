/* self.addEventListener('install', function(event) {
	event.waitUntil(
	caches.open('restaurant—reviews-static-v3').then(function(cache) {
	return cache.addAll(
		[
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
		'/img/10.jpg'
			]
		);
    })
  );
}); */

var CACHE_VERSION = 'restaurant—reviews-static-v3';
var CACHE_FILES = [
		'/',
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

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
			caches.match(event.request).then(function(res){
					if(res){
							return res;
					}
					requestBackend(event);
			})
	)
});

function requestBackend(event){
	var url = event.request.clone();
	return fetch(url).then(function(res){
			//if not a valid response send the error
			if(!res || res.status !== 200 || res.type !== 'basic'){
					return res;
			}

			var response = res.clone();

			caches.open(CACHE_NAME).then(function(cache){
					cache.put(event.request, response);
			});

			return res;
	})
}
