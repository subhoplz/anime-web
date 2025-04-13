export async function onRequest(context: { request: Request, next: () => Promise<Response> }) {
  const response = await context.next();
  response.headers.set('x-custom-header', 'hello from worker');
  return response;
}