<script lang="ts">
	import { onMount } from 'svelte';
	import { createHighlighter } from 'shiki';
	import { fade } from 'svelte/transition';
	import { Clipboard, Check } from 'lucide-svelte';

	export let code: string;
	export let language: string;

	let highlightedCode = '';
	let copied = false;

	onMount(async () => {
		const highlighter = await createHighlighter({
			themes: ['nord'],
			langs: [language],
		});

		highlightedCode = highlighter.codeToHtml(code, { lang: language, theme: 'nord' });
	});

	function copyCode() {
		navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="my-4 rounded-md overflow-hidden relative">
	{#if highlightedCode}
		{@html highlightedCode}
	{:else}
		<pre class="p-4 bg-gray-800 text-white"><code>{code}</code></pre>
	{/if}
	<button
		on:click={copyCode}
		class="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors duration-200"
		aria-label="Copy code"
	>
		{#if copied}
			<span transition:fade><Check size={16} /></span>
		{:else}
			<Clipboard size={16} />
		{/if}
	</button>
</div>

<style>
	:global(pre) {
		padding: 1rem;
		padding-top: 2rem;
	}
</style>

