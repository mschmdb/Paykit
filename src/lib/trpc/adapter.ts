import type { RequestEvent } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from './server';
import { createContext } from './context';

export const handle = createTRPCHandle({ router, createContext });