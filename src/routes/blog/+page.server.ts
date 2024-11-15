// src/routes/blog/+page.server.ts

import { createContext } from '$lib/trpc/context';
import { createCaller } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const caller = createCaller(await createContext(event));

  try {
    const posts = await caller.loadPosts();
    return { posts };
  } catch (e) {
    console.error('Error fetching blog posts:', e);
    return { posts: { docs: [] } };
  }
};