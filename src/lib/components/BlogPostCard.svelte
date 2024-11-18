<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { formatDate } from '$lib/utils/date';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages.js';

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
		meta?: { image?: { url: string } };
	}>();

	// $inspect('Post in component', post);

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
		post = post
		excerpt = generateExcerpt(post.content);
	});
</script>
<div class="py-2 border-t border-black dark:border-white">
<Card.Root class="hover:bg-muted/50 transition-colors">
	<a href="/blog/{post.slug}" class="block">
		<div class="grid grid-cols-1 md:grid-cols-[2fr,3fr,2fr] gap-6 p-6">
			<div class="space-y-2">
				<Card.Title class="text-xl font-semibold">{post.title}</Card.Title>
				<time datetime={post.publishedAt} class="text-sm">
					{post.publishedAt ? formatDate(post.publishedAt) : 'Date unknown'}
				</time>
			</div>
			<div class="space-y-4">
				<Card.Description class="text-base font-serif font-extralight text-black dark:text-white leading-relaxed">{excerpt}</Card.Description>
				<div class="pt-2">
					<span class="text-sm text-primary underline">{m.yummy_warm_cobra_mop()}</span>
				</div>
			</div>
			<div class="aspect-[4/3] overflow-hidden grayscale">
				{#if post.meta?.image?.url}
				<img
					src={post.meta?.image?.url || ''}
					alt={post.title}
					class="h-full w-full object-cover"
				/>
				{/if}
			</div>
		</div>
	</a>
</Card.Root>
</div>