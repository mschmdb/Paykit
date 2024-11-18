// routes/[slug]/+page.server.ts
import type { ServerLoad } from '@sveltejs/kit';
import { loadPage } from '$lib/utils/page-loader';
import { withISR } from '$lib/utils/with-isr';
import { languageTag } from '$lib/paraglide/runtime';

const pageLoad: ServerLoad = async (event) => {
    // This tells SvelteKit to re-run this function whenever the language changes
    event.depends("paraglide:lang");

    const lang = languageTag(); // Get the current language
    return loadPage(event, lang);
};

const { load, config } = withISR(pageLoad);

export { load, config };