// lib/utils/page-loader.ts
import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { createCaller } from '$lib/trpc/router';
import { PUBLIC_HOME_SLUG } from '$env/static/public';

export async function loadPage(event: RequestEvent, lang?: string) {
  const { slug } = event.params;
  const context = await createContext(event);
  const caller = createCaller(context);

  try {
    if (!slug) {
      const page = await caller.getPage({ slug: PUBLIC_HOME_SLUG, lang });
      return { page };
    } else {
      const page = await caller.getPage({ slug, lang });
      return { page };
    }
  } catch (e) {
    console.error(`Error fetching page with slug ${slug || PUBLIC_HOME_SLUG}:`, e);
    throw error(404, `Page not found: ${slug || PUBLIC_HOME_SLUG}`);
  }
}

export async function loadPages(event: RequestEvent, lang?: string) {
  const caller = createCaller(await createContext(event));

  try {
    const pages = await caller.loadPages({ lang });
    return { pages };
  } catch (e) {
    console.error('Error fetching pages:', e);
    return { pages: { docs: [] } };
  }
}

export async function loadPost(event: RequestEvent, lang?: string) {
  const { slug } = event.params;
  if (!slug) {
    throw error(400, 'Slug is required');
  }
  const caller = createCaller(await createContext(event));

  try {
    const post = await caller.getPost({ slug, lang });
    return { post };
  } catch (e) {
    console.error(`Error fetching post with slug ${slug}:`, e);
    throw error(404, `Post not found: ${slug}`);
  }
}

export async function loadPosts(event: RequestEvent, lang?: string) {
  const caller = createCaller(await createContext(event));
  try {
    const posts = await caller.loadPosts({ lang });
    return { posts };
  } catch (e) {
    console.error('Error fetching posts:', e);
    return { posts: { docs: [] } };
  }
}

export async function loadHeader(event: RequestEvent, lang?: string) {
  const caller = createCaller(await createContext(event));

  try {
    const header = await caller.loadHeader({ lang });
    return { header };
  } catch (e) {
    console.error('Error fetching header:', e);
    throw error(500, 'Failed to fetch header');
  }
}

export async function loadFooter(event: RequestEvent, lang?: string) {
  const caller = createCaller(await createContext(event));

  try {
    const footer = await caller.loadFooter({ lang });
    return { footer };
  } catch (e) {
    console.error('Error fetching footer:', e);
    throw error(500, 'Failed to fetch footer');
  }
}