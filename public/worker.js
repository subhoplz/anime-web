// public/worker.js

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');

  let data = {};
  try {
    // Attempt to parse the incoming push data as JSON
    data = event.data.json();
    console.log('[Service Worker] Push data (parsed JSON):', data);
  } catch (e) {
    // If parsing fails, treat the data as plain text
    const textData = event.data.text();
    console.log(`[Service Worker] Push data (raw text): "${textData}"`);
    data = { title: 'Notification', body: textData }; // Fallback to text
  }

  const title = data.title || 'Push Notification';
  const options = {
    body: data.body || 'Something new happened!',
    icon: data.icon || '/favicon.ico', // Default icon (using favicon)
    badge: data.badge || '/favicon.ico' // Default badge (using favicon)
    // You can add more options here: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#options
    // e.g., data: { url: '/' } // Add data to use in notificationclick
  };

  console.log('[Service Worker] Showing notification with title:', title, 'and options:', options);

  // Keep the service worker alive until the notification is shown
  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close(); // Close the notification

  // Example: Focus an existing tab or open a new one
  const urlToOpen = '/'; // Change this to a specific URL if needed
  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true // Important to find clients potentially not controlled by this version yet
    }).then((clientList) => {
      for (const client of clientList) {
        // Check if the client's URL matches and if it can be focused
        if (new URL(client.url).pathname === urlToOpen && 'focus' in client) {
          console.log('[Service Worker] Focusing existing client:', client.url);
          return client.focus();
        }
      }
      // If no matching client is found or focus fails, open a new window
      if (clients.openWindow) {
        console.log('[Service Worker] Opening new window to:', urlToOpen);
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener('install', event => {
  console.log('[Service Worker] Install event - New worker installing.');
  // Optional: Force the waiting service worker to become the active service worker.
  // self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event - Worker activated.');
  // Optional: Takes control of pages that were previously controlled by an older version
  // event.waitUntil(clients.claim());
});
