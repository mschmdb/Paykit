<script lang="ts">
    import Content from '$lib/blocks/Content.svelte';
    import type { PageServerData } from './$types';
  
    let { data } = $props<{ data: PageServerData }>();
    let post = $state(data.post);
    $inspect(post);
  
    function transformPostContentToContentBlock(postContent: any) {
      return {
        id: 'post-content',
        blockName: 'Post Content',
        blockType: 'content',
        columns: [
          {
            id: 'post-content-column',
            size: 'full',
            richText: postContent,
            enableLink: false,
            link: null
          }
        ]
      };
    }
  
    let contentBlock = $derived(transformPostContentToContentBlock(post.content));
  </script>
  
  <svelte:head>
    <title>{post.title} | Blog | Your Site Name</title>
    <meta name="description" content={post.meta?.description || `Read about ${post.title}`} />
    {#if post.meta?.title}
      <meta property="og:title" content={post.meta.title} />
    {/if}
    {#if post.meta?.description}
      <meta property="og:description" content={post.meta.description} />
    {/if}
    {#if post.meta?.image}
      <meta property="og:image" content={post.meta.image.url} />
    {/if}
  </svelte:head>
  
  <article class="max-w-7xl mx-auto py-8">
    <h1 class="text-4xl font-bold mb-4">{post.title}</h1>
    
    {#if post.publishedAt}
      <p class="text-sm text-gray-600 mb-6">Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
    {/if}
  
    {#if post.populatedAuthors && post.populatedAuthors.length > 0}
      <p class="text-sm text-gray-600 mb-6">
        By: {post.populatedAuthors.map(author => author.name).join(', ')}
      </p>
    {/if}
  
    {#if post.content}
      <Content block={contentBlock} />
    {:else}
      <p class="text-gray-600">No content available for this blog post.</p>
    {/if}
  
    {#if post.categories && post.categories.length > 0}
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Categories:</h2>
        <ul class="flex flex-wrap gap-2">
          {#each post.categories as category}
            <li class="bg-gray-200 px-3 py-1 rounded-full text-sm">{category}</li>
          {/each}
        </ul>
      </div>
    {/if}
  
    {#if post.relatedPosts && post.relatedPosts.length > 0}
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Related Posts</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each post.relatedPosts as relatedPost}
            <li class="bg-white p-4 rounded-lg shadow">
              <a href="/blog/{relatedPost.slug}" class="text-blue-600 hover:underline">
                <h3 class="text-lg font-semibold">{relatedPost.title}</h3>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </article>