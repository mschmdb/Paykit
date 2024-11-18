<script lang="ts">
	import { PUBLIC_BSKY_HANDLE } from '$env/static/public';

	interface FooterLink {
		href: string;
		label: string;
		target?: string;
	}

	const footerLinks: FooterLink[] = [
		{ href: '/imprint', label: 'imprint' },
		{ href: '/privacy', label: 'privacy' }
	];
</script>

<footer class="mt-20 border-t border-border">
	<div class="mx-auto flex max-w-7xl justify-end px-4 py-8">
		<div class="flex flex-col items-end gap-4 text-sm sm:flex-row sm:gap-6 align-middle">
			{#each footerLinks as link}
				<a
					href={link.href}
					class="transition-colors hover:text-foreground my-auto"
					target={link.target || '_self'}
					rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
				>
					{link.label}
				</a>
			{/each}
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
