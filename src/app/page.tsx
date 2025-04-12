"use client";

import { AnimeList } from "@/components/AnimeList";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Upcoming Anime Releases</h1>
      <AnimeList />
    </div>
  );
}
