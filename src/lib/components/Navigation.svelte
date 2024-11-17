<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';

	interface NavItem {
		id: string;
		link: {
			type: string;
			newTab: boolean | null;
			reference?: {
				relationTo: string;
				value: {
					slug: string;
				};
			};
			url: string | null;
			label: string;
		};
	}

	let { header } = $props<{ header: { navItems: NavItem[] } }>();
	$inspect('header', header);

	let isOpen = $state(false);
	let isLargeScreen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	function getHref(item: NavItem): string {
		if (item.link.type === 'reference' && item.link.reference) {
			return `/${item.link.reference.value.slug}`;
		}
		return item.link.url || '#';
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
				{#each header.navItems as item (item.id)}
					<a
						href={getHref(item)}
						class="text-sm text-muted-foreground transition-colors hover:text-foreground"
						target={item.link.newTab ? "_blank" : undefined}
						rel={item.link.newTab ? "noopener noreferrer" : undefined}
					>
						{item.link.label}
					</a>
				{/each}
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
				{#each header.navItems as item (item.id)}
					<a
						href={getHref(item)}
						class="block py-2 text-base text-muted-foreground hover:text-foreground"
						target={item.link.newTab ? "_blank" : undefined}
						rel={item.link.newTab ? "noopener noreferrer" : undefined}
						onclick={closeMenu}
					>
						{item.link.label}
					</a>
				{/each}
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