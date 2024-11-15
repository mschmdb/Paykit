<script lang="ts">
    import Content from '$lib/blocks/Content.svelte';
    import type { PageServerData } from './$types';
  
    let { data } = $props<{ data: PageServerData }>();
    let page = $state(data.page);
    $inspect(page);
  </script>
  
  <svelte:head>
    <title>{page.title} | Your Site Name</title>
  </svelte:head>
  
  <article class="max-w-7xl mx-auto py-8">
    <h1 class="text-4xl font-bold mb-6">{page.title}</h1>
  
    {#if page.layout && Array.isArray(page.layout)}
      {#each page.layout as block (block.id)}
        {#if block.blockType === 'content'}
          <Content {block} />
        {/if}
      {/each}
    {:else}
      <p class="text-gray-600">No content available for this page.</p>
    {/if}
  </article>