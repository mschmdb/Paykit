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
const conditionalCachedProcedure = <T>(key: string, ttl: number, fetchFn: () => Promise<T>) => {
  return t.procedure.query(async () => {
    if (isCacheEnabled) {
      const cachedData = cache.get<T>(key);
      if (cachedData) {
        return cachedData;
      }
    }

    const data = await fetchFn();
    
    if (isCacheEnabled) {
      cache.set(key, data, ttl);
    }
    
    return data;
  });
};

// Helper function for procedures with dynamic cache keys
const conditionalCachedDynamicProcedure = <T>(
  keyPrefix: string,
  ttl: number,
  fetchFn: (input: any) => Promise<T>
) => {
  return t.procedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    const cacheKey = `${keyPrefix}-${input.slug}`;

    if (isCacheEnabled) {
      const cachedData = cache.get<T>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    const data = await fetchFn(input);

    if (isCacheEnabled) {
      cache.set(cacheKey, data, ttl);
    }

    return data;
  });
};

export const router = t.router({
  loadHeader: conditionalCachedProcedure('header', 300, async () => {
    const header = await fetchFromPayload('globals/header');
    if (!header) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Header not found',
      });
    }
    return header;
  }),

  loadPages: conditionalCachedProcedure('pages', 300, async () => {
    const pages = await fetchFromPayload('pages');
    if (!pages || !pages.docs) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No pages found',
      });
    }
    return pages;
  }),

  getPage: conditionalCachedDynamicProcedure('page', 300, async (input) => {
    try {
      const page = await fetchFromPayload('pages', {
        'where[slug][equals]': input.slug,
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

  loadPosts: conditionalCachedProcedure('posts', 300, async () => {
    const posts = await fetchFromPayload('posts');
    if (!posts || !posts.docs) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No posts found',
      });
    }
    return posts;
  }),

  getPost: conditionalCachedDynamicProcedure('post', 300, async (input) => {
    try {
      const post = await fetchFromPayload('posts', {
        'where[slug][equals]': input.slug,
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