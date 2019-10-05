// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'MikkiPastel-v1';
var cacheName = 'MikkiPastel-1';
var filesToCache = [
  '/',
  '/favicon.ico',
  '/index.html',
  '/about.html',
  '/BKroute.html',
  '/healthMe.html',
  '/ipcam.html',
  '/MyMotion.html',
  '/css/bootstrap.min.css',
  '/css/carousel.css',
  '/css/ie10-viewport-bug-workaround.css',
  '/fonts/glyphicons-halflings-regular.eot',
  '/fonts/glyphicons-halflings-regular.svg',
  '/fonts/glyphicons-halflings-regular.ttf',
  '/fonts/glyphicons-halflings-regular.woff',
  '/fonts/glyphicons-halflings-regular.woff2',
  '/image/activity_bukd.jpg',
  '/image/activity_ime24.gif',
  '/image/activity_mega2014.jpg',
  '/image/activity_sia.jpg',
  '/image/activity_walkathon.jpg',
  '/image/app_BKroute.jpg',
  '/image/app_chicktoys.png',
  '/image/app_exoplanet.png',
  '/image/app_feelfit.png',
  '/image/app_healthME.png',
  '/image/app_ipcam.png',
  '/image/app_mikki.png',
  '/image/app_mymotion.png',
  '/image/app_onemeal.png',
  '/image/app_sukhum.jpg',
  '/image/cover_play.png',
  '/image/loongsukhum_team.jpg',
  '/image/monthira_adword_cerf.jpg',
  '/image/owlvegrammo.PNG',
  '/image/profile1.jpg',
  '/image/profile2.jpg',
  '/image/pwa_reward.jpg',
  '/image/smartphone-312816_960_720.jpg',
  '/image/bkroute/1446722515905.jpg',
  '/image/bkroute/activity_mega2014_b.jpeg',
  '/image/bkroute/activity_sia_b.jpg',
  '/image/icons/icon-144x144.png',
  '/image/icons/icon-192x192.png',
  '/image/icons/icon-512x512.png',
  '/image/icons/icon-72x72.png',
  '/image/icons/icon-96x96.png',
  '/js/bootstrap.min.js',
  '/js/ie-emulation-modes-warning.js',
  '/js/ie10-viewport-bug-workaround.js',
  '/js/vendor/holder.min.js',
  '/js/vendor/jquery.min.js',
  '/scss/style.scss'
];

// for offline mode
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
