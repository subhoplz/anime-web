import { Anime } from "@/services/anime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimeCardProps {
  anime: Anime;
  onTrack: (anime: Anime) => void;
  onUntrack: (anime: Anime) => void;
  isTracked: (anime: Anime) => boolean;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onTrack, onUntrack, isTracked }) => {
  return (
    <Card className="w-full md:w-[300px] rounded-lg shadow-md overflow-hidden">
      <CardHeader>
        <CardTitle>{anime.title}</CardTitle>
        <CardDescription>{new Date(anime.releaseDate).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <img src={anime.coverImage} alt={anime.title} className="w-full h-48 object-cover mb-4 rounded" />
        {isTracked(anime) ? (
          <button onClick={() => onUntrack(anime)} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Untrack
          </button>
        ) : (
          <button onClick={() => onTrack(anime)} className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            Track
          </button>
        )}
      </CardContent>
    </Card>
  );
};
