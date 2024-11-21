<script lang="ts">
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';
	import { i18n } from '$lib/i18n.js';
	import { page } from '$app/stores';

	// Provide a fallback for Storybook environment
	$: currentPath = $page?.url?.pathname ?? '/';
</script>

<div class="my-auto flex items-center space-x-1">
	{#each availableLanguageTags as lang, i}
		<a
			href={i18n.route(currentPath)}
			hreflang={lang}
			aria-current={lang === languageTag() ? 'page' : undefined}
			aria-label={m.suave_main_pug_trip()}
			class="my-auto focus-visible:outline-none focus-visible:ring-2"
		>
			{lang.toUpperCase()}
		</a>
		<!-- Add a separator ("/") if it's not the last language -->
		{#if i < availableLanguageTags.length - 1}
			<span class="text-primary"> / </span>
		{/if}
	{/each}
</div>