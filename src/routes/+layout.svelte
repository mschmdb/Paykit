<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Navigation from '$lib/components/Navigation.svelte';
	import { page } from '$app/stores';
	import type { LayoutServerData } from './$types';
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

<ParaglideJS {i18n}>
	<div class="flex min-h-screen flex-col">
		<Navigation {pages} />
		{#key key}
			<main class="flex-grow">
				{@render children()}
			</main>
		{/key}
		<footer class="mt-8 bg-gray-100">
			<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<p class="text-center text-sm text-gray-500">
					© {new Date().getFullYear()} Your Site Name. All rights reserved.
				</p>
			</div>
		</footer>
	</div>
</ParaglideJS>
