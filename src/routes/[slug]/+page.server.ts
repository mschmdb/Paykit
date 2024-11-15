import { error } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { createCaller } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const { slug } = event.params;
  const caller = createCaller(await createContext(event));

  try {
    const page = await caller.getPage({ slug });
    return { page };
  } catch (e) {
    console.error(`Error fetching page with slug ${slug}:`, e);
    throw error(404, `Page not found: ${slug}`);
  }
};