import type { RequestEvent } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime';

export async function createContext(event: RequestEvent) {
  return {
    event,
    lang: languageTag()
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;