import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { Router } from './router';
import { httpBatchLink } from '@trpc/client';

let browserClient: ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit) {
  const isBrowser = typeof window !== 'undefined';
  const url = isBrowser ? '/api/trpc' : `${init?.url}/api/trpc`;
  
  const client = createTRPCClient<Router>({
    links: [
      httpBatchLink({
        url,
      }),
    ],
  });

  if (isBrowser && !browserClient) {
    browserClient = client;
  }

  return client;
}