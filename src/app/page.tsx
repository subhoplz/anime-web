"use client";

import { AnimeList } from "@/components/AnimeList";
import { NavBar } from "@/components/NavBar";
import { useEffect, useState } from "react";
import { sendNotificationAction } from './actions';
import { subscribeUser } from "@/services/notification";
import { getVapidPublicKey } from "@/services/vapid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [publicKey, setPublicKey] = useState<string>('');
  const [isServiceWorkerSupported, setIsServiceWorkerSupported] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    console.log('[Client] useEffect 1 called!');
    const key = getVapidPublicKey();
    setPublicKey(key);
    console.log('[Client] VAPID Public Key:', key);
    setIsServiceWorkerSupported('serviceWorker' in navigator);
  }, []);

  useEffect(() => {
    console.log('[Client] useEffect 2 called!');
    if (publicKey && isServiceWorkerSupported) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(async (registration) => {
          console.log('[Client] Service Worker Ready');
          try {
            let subscription = await registration.pushManager.getSubscription();
            if (!subscription) {
              console.log('[Client] No existing subscription, creating a new one...');
              subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicKey,
              });
              console.log('[Client] New subscription object:', subscription);
              setCurrentSubscription(subscription); // Store subscription
              const response = await subscribeUser(subscription); // Subscribe on server
              console.log('[Client] subscribeUser response:', response);
              if (response.success) {
                console.log('[Client] Successfully subscribed on server.');
                setIsSubscribed(true);

                // --- Send Test Notification via Server Action --- 
                console.log('[Client] Sending test notification via Action...');
                const testPayload = JSON.stringify({ title: 'Test Notification', body: 'You have successfully subscribed!' });
                // Call the server action here
                const sendResponse = await sendNotificationAction(testPayload);
                console.log('[Client] sendNotificationAction response:', sendResponse);
                if (sendResponse.success) {
                  console.log('[Client] Test notification Action sent successfully.');
                } else {
                  console.error('[Client] Failed to send test notification via Action:', sendResponse.error);
                }
                // --- End Test Notification --- 

              } else {
                console.error('[Client] Failed to subscribe on the server:', response.error);
                await subscription.unsubscribe();
                console.log('[Client] Unsubscribed due to server error.');
                setCurrentSubscription(null);
              }
            } else {
              console.log('[Client] User is already subscribed.');
              setCurrentSubscription(subscription); // Store existing subscription
              setIsSubscribed(true);
            }
          } catch (error) {
            console.error('[Client] Error during subscription process:', error);
          }
        }).catch(error => {
          console.error('[Client] Error during service worker registration:', error);
        });
      } else {
        console.log('[Client] Service workers are NOT supported in this browser.');
      }
    }
  }, [publicKey, isServiceWorkerSupported]);

  const handleManualSend = async () => {
    if (!currentSubscription) {
      alert('Not subscribed yet!');
      return;
    }
    const message = prompt("Enter notification message:");
    if (message) {
      console.log('[Client] Manually sending notification via Action...');
      const payload = JSON.stringify({ title: 'Manual Notification', body: message });
      const response = await sendNotificationAction(payload);
      if (response.success) {
        alert('Notification sent!');
      } else {
        alert(`Failed to send notification: ${response.error}`);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-10">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Most Trending Anime</h2>
          <AnimeList />
        </section>

        {/* Subscription Status and Manual Send Button */}
        <section className="mt-8">
          {isServiceWorkerSupported ? (
            isSubscribed ? (
              <div>
                <p>You are subscribed to notifications.</p>
                <button 
                  onClick={handleManualSend}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Send Manual Notification
                </button>
              </div>
            ) : (
              <p>Subscribing to notifications...</p>
            )
          ) : (
            <p>Service Workers are not supported by your browser. Notifications unavailable.</p>
          )}
        </section>

          {/* Trial Card */}
          <section className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Trial Notification</CardTitle>
                <CardDescription>
                  Click the button below to send a test notification.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <button 
                  onClick={() => sendNotificationAction(JSON.stringify({title: 'Trial Notification', body: 'This is a trial notification!' }))}
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send Trial Notification
                </button>
              </CardContent>
            </Card>
          </section>
      </div>
    </>
  );
}

