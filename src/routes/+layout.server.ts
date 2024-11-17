import { loadPages } from '$lib/utils/page-loader';
import { loadHeader } from '$lib/utils/page-loader';

export const load = async (event) => {
    const pages = await loadPages(event);
    const header = await loadHeader(event);
    return {
        ...pages,
        header
    };
};