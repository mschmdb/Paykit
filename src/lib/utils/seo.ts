import type { PageData } from '../../routes/$types';
import { languageTag } from '$lib/paraglide/runtime';
import { PUBLIC_BASE_URL, PUBLIC_SITE_NAME } from '$env/static/public';
import * as m from '$lib/paraglide/messages';

const SITE_NAME = PUBLIC_SITE_NAME;
const BASE_URL = PUBLIC_BASE_URL
const language = languageTag();

console.log('language in seo.ts', language);

export function generateSEOData(data: PageData, type: 'page' | 'post' | 'blog' | 'article' | 'website', lang:string = language) {
    if (type === 'blog') {
        // Hardcoded SEO data for the /blog route
        return {
            title: `Blog | ${SITE_NAME}`,
            description: m.game_strong_newt_twist(),
            url: `${BASE_URL}/${lang}/blog`,
            imageUrl: "", // Add a default blog image URL if available
            siteName: SITE_NAME,
            type: 'website',
            publishedTime: '',
            authors: []
        };
    }

    // Existing logic for other routes
    const title = type === 'post' 
        ? `${data.title} | Blog` 
        : data.title;
    
    const fullTitle = `${title} | ${SITE_NAME}`;

    let description = data.meta?.description || '';
    if (!description && data.content?.root?.children?.[0]) {
        const firstBlock = data.content.root.children[0];
        if (firstBlock.type === 'paragraph' && firstBlock.children?.[0]?.text) {
            description = firstBlock.children[0].text.substring(0, 160).trim() + '...';
        }
    }
    if (!description) {
        description = `Read about ${data.title}`;
    }

    const path = type === 'post' ? `/blog/${data.slug}` : `/${data.slug}`;
    const url = `${BASE_URL}/${lang}${path}`;

    const imageUrl = data.meta?.image?.url || '';

    return {
        title: fullTitle,
        description,
        url,
        imageUrl,
        siteName: SITE_NAME,
        type: type === 'post' ? 'article' : 'website',
        publishedTime: data.publishedAt || '',
        authors: data.populatedAuthors?.map((author: { name: string }) => author.name) || []
    };
}