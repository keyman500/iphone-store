var needed =[`/index.html`,
        `./css/maps/style.css.map`,
        `./css/styles.css`,
        `./js/main.js`,
        `./scss/styles.scss`,
        `./scss/_muxins.scss`,
        `./plugins/jquery-2.1.1.min.js`,
        `./plugins/modernizer-2.6.2.min.js`,
        `./plugins/bootstrap/bootstrap.min.css`,
        `./plugins/bootstrap/bootstrap.min.js`,
        `./plugins/owl-carousel/owl.carousel.css`,
        `./plugins/owl-carousel/owl.carousel.min.js`,
        `./plugins/magnific-popup/magnific-popup.css`,
        `./plugins/magnific-popup/jquery.magnific.popup.min.js`,]

const version = "0.6.19";
const cacheName = `airhorner-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/index.html`,
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "https://iphone-store.keyman500.repl.co/images/phone.jpg"
  });
});
