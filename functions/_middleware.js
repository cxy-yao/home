export async function onRequest(context) {
  const host = new URL(context.request.url).hostname;
  
  // Only allow chulinchen.top
  if (host !== 'chulinchen.top') {
    return new Response(null, { status: 403 });
  }
  
  return context.next();
}
