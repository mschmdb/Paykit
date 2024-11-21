<script lang="ts">
	import { onMount } from 'svelte';
	import { createHighlighter } from 'shiki'
	import { any } from 'zod';

	export let code: string;
	export let language: string;

	let highlightedCode = '';

	onMount(async () => {
		
  const highlighter = await createHighlighter({
    themes: ['nord'],
	langs: [language],
  });

	highlightedCode = highlighter.codeToHtml(code, { lang: language, theme: 'nord' });
	});
</script>

<div class="my-4 rounded-md overflow-hidden">
	{#if highlightedCode}
		{@html highlightedCode}
	{:else}
		<pre class="p-4 bg-gray-800 text-white"><code>{code}</code></pre>
	{/if}
</div>

<style>
	
</style>