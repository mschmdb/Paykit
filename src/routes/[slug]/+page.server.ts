// routes/[slug]/+page.server.ts
import type { ServerLoad } from '@sveltejs/kit';
import { loadPage } from '$lib/utils/page-loader';
import {withISR} from '$lib/utils/with-isr';

const pageLoad: ServerLoad = loadPage;

const { load, config } = withISR(pageLoad);

export { load, config };