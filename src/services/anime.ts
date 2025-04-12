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
 * Asynchronously retrieves a list of upcoming anime releases from AniList.
 * @returns A promise that resolves to an array of Anime objects.
 */
export async function getUpcomingAnime(): Promise<Anime[]> {
  const query = `
    query {
      Page(page: 1, perPage: 50) {
        media(type: ANIME, sort: POPULARITY_DESC, status: RELEASING) {
          id
          title {
            romaji
          }
          coverImage {
            large
          }
          startDate {
            year
            month
            day
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query
      })
    });

    const data = await response.json();

    if (data.errors) {
      console.error("Error fetching anime:", data.errors);
      throw new Error("Failed to fetch anime from AniList");
    }

    const animeList = data.data.Page.media.map((anime: any) => ({
      id: String(anime.id),
      title: anime.title.romaji,
      coverImage: anime.coverImage.large,
      releaseDate: anime.startDate.year ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : 'Unknown',
    }));

    return animeList;
  } catch (error) {
    console.error("Error fetching anime:", error);
    return [];
  }
}
