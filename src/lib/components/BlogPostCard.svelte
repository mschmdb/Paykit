<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { formatDate } from '$lib/utils/date';
	import { onMount } from 'svelte';

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
</script>

<Card.Root class="border-[0.1px] border-border mb-8">
	<a href="/blog/{post.slug}" class="block">
		<Card.Header>
			<div class="flex items-start gap-4">
				<div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
					<img
						src={post.meta?.image?.url || '/placeholder.svg?height=40&width=40'}
						alt={post.title}
						class="h-full w-full object-cover"
					/>
				</div>
				<div class="flex-grow">
					<Card.Title class="mb-4">{post.title}</Card.Title>
					<Card.Description>{excerpt}</Card.Description>
				</div>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="flex justify-between text-sm text-muted-foreground">
				<span>Words by {post.populatedAuthors?.[0]?.name || 'Unknown'}</span>
				<time datetime={post.publishedAt}>
					{post.publishedAt ? formatDate(post.publishedAt) : 'Date unknown'}
				</time>
			</div>
		</Card.Content>
	</a>
</Card.Root>
