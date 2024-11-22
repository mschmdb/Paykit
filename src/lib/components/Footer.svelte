<script lang="ts">
	import { PUBLIC_BSKY_HANDLE, PUBLIC_SHOW_PAYKIT_BUTTON } from '$env/static/public';
	import LangSwitcher from './LangSwitcher.svelte';

	interface NavItem {
		id: string;
		link: {
			type: string;
			newTab: boolean | null;
			reference?: {
				relationTo: string;
				value: {
					id: number;
					title: string;
					slug: string;
				};
			};
			url?: string | null;
			label: string;
		};
	}

	interface Footer {
		id: number;
		navItems: NavItem[];
		updatedAt: string;
		createdAt: string | null;
		globalType: string;
	}

	let { footer } = $props<{ footer: Footer }>();

	// Watch and set `footer` as reactive
	$effect(() => {
		footer = footer;
	});
	$inspect('Footer', footer);
	// Helper function to determine href
	function getNavItemHref(navItem: NavItem): string {
		if (!navItem?.link) {
			console.warn('Invalid navItem detected (missing link):', navItem);
			return '#';
		}

		if (navItem.link.type === 'reference' && navItem.link.reference?.value?.slug) {
			return `/${navItem.link.reference.value.slug}`;
		}

		if (navItem.link.url) {
			return navItem.link.url;
		}

		console.warn('NavItem has no valid href:', navItem);
		return '#';
	}
</script>

<footer class="mt-20">
	<div
		class="mx-auto rounded bg-gradient-to-r from-sky-400 via-lime-900 to-red-500 p-[0.5px]"
	></div>
	<div class="mx-auto flex max-w-7xl justify-end px-4 py-8">
		<div class="flex flex-col items-end gap-4 align-middle text-sm sm:flex-row sm:gap-6">
			{#if typeof LangSwitcher !== 'undefined'}
				<LangSwitcher />
			{/if}
			{#if footer?.navItems?.length > 0}
				{#each footer.navItems as navItem}
					{#if navItem?.link}
						<a
							href={getNavItemHref(navItem)}
							class="my-auto transition-colors hover:text-foreground"
							target={navItem.link.newTab ? '_blank' : '_self'}
							rel={navItem.link.newTab ? 'noopener noreferrer' : undefined}
						>
							{navItem.link.label}
						</a>
					{:else}
						<span class="text-gray-500">Invalid link</span>
					{/if}
				{/each}
			{:else}
				<span class="text-gray-500">No links available</span>
			{/if}
			{#if PUBLIC_SHOW_PAYKIT_BUTTON}
				<a
					href="https://github.com/mtcberlin/Paykit"
					target="_blank"
					class="rounded-md px-0 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					aria-label="Go to Paykit Github repository"
				>
					<img
						src="/img/PayKitLogo.svg"
						alt="Paykit logo"
						width="26"
						height="26"
						class="h-7 w-auto dark:invert"
					/>

				</a>
			{/if}

			{#if PUBLIC_BSKY_HANDLE}
				<a
					href="https://bsky.app/profile/{PUBLIC_BSKY_HANDLE}"
					class="bluesky-flutter"
					aria-label="Bluesky profile"
				>
					<svg
						id="flutterby"
						class="bluesky-flutter"
						viewBox="0 0 566 500"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<path
								id="wing"
								fill="currentColor"
								d="M 123.244 35.008 C 188.248 83.809 283.836 176.879 283.836 235.857 C 283.836 316.899 283.879 235.845 283.836 376.038 C 283.889 375.995 282.67 376.544 280.212 383.758 C 266.806 423.111 214.487 576.685 94.841 453.913 C 31.843 389.269 61.013 324.625 175.682 305.108 C 110.08 316.274 36.332 297.827 16.093 225.504 C 10.271 204.699 0.343 76.56 0.343 59.246 C 0.343 -27.451 76.342 -0.206 123.244 35.008 Z"
							/>
						</defs>
						<use xlink:href="#wing" class="left" />
						<use xlink:href="#wing" class="right" />
					</svg>
				</a>
			{/if}
		</div>
	</div>
</footer>
