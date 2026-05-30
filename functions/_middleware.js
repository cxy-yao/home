export async function onRequest(context) {
  const host = new URL(context.request.url).hostname;
  
  // Allow chulinchen.top and www.chulinchen.top
  if (host === 'chulinchen.top' || host === 'www.chulinchen.top') {
    return context.next();
  }
  
  // Block everything else (pages.dev etc)
  return new Response(null, { status: 403 });
}
