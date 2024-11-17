// src/routes/blog/+page.server.ts

import type { ServerLoad } from '@sveltejs/kit';
import { loadPosts } from '$lib/utils/page-loader';
import {withISR} from '$lib/utils/with-isr';

const pageLoad: ServerLoad = loadPosts;

const { load, config } = withISR(pageLoad);

export { load, config };