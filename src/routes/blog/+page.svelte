<!-- src/routes/blog/+page.svelte -->

<script lang="ts">
    import type { PageServerData } from './$types';
  
    let { data } = $props<{ data: PageServerData }>();
    let posts = $state(data.posts.docs);
    $inspect(posts);
  </script>
  
  <svelte:head>
    <title>Blog | Your Site Name</title>
    <meta name="description" content="Read our latest blog posts" />
  </svelte:head>
  
  <div class="max-w-7xl mx-auto py-8">
    <h1 class="text-4xl font-bold mb-6">Blog Posts</h1>
  
    {#if posts.length > 0}
      <ul class="space-y-4">
        {#each posts as post}
          <li class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold mb-2">
              <a href="/blog/{post.slug}" class="text-blue-600 hover:underline">{post.title}</a>
            </h2>
            {#if post.publishedDate}
              <p class="text-sm text-gray-600 mb-2">Published on: {new Date(post.publishedDate).toLocaleDateString()}</p>
            {/if}
            {#if post.excerpt}
              <p class="text-gray-700">{post.excerpt}</p>
            {/if}
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-600">No blog posts found.</p>
    {/if}
  </div>