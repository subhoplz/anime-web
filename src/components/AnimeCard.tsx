"use client";

import { Anime } from "@/services/anime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimeCardProps {
  anime: Anime;
  onTrack: (anime: Anime) => void;
  onUntrack: (anime: Anime) => void;
  isTracked: (anime: Anime) => boolean;
  releaseDateFormatted: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onTrack, onUntrack, isTracked, releaseDateFormatted }) => {
  return (
    <Card className="w-full md:w-[300px] rounded-lg shadow-md overflow-hidden bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{anime.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{releaseDateFormatted}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <img src={anime.coverImage} alt={anime.title} className="w-full h-48 object-cover mb-4 rounded" />
        {isTracked(anime) ? (
          <button onClick={() => onUntrack(anime)} className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-2 px-4 rounded">
            No, un-track!
          </button>
        ) : (
          <button onClick={() => onTrack(anime)} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-2 px-4 rounded">
            Gotta track 'em all!
          </button>
        )}
      </CardContent>
    </Card>
  );
};
