<script lang="ts">
	import Content from '$lib/blocks/Content.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import MediaBlock from '$lib/blocks/MediaBlock.svelte';
	import BlogPostCard from './BlogPostCard.svelte';
	import { formatDate } from '$lib/utils/date';
	import SEO from '$lib/components/SEO.svelte';
	import { generateSEOData } from '$lib/utils/seo';
	import type { paraglide } from '@inlang/paraglide-sveltekit/vite';

	interface Author {
		id: number;
		name: string;
	}

	interface Meta {
		title: string | null;
		description: string | null;
		image: any | null;
	}

	interface Post {
		title: string;
		slug: string;
		publishedDate?: string;
		excerpt?: string;
		author?: string;
		populatedAuthors?: Author[];
		meta?: Meta; // Added meta to Post interface
	}

	interface PageData {
		id: number;
		title: string;
		content: any;
		layout?: any[];
		meta: Meta;
		publishedAt?: string;
		populatedAuthors?: Author[];
		categories?: string[];
		relatedPosts?: any[];
		slug: string;
		posts?: Post[];
	}

	let { data, type } = $props<{ data: PageData; type: 'page' | 'post' | 'blog' }>();
	$inspect('DataInComponent', data);

	function transformContentToBlocks(content: any) {
		if (!content || !content.root || !content.root.children) {
			return [];
		}

		return content.root.children.map((child: any) => {
			if (child.type === 'block' && child.fields?.blockType === 'mediaBlock') {
				return {
					...child.fields,
					id: child.fields.id
				};
			} else {
				return {
					id: 'content-' + Math.random().toString(36).substr(2, 9),
					blockName: 'Rich Text Content',
					blockType: 'content',
					columns: [
						{
							id: 'column-' + Math.random().toString(36).substr(2, 9),
							size: 'full',
							richText: { root: { children: [child] } },
							enableLink: false,
							link: null
						}
					]
				};
			}
		});
	}

	let contentBlocks = $derived(data.layout || transformContentToBlocks(data.content));

	let pageTitle = $state('');

	$effect(() => {
		pageTitle = type === 'post' ? `${data.title} | Journal` : data.title;
	});
</script>

<SEO data={generateSEOData(data, type)} />

<article class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-8 text-3xl font-normal">{data.title}</h1>

	{#if type === 'post'}
		{#if data.publishedAt}
			<p class="mb-6 text-sm">
				{formatDate(data.publishedAt)}
			</p>
		{/if}

		{#if data.populatedAuthors && data.populatedAuthors.length > 0}
			<p class="mb-6 text-sm">
				Words by {data.populatedAuthors.map((author: Author) => author.name).join(', ')}
			</p>
		{/if}
	{/if}

	{#if type === 'blog'}
		<div class="mb-12">
			<p class="italic">
				{data.content.root.children[0].children[0].text}
			</p>
		</div>

		<blockquote class="mb-16 italic">
			{data.content.root.children[1].children[0].text}
			<footer class="mt-4">{data.content.root.children[2].children[0].text}</footer>
		</blockquote>

		<div class="space-y-4 border-b border-black dark:border-white">
			{#each data.posts || [] as post}
				<BlogPostCard {post} />
			{/each}
		</div>
	{:else if contentBlocks.length > 0}
		{#each contentBlocks as block (block.id)}
			{#if block.blockType === 'content'}
				<Content {block} />
			{:else if block.blockType === 'mediaBlock'}
				<MediaBlock position={block.position} media={block.media} />
			{/if}
		{/each}
	{:else}
		<p class="text-muted-foreground">{m.fluffy_house_falcon_absorb()}</p>
	{/if}

	{#if type === 'post' && data.categories && data.categories.length > 0}
		<div class="mt-12">
			<h2 class="mb-4 text-lg font-normal">{m.any_brave_halibut_strive()}</h2>
			<ul class="flex flex-wrap gap-2">
				{#each data.categories as category}
					<li class="rounded-full border px-3 py-1 text-sm">{category.title}</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if type === 'post' && data.relatedPosts && data.relatedPosts.length > 0}
		<div class="mt-12">
			<h2 class="mb-4 text-lg font-normal">{m.neat_caring_tadpole_coax()}</h2>
			<ul class="grid grid-cols-1 gap-4">
				{#each data.relatedPosts as relatedPost}
					<li class="rounded-lg border p-4">
						<a href="/blog/{relatedPost.slug}" class="hover:text-white/90">
							<h3 class="text-base font-normal">{relatedPost.title}</h3>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</article>
