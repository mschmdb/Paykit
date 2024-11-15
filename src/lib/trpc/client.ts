import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { Router } from './router';
import { httpBatchLink } from '@trpc/client';

let browserClient: ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit) {
  const url = typeof window === 'undefined' ? `${init?.url}/api/trpc` : '/api/trpc';
  
  const client = createTRPCClient<Router>({
    links: [
      httpBatchLink({
        url,
      }),
    ],
    ...init,
  });

  if (typeof window !== 'undefined' && !browserClient) {
    browserClient = client;
  }

  return client;
}