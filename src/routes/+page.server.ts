// routes/+page.server.ts
import type { ServerLoad } from '@sveltejs/kit';
import { loadPage } from '$lib/utils/page-loader';
import { withISR } from '$lib/utils/with-isr';
import { languageTag } from '$lib/paraglide/runtime';

const pageLoad: ServerLoad = async (event) => {
    event.depends("paraglide:lang");
    const lang = languageTag();
    return loadPage(event, lang);
};

const { load, config } = withISR(pageLoad);

export { load, config };