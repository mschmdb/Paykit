<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
  import PageContent from '$lib/components/PageComponent.svelte';
  import type { PageServerData } from './$types';

  let { data } = $props<{ data: PageServerData }>();
  let posts = $state(data.posts.docs);
  $inspect(posts);

  const blogData = {
    id: 0,
    title: "Journal",
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Community experiences' }]
          },
          {
            type: 'quote',
            children: [{ 
              text: '"Minimalism is not a style, it is an attitude, a way of being. Its fundamental reaction against noise, visual noise, disorder, vulgarity. Minimalism is the pursuit of the essence of things, not the appearance."' 
            }]
          },
          {
            type: 'paragraph',
            children: [{ text: '— Claudio Silvestrin' }]
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