// src/routes/blog/[slug]/+page.server.ts

import { error } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { createCaller } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const { slug } = event.params;
  const caller = createCaller(await createContext(event));

  try {
    const post = await caller.getPost({ slug });
    return { post };
  } catch (e) {
    console.error(`Error fetching blog post with slug ${slug}:`, e);
    throw error(404, `Blog post not found: ${slug}`);
  }
};