export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname;
  
  // Block .pages.dev access
  if (host.endsWith('.pages.dev')) {
    return new Response(null, { status: 403 });
  }
  
  // Normal request - continue to page
  return context.next();
}
