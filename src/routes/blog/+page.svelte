<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
	import PageContent from '$lib/components/PageComponent.svelte';
	import type { PageServerData } from './$types';
	import { languageTag } from '$lib/paraglide/runtime';

	let { data } = $props<{ data: PageServerData }>();
	let posts = $state(data.posts.docs);

	$effect(() => {
		posts = data.posts.docs;
	});
</script>

<PageContent data={posts}  type="blog" />
