"use client";

import { useState, useEffect } from "react";
import { Anime, getUpcomingAnime } from "@/services/anime";
import { AnimeCard } from "@/components/AnimeCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icons } from "@/components/icons";

export const AnimeList: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [trackedAnime, setTrackedAnime] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const upcomingAnime = await getUpcomingAnime();
        setAnimeList(upcomingAnime);
      } catch (e: any) {
        setError(e.message || "Failed to fetch anime.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnime();

    // Load tracked anime from local storage
    const storedTrackedAnime = localStorage.getItem("trackedAnime");
    if (storedTrackedAnime) {
      setTrackedAnime(JSON.parse(storedTrackedAnime));
    }
  }, []);

  useEffect(() => {
    // Save tracked anime to local storage
    localStorage.setItem("trackedAnime", JSON.stringify(trackedAnime));
  }, [trackedAnime]);

  const handleTrack = (anime: Anime) => {
    setTrackedAnime([...trackedAnime, anime.id]);
  };

  const handleUntrack = (anime: Anime) => {
    setTrackedAnime(trackedAnime.filter((id) => id !== anime.id));
  };

  const isTracked = (anime: Anime) => {
    return trackedAnime.includes(anime.id);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Icons.close className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {animeList.map((anime) => {
        const releaseDateFormatted = anime.releaseDate !== 'Unknown' ? new Date(anime.releaseDate).toLocaleDateString() : 'Unknown';
        return (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onTrack={handleTrack}
            onUntrack={handleUntrack}
            isTracked={isTracked}
            releaseDateFormatted={releaseDateFormatted}
          />
        );
      })}
    </div>
  );
};
