<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { formatDate } from '$lib/utils/date';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages.js';
	import MediaBlock from '$lib/blocks/MediaBlock.svelte';

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
	});
	$effect(() => {
		post = post;
		excerpt = generateExcerpt(post.content);
	});

	const formattedDate = post.publishedAt ? formatDate(post.publishedAt) : 'Date unknown';
</script>
<div class="mx-auto p-[0.5px] bg-gradient-to-r from-slate-100 to-slate-300 dark:from-slate-600 dark:to-slate-800 rounded"></div>
<div class="py-2">
	<Card.Root class="hover:bg-muted/50 transition-colors">
		<article class="group">
			<a href="/blog/{post.slug}" class="block focus:outline-none focus:ring-2 focus:ring-primary" aria-labelledby="post-title-{post.slug}">
				<div class="grid grid-cols-1 md:grid-cols-[2fr,3fr,2fr] gap-6 p-6">
					<div class="space-y-2">
						<Card.Title id="post-title-{post.slug}" class="text-xl font-semibold group-hover:text-primary transition-colors">{post.title}</Card.Title>
						<time datetime={post.publishedAt} class="text-sm">
							<span class="sr-only">Published on:</span> {formattedDate}
						</time>
						{#if post.populatedAuthors && post.populatedAuthors.length > 0}
							<p class="text-sm">
								<span class="sr-only">Authors:</span>
								{post.populatedAuthors.map(author => author.name).join(', ')}
							</p>
						{/if}
					</div>
					<div class="space-y-4">
						<Card.Description class="text-base font-serif font-extralight text-black dark:text-white leading-relaxed">
							{excerpt}
						</Card.Description>
						<div class="pt-2">
							<span class="text-sm text-primary font-medium group-hover:text-primary-dark transition-colors">
								{m.yummy_warm_cobra_mop()}
								<span class="sr-only">about {post.title}</span>
							</span>
						</div>
					</div>
					<div class="aspect-[4/3] overflow-hidden">
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
							<div class="h-full w-full bg-muted flex items-center justify-center" aria-hidden="true">
								<span class="">No image available</span>
							</div>
						{/if}
					</div>
				</div>
			</a>
		</article>
	</Card.Root>
</div>