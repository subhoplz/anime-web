'use server';

import webpush from 'web-push';

// VAPID keys should be generated only once and stored securely
const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  privateKey: process.env.VAPID_PRIVATE_KEY || '',
};

console.log('[Server] Using VAPID Public Key:', vapidKeys.publicKey ? 'Loaded from ENV' : 'MISSING/Temporary');
console.log('[Server] Using VAPID Private Key:', vapidKeys.privateKey ? 'Loaded from ENV' : 'MISSING/Temporary');

if (!vapidKeys.publicKey || !vapidKeys.privateKey) {
  console.warn('[Server] VAPID keys are missing. Generating temporary keys. Please configure environment variables.');
  const generatedKeys = webpush.generateVAPIDKeys();
  vapidKeys.publicKey = generatedKeys.publicKey;
  vapidKeys.privateKey = generatedKeys.privateKey;
}

try {
  webpush.setVapidDetails(
    'mailto:test@example.com', // Replace with your email
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
  console.log('[Server] web-push VAPID details set successfully.');
} catch (error) {
  console.error('[Server] Failed to set VAPID details:', error);
}

export async function subscribeUser(subscription: PushSubscription) {
  console.log('[Server] subscribeUser called with subscription:', subscription);
  try {
    // TODO: Store the subscription securely.  If storing fails, this should return an error.
    // For now, we'll simulate a potential error.
    const simulateStorageError = false; // Change this to true to simulate an error
    if (simulateStorageError) {
      throw new Error('Failed to store subscription.');
    }
    return { success: true };
  } catch (error: any) {
    console.error('[Server] Error storing subscription:', error);
    return { success: false, error: error.message || 'Failed to subscribe user' };
  }
}

export async function sendNotification(subscription: any, payload: string) {
  console.log('[Server] sendNotification called.');
  console.log('[Server] Attempting to send notification to endpoint:', subscription.endpoint);
  console.log('[Server] Payload:', payload);
  try {
    await webpush.sendNotification(subscription, payload);
    console.log('[Server] webpush.sendNotification succeeded.');
    return { success: true };
  } catch (error: any) {
    console.error('[Server] webpush.sendNotification failed:', error);
    // Handle specific errors
    if (error.statusCode) {
       console.error(`[Server] Status Code: ${error.statusCode}`);
       console.error(`[Server] Body: ${error.body}`);
       console.error(`[Server] Headers: ${JSON.stringify(error.headers)}`);
    }
    if (error.statusCode === 410 || error.statusCode === 404) {
      console.log('[Server] Subscription has expired or is no longer valid.');
      // TODO: Remove the invalid subscription from your database
    }
    return { success: false, error: error.message || 'Unknown server error' };
  }
}
