self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push data: "${event.data.text()}"`);

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.error('[Service Worker] Error parsing push data JSON:', e);
    data = { title: 'Notification', body: event.data.text() }; // Fallback
  }

  const title = data.title || 'Push Notification';
  const options = {
    body: data.body || 'Something new happened!',
    icon: data.icon || '/icon.png', // Default icon
    badge: data.badge || '/badge.png' // Default badge
    // Add other options like data, actions, etc. if needed
  };

  console.log('[Service Worker] Showing notification with title:', title, 'and options:', options);

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  // Example: Open the app or a specific URL based on notification data
  const urlToOpen = event.notification.data?.url || '/'; 
  event.waitUntil(
    clients.matchAll({
      type: "window",
    }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener('install', event => {
  console.log('[Service Worker] Install event');
  // Optional: Skip waiting phase to activate the new worker immediately
  // self.skipWaiting(); 
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event');
  // Optional: Claim clients to control pages immediately
  // event.waitUntil(clients.claim()); 
});
