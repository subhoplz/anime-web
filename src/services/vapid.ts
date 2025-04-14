// This file contains client-side safe VAPID key retrieval

export function getVapidPublicKey(): string {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicKey) {
    console.error('VAPID public key is not configured in environment variables (NEXT_PUBLIC_VAPID_PUBLIC_KEY).');
    // Returning an empty string or a default key might be appropriate depending on error handling strategy
    return ''; 
  }
  return publicKey;
}
