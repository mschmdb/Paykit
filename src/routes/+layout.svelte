<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { languageTag } from '$lib/paraglide/runtime';
	import Navigation from '$lib/components/Navigation.svelte';
	import type { LayoutData } from './$types';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { data, children } = $props<{ data: LayoutData; children: any }>();
	$effect(() => {
		const currentLang = languageTag();
		data = data
	});
</script>

<ModeWatcher />
<ParaglideJS {i18n}>
	<div class="container mx-auto overflow-y-auto">
		<div class="flex min-h-screen min-w-full flex-col md:min-w-[100%]">
			<Navigation header={data.header.header} />
			<main class="flex-grow">
				{@render children()}
			</main>
			<Footer footer={data.footer.footer} />
		</div>
	</div>
</ParaglideJS>
