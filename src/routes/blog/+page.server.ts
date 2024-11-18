// src/routes/blog/+page.server.ts

import type { ServerLoad } from '@sveltejs/kit';
import { loadPosts } from '$lib/utils/page-loader';
import { withISR } from '$lib/utils/with-isr';
import { languageTag } from '$lib/paraglide/runtime';

const pageLoad: ServerLoad = async (event) => {
    event.depends("paraglide:lang");
    const lang = languageTag();
    const result = await loadPosts(event, lang);
    return result;
};

const { load, config } = withISR(pageLoad);

export { load, config };