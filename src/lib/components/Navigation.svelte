<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import {Menu} from 'lucide-svelte'
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { PUBLIC_SITE_NAME } from '$env/static/public';

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

	$effect(() => {
		header = header;
	});
</script>

<nav class="pt-4" aria-label="Main navigation">
	<div class="mx-auto">
		<div class="flex h-16 items-center justify-between">
			<div class="flex flex-shrink-0 items-center">
				<a href="/" class="font-sans font-bold text-4xl leading-none text-black dark:text-white">{PUBLIC_SITE_NAME}</a>
			</div>
			<div class="hidden items-center space-x-4 sm:flex">
				{#each header.navItems as item (item.id)}
					<a
						href={getHref(item)}
						class="text-base transition-colors hover:text-foreground"
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
					<span class="sr-only">{m.next_long_niklas_kiss}</span>
				</Button>
			</div>
			<div class="flex items-center sm:hidden">
				<button
					type="button"
					class="hover:text-foreground"
					aria-controls="mobile-menu"
					aria-expanded={isOpen}
					onclick={toggleMenu}
				>
					<span class="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
					<Menu size={40}></Menu>
				</button>
			</div>
		</div>
		<div class="mx-auto p-[0.5px] bg-gradient-to-r from-sky-400 via-lime-900 to-red-500 rounded"></div>
	</div>

	{#if !isLargeScreen && isOpen}
		<div
			id="mobile-menu"
			class="border-t border-border sm:hidden"
			aria-labelledby="mobile-menu-button"
			transition:slide
		>
			<div class="space-y-1 px-4 py-4 text-right">
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
						<span class="sr-only">{m.next_long_niklas_kiss()}</span>
					</Button>
				</div>
			</div>
		</div>
	{/if}
</nav>