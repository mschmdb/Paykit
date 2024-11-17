import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from './router';
import { createContext } from './context';

export const handle = createTRPCHandle({ router, createContext });