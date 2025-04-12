"use client";

import { Anime } from "@/services/anime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AnimeCardProps {
  anime: Anime;
  onTrack: (anime: Anime) => void;
  onUntrack: (anime: Anime) => void;
  isTracked: (anime: Anime) => boolean;
  releaseDateFormatted: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onTrack, onUntrack, isTracked, releaseDateFormatted }) => {
  const [date, setDate] = useState<Date>();

  return (
    <Card className="w-full md:w-[300px] rounded-lg shadow-md overflow-hidden bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{anime.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{releaseDateFormatted}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <img src={anime.coverImage} alt={anime.title} className="w-full h-48 object-cover mb-4 rounded" />
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-2 px-4 rounded">
              Show Release Calendar
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center" side="bottom">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className={cn("border-0")}
            />
          </PopoverContent>
        </Popover>
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

