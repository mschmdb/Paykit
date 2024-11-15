<script lang="ts">
  import Content from '$lib/blocks/Content.svelte';
  import MediaBlock from '$lib/blocks/MediaBlock.svelte';
  import type { PageServerData } from './$types';

  let { data } = $props<{ data: PageServerData }>();
  let homePage = $state(data.pages.docs.find((page: { slug: string }) => page.slug === 'home'));
  $inspect(homePage);
</script>

<svelte:head>
  <title>{homePage.title} | Your Site Name</title>
  <meta name="description" content={homePage.meta?.description || 'Welcome to our website'} />
</svelte:head>

<article class="max-w-7xl mx-auto py-8">
  <h1 class="text-4xl font-bold mb-6">{homePage.title}</h1>

  {#if homePage.layout && Array.isArray(homePage.layout)}
    {#each homePage.layout as block (block.id)}
      {#if block.blockType === 'content'}
        <Content {block} />
      {:else if block.blockType === 'mediaBlock'}
        <MediaBlock
          position={block.position}
          media={block.media}
          enableGutter={true}
          className="my-8"
        />
      {/if}
    {/each}
  {:else}
    <p class="text-gray-600">No content available for the home page.</p>
  {/if}
</article>