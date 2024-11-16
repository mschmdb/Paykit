<script lang="ts">
    import { browser } from '$app/environment';
    import Content from '$lib/blocks/Content.svelte';
    import MediaBlock from '$lib/blocks/MediaBlock.svelte';
  
    interface Author {
      id: number;
      name: string;
    }
  
    interface Meta {
      title: string | null;
      description: string | null;
      image: any | null;
    }
  
    interface Post {
      title: string;
      slug: string;
      publishedDate?: string;
      excerpt?: string;
      author?: string;
      populatedAuthors?: Author[];
      meta?: Meta; // Added meta to Post interface
    }
  
    interface PageData {
      id: number;
      title: string;
      content: any;
      layout?: any[];
      meta: Meta;
      publishedAt?: string;
      populatedAuthors?: Author[];
      categories?: string[];
      relatedPosts?: any[];
      slug: string;
      posts?: Post[];
    }
  
    let { data, type } = $props<{ data: PageData; type: 'page' | 'post' | 'blog' }>();
    $inspect("DataInComponent", data);
  
    function transformContentToBlocks(content: any) {
      if (!content || !content.root || !content.root.children) {
        return [];
      }
  
      return content.root.children.map((child: any) => {
        if (child.type === 'block' && child.fields?.blockType === 'mediaBlock') {
          return {
            ...child.fields,
            id: child.fields.id,
          };
        } else {
          return {
            id: 'content-' + Math.random().toString(36).substr(2, 9),
            blockName: 'Rich Text Content',
            blockType: 'content',
            columns: [
              {
                id: 'column-' + Math.random().toString(36).substr(2, 9),
                size: 'full',
                richText: { root: { children: [child] } },
                enableLink: false,
                link: null
              }
            ]
          };
        }
      });
    }
  
    let contentBlocks = $derived(
      data.layout || transformContentToBlocks(data.content)
    );
  
    let pageTitle = $state('');
  
    $effect(() => {
      pageTitle = type === 'post' ? `${data.title} | Journal` : data.title;
    });
  
    function formatDate(dateString: string): string {
      const date = new Date(dateString);
      if (browser) {
        return date.toLocaleDateString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } else {
        // Fallback for server-side rendering
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
  </script>
  
  <svelte:head>
    <title>{pageTitle} | AFAIK.FYI</title>
    <meta name="description" content={data.meta?.description || `Read about ${data.title}`} />
    {#if data.meta?.title}
      <meta property="og:title" content={data.meta.title} />
    {/if}
    {#if data.meta?.description}
      <meta property="og:description" content={data.meta.description} />
    {/if}
    {#if data.meta?.image}
      <meta property="og:image" content={data.meta.image.url} />
    {/if}
  </svelte:head>
  
  <article class="max-w-3xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-normal mb-8">{data.title}</h1>
    
    {#if type === 'post'}
      {#if data.publishedAt}
        <p class="text-sm mb-6">
          {formatDate(data.publishedAt)}
        </p>
      {/if}
  
      {#if data.populatedAuthors && data.populatedAuthors.length > 0}
        <p class="text-sm mb-6">
          Words by {data.populatedAuthors.map((author: Author) => author.name).join(', ')}
        </p>
      {/if}
    {/if}
  
    {#if type === 'blog'}
      <div class="mb-12">
        <p class=" italic">
          {data.content.root.children[0].children[0].text}
        </p>
      </div>
      
      <blockquote class=" italic mb-16">
        {data.content.root.children[1].children[0].text}
        <footer class="mt-4">{data.content.root.children[2].children[0].text}</footer>
      </blockquote>
  
      <div class="space-y-4">
        {#each data.posts || [] as post}
          <a 
            href="/blog/{post.slug}" 
            class="block p-6 rounded-lg border dark:border-white/50 border-black/50 dark:hover:border-white/20 hover:border-black/20 transition-colors"
          >
            <div class="flex items-start gap-4">
              <div class="h-10 w-10 flex-shrink-0 rounded-full bg-white/10 overflow-hidden">
                <img 
                  src={post?.meta?.image?.url} 
                  alt={post.title}
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-grow">
                <h2 class="text-lg mb-1">{post.title}</h2>
                <p class="text-white/60 mb-4">{post.excerpt || ''}</p>
                <div class="flex justify-between text-sm">
                  <span>Words by {post.populatedAuthors?.[0]?.name || 'Unknown'}</span>
                  <time datetime={post.publishedAt}>
                    {post.publishedAt ? formatDate(post.publishedAt) : 'Date unknown'}
                  </time>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {:else if contentBlocks.length > 0}
      {#each contentBlocks as block (block.id)}
        {#if block.blockType === 'content'}
          <Content {block} />
        {:else if block.blockType === 'mediaBlock'}
          <MediaBlock position={block.position} media={block.media} />
        {/if}
      {/each}
    {:else}
      <p class="text-white/80">No content available.</p>
    {/if}
  
    {#if type === 'post' && data.categories && data.categories.length > 0}
      <div class="mt-12">
        <h2 class="text-lg text-white font-normal mb-4">Categories:</h2>
        <ul class="flex flex-wrap gap-2">
          {#each data.categories as category}
            <li class="border border-white/10 px-3 py-1 rounded-full text-sm text-white/60">{category.title}</li>
          {/each}
        </ul>
      </div>
    {/if}
  
    {#if type === 'post' && data.relatedPosts && data.relatedPosts.length > 0}
      <div class="mt-12">
        <h2 class="text-lg text-white font-normal mb-4">Related Posts</h2>
        <ul class="grid grid-cols-1 gap-4">
          {#each data.relatedPosts as relatedPost}
            <li class="border border-white/10 p-4 rounded-lg">
              <a href="/blog/{relatedPost.slug}" class="text-white hover:text-white/90">
                <h3 class="text-base font-normal">{relatedPost.title}</h3>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </article>