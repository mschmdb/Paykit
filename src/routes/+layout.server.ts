import { loadPages } from '$lib/utils/page-loader';
import { loadHeader } from '$lib/utils/page-loader';
import { loadFooter } from '$lib/utils/page-loader';

export const load = async (event) => {
    event.depends("paraglide:lang");
    const pages = await loadPages(event);
    const header = await loadHeader(event);
    const footer = await loadFooter(event);
    return {
        ...pages,
        header,
        footer
    };
};