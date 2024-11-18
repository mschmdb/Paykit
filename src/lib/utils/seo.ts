import type { PageData } from '../../routes/$types';
import { languageTag } from '$lib/paraglide/runtime';
import { PUBLIC_BASE_URL, PUBLIC_SITE_NAME } from '$env/static/public';

const SITE_NAME = PUBLIC_SITE_NAME;
const BASE_URL = PUBLIC_BASE_URL
const language = languageTag();

export function generateSEOData(data: PageData, type: 'page' | 'post' | 'blog' | 'article' | 'website') {
    // Extract title
    const title = type === 'post' 
        ? `${data.title} | Blog` 
        : data.title;
    
    const fullTitle = `${title} | ${SITE_NAME}`;

    // Extract description from meta or content
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

    // Construct the absolute URL
    const path = type === 'post' ? `/blog/${data.slug}` : `/${data.slug}`;
    const url = `${BASE_URL}/${language}${path}`;

    // Get image URL
    const imageUrl = data.meta?.image?.url || '';

    interface SEOData {
        title: string;
        description: string;
        url: string;
        imageUrl: string;
        siteName: string;
        type: 'article' | 'website';
        publishedTime: string;
        authors: string[];
    }

    return {
        title: fullTitle,
        description,
        url,
        imageUrl,
        siteName: SITE_NAME,
        type: type === 'post' ? 'article' : 'website',
        publishedTime: data.publishedAt || '',
        authors: data.populatedAuthors?.map((author: { name: string }) => author.name) || []
    } as SEOData;
}