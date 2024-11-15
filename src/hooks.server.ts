import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { i18n } from '$lib/i18n';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from '$lib/trpc/router';
import { createContext } from '$lib/trpc/context';

const handleParaglide: Handle = i18n.handle();
const handleTRPC = createTRPCHandle({ router, createContext });

export const handle: Handle = sequence(handleParaglide, handleTRPC);