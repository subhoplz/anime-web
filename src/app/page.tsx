"use client";

import { AnimeList } from "@/components/AnimeList";
import { NavBar } from "@/components/NavBar";

export default function Home() {
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
      </div>
    </>
  );
}
