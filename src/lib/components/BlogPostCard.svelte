<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { formatDate } from '$lib/utils/date';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages.js';
	import MediaBlock from '$lib/blocks/MediaBlock.svelte';
	import { Skeleton } from "$lib/components/ui/skeleton";

	let { post } = $props<{
		slug: string;
		title: string;
		content?: {
			root: {
				children: any[];
			};
		};
		excerpt?: string;
		publishedAt?: string;
		populatedAuthors?: { name: string }[];
		meta?: { image?: { url: string; alt?: string; sizes?: any } };
	}>();

	let excerpt = $state(post.excerpt || '');
	let isLoading = $state(true);

	function generateExcerpt(content: any, maxLength: number = 150): string {
		if (!content || !content.root || !content.root.children) return '';

		let text = '';
		for (const child of content.root.children) {
			if (child.type === 'paragraph' && child.children) {
				for (const textNode of child.children) {
					if (textNode.text) {
						text += textNode.text + ' ';
						if (text.length > maxLength) break;
					}
				}
				if (text.length > maxLength) break;
			}
		}

		return text.trim().slice(0, maxLength) + (text.length > maxLength ? '...' : '');
	}

	onMount(() => {
		excerpt = generateExcerpt(post.content);
		isLoading = false;
	});
	$effect(() => {
		post = post;
		excerpt = generateExcerpt(post.content);
		isLoading = false;
	});

	const formattedDate = post.publishedAt ? formatDate(post.publishedAt) : 'Date unknown';
</script>

<div
	class="mx-auto rounded bg-gradient-to-r from-slate-100 to-slate-300 p-[0.5px] dark:from-slate-600 dark:to-slate-800"
></div>
<div class="py-2">
	<Card.Root class="transition-colors hover:bg-muted/50">
		<article class="group">
			<a
				href="/blog/{post.slug}"
				class="block rounded-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-[0.5px]"
				aria-labelledby="post-title-{post.slug}"
			>
				<div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-[2fr,3fr,2fr]">
					<div class="space-y-2">
						<Card.Title
							level={2}
							id="post-title-{post.slug}"
							class="text-xl font-semibold transition-colors group-hover:text-primary"
							><h2>{post.title}</h2></Card.Title
						>
						<time datetime={post.publishedAt} class="text-sm">
							<span class="sr-only">Published on:</span>
							{formattedDate}
						</time>
						{#if post.populatedAuthors && post.populatedAuthors.length > 0}
							<p class="text-sm">
								<span class="sr-only">Authors:</span>
								{post.populatedAuthors.map((author) => author.name).join(', ')}
							</p>
						{/if}
					</div>
					<div class="space-y-4 min-h-40">
						{#if isLoading}
							<div class="space-y-2">
								<Skeleton class="h-4 w-full" />
								<Skeleton class="h-4 w-5/6" />
								<Skeleton class="h-4 w-4/5" />
								<Skeleton class="h-4 w-full" />
								<Skeleton class="h-4 w-4/5" />
							</div>
						{:else}
							<Card.Description
								class="font-serif text-base font-extralight leading-relaxed text-black dark:text-white"
							>
								{excerpt}
							</Card.Description>
						{/if}
						<div class="mt-2">
							<span
								class="group-hover:text-primary-dark text-sm font-medium text-primary transition-colors"
							>
								{m.yummy_warm_cobra_mop()}
								<span class="sr-only">about {post.title}</span>
							</span>
						</div>
					</div>
					<div class="aspect-[4/3] overflow-hidden saturate-0">
						{#if post.meta?.image}
							<MediaBlock
								position="thumbnail"
								media={{
									...post.meta.image,
									alt: post.meta.image.alt || `Thumbnail for ${post.title}`,
									sizes: post.meta.image.sizes || {
										thumbnail: { url: post.meta.image.url, width: 300, height: 225 }
									}
								}}
								imgClassName="h-full w-full object-cover transition-opacity group-hover:opacity-80"
							/>
						{:else}
							<div class="flex h-full w-full items-center justify-center" aria-hidden="true">
								<span class=""></span>
							</div>
						{/if}
					</div>
				</div>
			</a>
		</article>
	</Card.Root>
</div>