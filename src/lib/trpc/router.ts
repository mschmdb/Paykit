import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { fetchFromPayload } from '$lib/payload';

export const t = initTRPC.context<Context>().create();

export const router = t.router({
  loadPages: t.procedure.query(async () => {
    try {
      const pages = await fetchFromPayload('pages');
      if (!pages || !pages.docs) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No pages found',
        });
      }
      return pages;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch pages',
      });
    }
  }),

  getPage: t.procedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
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

    loadPosts: t.procedure.query(async () => {
        try {
          const posts = await fetchFromPayload('posts');
          if (!posts || !posts.docs) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'No posts found',
            });
          }
          return posts;
        } catch (error) {
          console.error('Error fetching posts:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch posts',
          });
        }
      }),
    
      getPost: t.procedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
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