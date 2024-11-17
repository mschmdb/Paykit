<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Navigation from '$lib/components/Navigation.svelte';
	import { page } from '$app/stores';
	import type { LayoutServerData } from './$types';
	import { ModeWatcher } from "mode-watcher";
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { data, children } = $props<{ data: LayoutServerData; children: any }>();
	let pages = $state(data.pages.docs);
	let key = $state<string | null>(null);
	$effect(() => {
		pages = data.pages.docs;
		key = $page.params.slug;
	});
	$inspect('pages', $page);
</script>
<ModeWatcher />
<ParaglideJS {i18n}>
	<div class="flex min-h-screen flex-col">
		<Navigation header={data.header.header} />
		{#key key}
			<main class="flex-grow">
				{@render children()}
			</main>
		{/key}
		<Footer />
	</div>
</ParaglideJS>
