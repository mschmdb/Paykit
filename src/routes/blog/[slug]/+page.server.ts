// routes/blog/[slug]/+page.server.ts
import { loadPost } from '$lib/utils/page-loader';
export const load = loadPost;