// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { createCaller } from '$lib/trpc/router';
import type { Context } from '$lib/trpc/context';
import { dev } from '$app/environment';

interface SitemapItem {
  slug: string;
  updatedAt: string;
}

const generateSitemapXml = (items: SitemapItem[], baseUrl: string): string => {
  const xmlItems = items.map(item => `
    <url>
      <loc>${baseUrl}/${item.slug}</loc>
      <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlItems}
    </urlset>`;
};

export const GET: RequestHandler = async ({ url, locals }) => {
  const baseUrl = `${url.protocol}//${url.host}`;
  const ctx = locals as Context;
  const trpc = createCaller(ctx);

  try {
    const [enPages, dePagesPages, enPosts, dePosts] = await Promise.all([
      trpc.loadPages({ lang: 'en' }),
      trpc.loadPages({ lang: 'de' }),
      trpc.loadPosts({ lang: 'en' }),
      trpc.loadPosts({ lang: 'de' })
    ]);

    const enPageItems: SitemapItem[] = enPages.docs.map(page => ({
      slug: `en/${page.slug}`,
      updatedAt: page.updatedAt
    }));

    const dePageItems: SitemapItem[] = dePagesPages.docs.map(page => ({
      slug: `de/${page.slug}`,
      updatedAt: page.updatedAt
    }));

    const enPostItems: SitemapItem[] = enPosts.docs.map(post => ({
      slug: `en/blog/${post.slug}`,
      updatedAt: post.updatedAt
    }));

    const dePostItems: SitemapItem[] = dePosts.docs.map(post => ({
      slug: `de/blog/${post.slug}`,
      updatedAt: post.updatedAt
    }));

    const allItems = [...enPageItems, ...dePageItems, ...enPostItems, ...dePostItems];

    // Add home pages for both languages
    allItems.push(
      { slug: 'en', updatedAt: new Date().toISOString() },
      { slug: 'de', updatedAt: new Date().toISOString() }
    );

    const sitemapXml = generateSitemapXml(allItems, baseUrl);

    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': dev ? 'no-cache' : 'max-age=0, s-maxage=3600'
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};