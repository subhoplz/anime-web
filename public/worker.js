use strict";

self.addEventListener('push', function (event) {
  const data = event.data.json();
  const title = data.title || 'New Anime Release!';
  const options = {
    body: data.body || 'Check out the latest episode!',
    icon: data.icon || '/icon.png',
    badge: data.badge || '/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // Open the app or a specific page
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
