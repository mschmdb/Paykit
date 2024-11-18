<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
  import PageContent from '$lib/components/PageComponent.svelte';
  import type { PageServerData } from './$types';

  let { data } = $props<{ data: PageServerData }>();
  let posts = $state(data.posts.docs);
  $inspect(posts);

  const blogData = {
    id: 0,
    title: "Blog",
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Whatever you want here.' }]
          },
          {
            type: 'quote',
            children: [{ 
              text: '"This is some clever quote that will make you think about life and stuff. Maybe you will think about it for a while and then you will go on with your life. Or maybe you will think about it for a long time and it will change absolutely nothing. Who knows?"' 
            }]
          },
          {
            type: 'paragraph',
            children: [{ text: '— Matze Schmidbauer' }]
          }
        ]
      }
    },
    meta: {
      title: "Journal | AFAIK.FYI",
      description: "Read our latest journal entries",
      image: null
    },
    slug: "blog",
    posts: posts
  };
</script>

<PageContent data={blogData} type="blog" />