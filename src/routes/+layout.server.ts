import { createContext } from '$lib/trpc/context';
import { createCaller } from '$lib/trpc/router';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const caller = createCaller(await createContext(event));

  return {
    pages: await caller.loadPages(),
  };
};