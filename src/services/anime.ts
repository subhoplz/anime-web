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
    /**
   * The release time of the anime episode.
   */
  releaseTime?: string;
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
          nextAiringEpisode {
            airingAt
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
      throw new Error("Failed to fetch anime from AniList: " + data.errors.map((e: any) => e.message).join(", "));
    }

    const animeList = data.data.Page.media.map((anime: any) => {
      let releaseTime = 'Unknown';
      if (anime.nextAiringEpisode && anime.nextAiringEpisode.airingAt) {
        const airingDate = new Date(anime.nextAiringEpisode.airingAt * 1000); // convert seconds to milliseconds
        releaseTime = airingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }

      return {
        id: String(anime.id),
        title: anime.title.romaji,
        coverImage: anime.coverImage.large,
        releaseDate: anime.startDate.year ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : 'Unknown',
        releaseTime: releaseTime,
      };
    });

    return animeList;
  } catch (error: any) {
    console.error("Error fetching anime:", error);
    throw new Error("Failed to fetch anime. Please check the console for details.");
  }
}
