<!-- routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  import PageContent from '$lib/components/PageComponent.svelte';
  import type { PageServerData } from './$types';

  let { data } = $props<{ data: PageServerData }>();
</script>

<PageContent data={data.post} type="post" />