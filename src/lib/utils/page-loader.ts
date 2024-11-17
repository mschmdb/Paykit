// lib/utils/page-loader.ts
import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { createCaller } from '$lib/trpc/router';


export async function loadPage(event: RequestEvent) {
  const { slug } = event.params;
  const caller = createCaller(await createContext(event));

  try {
    if (!slug) {
      // For the home page, fetch the page with slug 'home'
      const page = await caller.getPage({ slug: 'home' });
      return { page };
    } else {
      const page = await caller.getPage({ slug });
      return { page };
    }
  } catch (e) {
    console.error(`Error fetching page with slug ${slug || 'home'}:`, e);
    throw error(404, `Page not found: ${slug || 'home'}`);
  }
}

export async function loadPages(event: RequestEvent) {
  const caller = createCaller(await createContext(event));

  try {
    const pages = await caller.loadPages();
    return { pages };
  } catch (e) {
    console.error('Error fetching pages:', e);
    return { pages: { docs: [] } };
  }
}


export async function loadPost(event: RequestEvent) {
  const { slug } = event.params;
  if (!slug) {
    throw error(400, 'Slug is required');
  }
  const caller = createCaller(await createContext(event));

  try {
    const post = await caller.getPost({ slug });
    return { post };
  } catch (e) {
    console.error(`Error fetching post with slug ${slug}:`, e);
    throw error(404, `Post not found: ${slug}`);
  }
}

export async function loadPosts(event: RequestEvent) {
  const caller = createCaller(await createContext(event));

  try {
    const posts = await caller.loadPosts();
    return { posts };
  } catch (e) {
    console.error('Error fetching posts:', e);
    return { posts: { docs: [] } };
  }
}

export async function loadHeader(event: RequestEvent) {
  const caller = createCaller(await createContext(event));

  try {
    const header = await caller.loadHeader();
    return { header };
  } catch (e) {
    console.error('Error fetching header:', e);
    throw error(500, 'Failed to fetch header');
  }
}