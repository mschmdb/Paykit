// routes/blog/[slug]/+page.server.ts
import type { ServerLoad } from '@sveltejs/kit';
import { loadPost } from '$lib/utils/page-loader';
import {withISR} from '$lib/utils/with-isr';

const pageLoad: ServerLoad = loadPost;

const { load, config } = withISR(pageLoad);

export { load, config };