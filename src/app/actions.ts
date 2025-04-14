'use server';

import { sendNotification } from '../services/notification'; // Adjust import path if needed

export async function sendNotificationAction(message: string) {
  console.log('[Action] sendNotificationAction called with message:', message);
  
  // --- IMPORTANT --- 
  // You MUST replace this with actual logic to retrieve 
  // the user's push subscription from your database or storage.
  // This placeholder will NOT work in a real application.
  const subscription: PushSubscription | null = null; // Replace with actual retrieval logic

  if (!subscription) {
    console.error('[Action] No subscription found. Cannot send notification.');
    // Optionally, inform the user they need to subscribe first.
    return { success: false, error: 'Subscription not found.' };
  }

  console.log('[Action] Retrieved subscription:', subscription);

  try {
    const result = await sendNotification(subscription, message);
    console.log('[Action] sendNotification result:', result);
    return result;
  } catch (error: any) {
    console.error('[Action] Error calling sendNotification:', error);
    return { success: false, error: error.message || 'Failed to send notification' };
  }
}
