'use server';

import webpush from 'web-push';

// VAPID keys should be generated only once and stored securely
const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:test@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export async function subscribeUser(subscription: PushSubscription) {
  // TODO: Store the subscription in a database
  console.log('User subscribed:', subscription);
  return { success: true };
}

export async function sendNotification(subscription: PushSubscription, payload: string) {
  try {
    await webpush.sendNotification(subscription, payload);
    console.log('Push notification sent.');
    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error: error };
  }
}

export function getVapidPublicKey() {
  return vapidKeys.publicKey;
}
