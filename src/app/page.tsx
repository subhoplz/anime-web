"use client";

import { AnimeList } from "@/components/AnimeList";
import { NavBar } from "@/components/NavBar";
import { useEffect, useState } from "react";
import { getVapidPublicKey, subscribeUser } from "@/services/notification";

export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicKey = async () => {
      const key = await getVapidPublicKey();
      setPublicKey(key);
    };

    fetchPublicKey();
  }, []);

  const subscribe = async () => {
    if (!('serviceWorker' in navigator)) {
      console.error('Service workers are not supported.');
      return;
    }

    const registration = await navigator.serviceWorker.register('/worker.js');

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey,
    });

    const response = await subscribeUser(subscription);

    if (response.success) {
      setIsSubscribed(true);
    } else {
      console.error('Subscription failed:', response.error);
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

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Anime News</h2>
          <p className="text-muted-foreground">Latest news about upcoming anime.</p>
          {/* Add Anime News Component here */}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Release Timetable</h2>
          <p className="text-muted-foreground">A complete timetable of anime releases.</p>
          {/* Add Release Timetable Component here */}
        </section>
        {publicKey && !isSubscribed && (
          <button onClick={subscribe}>Subscribe to Notifications</button>
        )}
      </div>
    </>
  );
}
