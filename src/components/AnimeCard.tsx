"use client";

import { Anime } from "@/services/anime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface AnimeCardProps {
  anime: Anime;
  onTrack: (anime: Anime) => void;
  onUntrack: (anime: Anime) => void;
  isTracked: (anime: Anime) => boolean;
  releaseDateFormatted: string;
  index: number; // Added index prop
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onTrack, onUntrack, isTracked, releaseDateFormatted, index }) => {
  let releaseTimeFormatted = 'Unknown';
  if (anime.releaseTime && anime.releaseTime !== 'Unknown') {
    try {
      const timeParts = anime.releaseTime.split(':');
      if (timeParts.length === 2) {
        const [hours, minutes] = timeParts;
        let date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        releaseTimeFormatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        releaseTimeFormatted = anime.releaseTime;
      }
    } catch (e) {
      console.error("Error formatting time:", e);
      releaseTimeFormatted = anime.releaseTime;
    }
  }

  return (
    <Card className="w-full md:w-[300px] rounded-lg shadow-md overflow-hidden bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{anime.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{releaseDateFormatted}</CardDescription>
        {anime.releaseTime && anime.releaseTime !== 'Unknown' && (
          <CardDescription className="text-sm text-muted-foreground">
            Release Time: {releaseTimeFormatted}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <Image
          src={anime.coverImage}
          alt={anime.title}
          width={300}
          height={450}
          className="w-full h-48 object-cover mb-4 rounded"
          loading={index === 0 ? undefined : 'lazy'} // Only lazy load if not the first image
          priority={index === 0} // Set priority only for the first image (index 0)
        />
        {isTracked(anime) ? (
          <button onClick={() => onUntrack(anime)} className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-2 px-4 rounded mt-2">
            No, un-track!
          </button>
        ) : (
          <button onClick={() => onTrack(anime)} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-2 px-4 rounded mt-2">
            Gotta track 'em all!
          </button>
        )}
      </CardContent>
    </Card>
  );
};
