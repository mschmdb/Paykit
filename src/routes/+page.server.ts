import { createContext } from '$lib/trpc/context';
import { createCaller } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const caller = createCaller(await createContext(event));

  return {
    pages: await caller.loadPages(),
    posts: await caller.loadPosts(),
  };
};