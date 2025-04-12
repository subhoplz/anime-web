"use client";

import { useState, useEffect } from "react";
import { Anime, getUpcomingAnime } from "@/services/anime";
import { AnimeCard } from "@/components/AnimeCard";

export const AnimeList: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [trackedAnime, setTrackedAnime] = useState<string[]>([]);

  useEffect(() => {
    const fetchAnime = async () => {
      const upcomingAnime = await getUpcomingAnime();
      setAnimeList(upcomingAnime);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {animeList.map((anime) => {
        const releaseDateFormatted = new Date(anime.releaseDate).toLocaleDateString();
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
