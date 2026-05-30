export async function onRequest(context) {
  const host = new URL(context.request.url).hostname;
  
  if (host === 'chulinchen.top' || host === 'www.chulinchen.top') {
    return context.next();
  }
  
  return new Response("403", {
    status: 403,
    headers: { "Content-Type": "text/plain" }
  });
}
