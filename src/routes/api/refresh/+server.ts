// src/routes/api/refresh/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_ISR_REVALIDATION_TOKEN } from '$env/static/public';
import { error } from '@sveltejs/kit';

// Function to parse the sitemap XML and extract URLs
async function extractUrlsFromSitemap(baseUrl: string): Promise<string[]> {
  const response = await fetch(`${baseUrl}/sitemap.xml`);
  const xmlText = await response.text();
  const urls: string[] = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xmlText)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

export const GET: RequestHandler = async ({ url, request }) => {
  // Check for authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${PUBLIC_ISR_REVALIDATION_TOKEN}`) {
    throw error(401, 'Unauthorized');
  }

  try {
    const baseUrl = `${url.protocol}//${url.host}`;
    const urls = await extractUrlsFromSitemap(baseUrl);

    // Revalidate each URL
    const revalidationPromises = urls.map(async (fullUrl) => {
      const path = new URL(fullUrl).pathname;
      await fetch(`${baseUrl}${path}`, {
        method: 'GET',
        headers: { 'x-prerender-revalidate': PUBLIC_ISR_REVALIDATION_TOKEN }
      });
    });

    await Promise.all(revalidationPromises);

    return new Response('All pages revalidated successfully', { status: 200 });
  } catch (err) {
    console.error('Error during revalidation:', err);
    throw error(500, 'Internal Server Error during revalidation');
  }
};