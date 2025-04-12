/**
 * Represents basic information about an anime.
 */
export interface Anime {
  /**
   * The ID of the anime.
   */
  id: string;
  /**
   * The title of the anime.
   */
  title: string;
  /**
   * The URL of the anime's cover image.
   */
  coverImage: string;
  /**
   * The release date of the anime in ISO format.
   */
  releaseDate: string;
}

/**
 * Asynchronously retrieves a list of upcoming anime releases.
 * @returns A promise that resolves to an array of Anime objects.
 */
export async function getUpcomingAnime(): Promise<Anime[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      title: 'Anime 1',
      coverImage: 'https://example.com/anime1.jpg',
      releaseDate: '2024-01-01',
    },
    {
      id: '2',
      title: 'Anime 2',
      coverImage: 'https://example.com/anime2.jpg',
      releaseDate: '2024-01-08',
    },
  ];
}
