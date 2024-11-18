import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { fetchFromPayload } from '$lib/payload';
import NodeCache from 'node-cache';
import { CACHE_QUERIES } from '$env/static/private';

// Initialize the cache
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // 5 minutes TTL, check every minute

export const t = initTRPC.context<Context>().create();

const isCacheEnabled = CACHE_QUERIES === 'TRUE';

// Helper function to wrap queries with conditional caching
const conditionalCachedProcedure = <T>(
  keyPrefix: string,
  ttl: number,
  fetchFn: (ctx: Context, input: { lang?: string }) => Promise<T>
) => {
  return t.procedure.input(z.object({ lang: z.string().optional() })).query(async ({ ctx, input }) => {
    const cacheKey = `${keyPrefix}-${input.lang || ctx.lang}`; // Include language in cache key
    
    if (isCacheEnabled) {
      const cachedData = cache.get<T>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    const data = await fetchFn(ctx, input);

    if (isCacheEnabled) {
      cache.set(cacheKey, data, ttl);
    }

    return data;
  });
};

// Helper function for procedures with dynamic cache keys
const conditionalCachedDynamicProcedure = <T>(
  keyPrefix: string,
  ttl: number,
  fetchFn: (input: { slug: string; lang?: string }, ctx: Context) => Promise<T>
) => {
  return t.procedure.input(z.object({ slug: z.string(), lang: z.string().optional() })).query(async ({ input, ctx }) => {
    const cacheKey = `${keyPrefix}-${input.slug}-${input.lang || ctx.lang}`;

    if (isCacheEnabled) {
      const cachedData = cache.get<T>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    const data = await fetchFn(input, ctx);

    if (isCacheEnabled) {
      cache.set(cacheKey, data, ttl);
    }

    return data;
  });
};

export const router = t.router({
  loadHeader: conditionalCachedProcedure('header', 300, async (ctx, input) => {
    const header = await fetchFromPayload('globals/header', { locale: input.lang || ctx.lang });
    if (!header) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Header not found',
      });
    }
    return header;
  }),

  loadFooter: conditionalCachedProcedure('footer', 300, async (ctx, input) => {
    const footer = await fetchFromPayload('globals/footer', { locale: input.lang || ctx.lang });
    if (!footer) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Footer not found',
      });
    }
    return footer;
  }),

  loadPages: conditionalCachedProcedure('pages', 300, async (ctx, input) => {
    const pages = await fetchFromPayload('pages', { locale: input.lang || ctx.lang });
    if (!pages || !pages.docs) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No pages found',
      });
    }
    return pages;
  }),

  getPage: conditionalCachedDynamicProcedure('page', 300, async (input, ctx) => {
    try {
      const page = await fetchFromPayload('pages', {
        'where[slug][equals]': input.slug,
        locale: input.lang || ctx.lang
      });
      if (!page || !page.docs || page.docs.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Page not found',
        });
      }
      return page.docs[0];
    } catch (error) {
      console.error(`Error fetching page ${input.slug}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch page',
      });
    }
  }),

  loadPosts: conditionalCachedProcedure('posts', 300, async (ctx, input) => {
    const lang = input.lang || ctx.lang;
   
    const posts = await fetchFromPayload('posts', { locale: lang });
    if (!posts || !posts.docs) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No posts found',
      });
    }
    
    return posts;
  }),

  getPost: conditionalCachedDynamicProcedure('post', 300, async (input, ctx) => {
    try {
      const post = await fetchFromPayload('posts', {
        'where[slug][equals]': input.slug,
        locale: input.lang || ctx.lang
      });
      if (!post || !post.docs || post.docs.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }
      return post.docs[0];
    } catch (error) {
      console.error(`Error fetching post ${input.slug}:`, error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch post',
      });
    }
  }),
});

export const createCaller = t.createCallerFactory(router);

export type Router = typeof router;