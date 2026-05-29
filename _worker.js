export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname;
    
    // Block .pages.dev access
    if (host.endsWith('.pages.dev')) {
      return new Response(null, { status: 403 });
    }
    
    // Normal request - fetch the page
    return fetch(request);
  }
};
