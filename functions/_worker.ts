import {getUpcomingAnime} from '../src/services/anime';

export async function onRequest(context) {
  return handleRequest(context);
}

async function handleRequest(context) {
  // Get the client's IP address
  const ip = context.request.headers.get('CF-Connecting-IP');

  // Add a message to the response
  const message = `Hello from your Cloudflare Worker! IP address: ${ip || 'Unknown'}`;

  return new Response(message, {
    headers: { 'content-type': 'text/plain' },
  });
}

export const onRequestGet = async (context: any) => {
  // Handle the request
  return await handleRequest(context);
};

export const onRequestPost = async (context: any) => {
  // Handle the request
  return await handleRequest(context);
};

export const scheduleUpdateAnimeList = async () => {
  try {
    const animeList = await getUpcomingAnime();
    console.log('Successfully updated anime list:', animeList.length, 'items');
    // TODO: Implement logic to store the new anime list in a persistent storage, 
    // such as Cloudflare KV or a database. This is a placeholder for actual data persistence.
    return { success: true, message: 'Anime list updated successfully' };
  } catch (error: any) {
    console.error('Failed to update anime list:', error);
    return { success: false, error: error.message };
  }
};

export const onRequestCron = async (context: any) => {
  console.log('CRON triggered!');
  try {
    const result = await scheduleUpdateAnimeList();
    if (result.success) {
      console.log('Cron job succeeded:', result.message);
      return new Response('Cron job succeeded: ' + result.message, { status: 200 });
    } else {
      console.error('Cron job failed:', result.error);
      return new Response('Cron job failed: ' + result.error, { status: 500 });
    }
  } catch (error: any) {
    console.error('Cron job failed with an uncaught error:', error);
    return new Response('Cron job failed with an uncaught error: ' + error.message, { status: 500 });
  }
};
