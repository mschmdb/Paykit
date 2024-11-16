<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';

	let { pages } = $props<{ pages: Array<{ title: string; slug: string }> }>();

	let isOpen = $state(false);
	let isLargeScreen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(min-width: 640px)');
		isLargeScreen = mediaQuery.matches;

		const handleResize = (e: MediaQueryListEvent) => {
			isLargeScreen = e.matches;
			if (isLargeScreen) closeMenu();
		};

		mediaQuery.addEventListener('change', handleResize);

		return () => {
			mediaQuery.removeEventListener('change', handleResize);
		};
	});
</script>

<nav class="border-b border-border pt-4" aria-label="Main navigation">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex flex-shrink-0 items-center pt-2">
				<a href="/" class="font-['CooperHewitt'] text-4xl leading-none text-marlboro">AFAIK.FYI</a>
			</div>
			<div class="hidden items-center space-x-4 sm:flex">
				<!-- {#each pages as page}
					<a
						href="/{page.slug}"
						class="text-sm text-muted-foreground transition-colors hover:text-foreground"
						aria-current={page.slug === '' ? 'page' : undefined}
					>
						{page.title}
					</a>
				{/each} -->
        <a
					href="/"
					class="text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					Home
				</a>
				<a
					href="/blog"
					class="text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					Blog
				</a>
				<Button onclick={toggleMode} variant="outline" size="icon">
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
			<div class="flex items-center sm:hidden">
				<button
					type="button"
					class="text-muted-foreground hover:text-foreground"
					aria-controls="mobile-menu"
					aria-expanded={isOpen}
					onclick={toggleMenu}
				>
					<span class="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
					MENU
				</button>
			</div>
		</div>
	</div>

	{#if !isLargeScreen && isOpen}
		<div
			id="mobile-menu"
			class="border-t border-border sm:hidden"
			aria-labelledby="mobile-menu-button"
			transition:slide
		>
			<div class="space-y-1 px-4 py-4">
				<!-- {#each pages as page}
					<a
						href="/{page.slug}"
						class="block py-2 text-base text-muted-foreground hover:text-foreground"
						aria-current={page.slug === '' ? 'page' : undefined}
						onclick={closeMenu}
					>
						{page.title}
					</a>
				{/each} -->
        <a
					href="/"
					class="text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					Home
				</a>
				<a
					href="/blog"
					class="block py-2 text-base text-muted-foreground hover:text-foreground"
					onclick={closeMenu}
				>
					Blog
				</a>
				<div class="py-2">
					<Button onclick={toggleMode} variant="outline" size="icon">
						<Sun
							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						/>
						<Moon
							class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
				</div>
			</div>
		</div>
	{/if}
</nav>
