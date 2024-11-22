<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte';
	import CodeBlock from './CodeBlock.svelte';
	import { goto } from '$app/navigation';

	/** Represents the possible sizes for a column */
	type ColumnSize = 'full' | 'half' | 'twoThirds' | 'oneThird';

	/** Represents a link within a column */
	interface Link {
		/** The type of the link (e.g., 'url', 'page', etc.) */
		type: string;
		/** The URL of the link */
		url: string | null;
		/** The label text for the link */
		label: string | null;
		/** The appearance of the link */
		appearance: string;
		/** Whether to open the link in a new tab */
		newTab?: boolean;
	}

	/** Represents a single column in the content block */
	interface Column {
		/** Unique identifier for the column */
		id: string;
		/** Size of the column */
		size: ColumnSize;
		/** Rich text content of the column */
		richText: {
			root: {
				children: any[];
			};
		} | null;
		/** Whether to enable a link in this column */
		enableLink: boolean | null;
		/** Link details if enableLink is true */
		link: Link | null;
	}

	/** Represents the entire content block */
	interface ContentBlock {
		/** Unique identifier for the block */
		id: string;
		/** Optional name for the block */
		blockName: string | null;
		/** Array of columns in this block */
		columns: Column[];
		/** Type of the block, always 'content' for this component */
		blockType: 'content';
	}

	/** The main prop for the Content component, representing the entire content block */
	export let block: ContentBlock;

	/** Mapping of column sizes to Tailwind CSS classes */
	const sizeToClass: Record<ColumnSize, string> = {
		full: 'w-full',
		half: 'w-full sm:w-1/2',
		twoThirds: 'w-full sm:w-2/3',
		oneThird: 'w-full sm:w-1/3'
	};

	/**
	 * Renders rich text content
	 * @param richText - The rich text object to render
	 * @returns A string of HTML representing the rendered rich text
	 */
	function renderRichText(richText: any): string {
		if (!richText?.root?.children) return '';

		function renderNode(node: any): string {
			if (node.type === 'paragraph') {
				const content = node.children.map(renderNode).join('');
				return `<p class="mb-2 font-serif font-light leading-relaxed text-black dark:text-white text-pretty">${content}</p>`;
			} else if (node.type === 'heading') {
				const content = node.children.map(renderNode).join('');
				const tag = node.tag || 'h2';
				return `<${tag} class="text-2xl font-sans font-bold mb-4">${content}</${tag}>`;
			} else if (node.type === 'text') {
				return node.format === 1 ? `<strong>${node.text}</strong>` : node.text;
			} else if (node.type === 'link') {
				const content = node.children.map(renderNode).join('');
				let url = node.fields?.url || '';
				let attrs = '';
				
				// Handle internal links
				if (node.fields?.linkType === 'internal' && node.fields?.doc) {
					const prefix = node.fields.doc.relationTo === 'posts' ? '/blog/' : '/';
					url = `${prefix}${node.fields.doc.value.slug || ''}`;
					attrs = `data-sveltekit-preload-data`;
				} else if (node.fields?.newTab) {
					attrs = 'target="_blank" rel="noopener noreferrer"';
				}
				
				return `<a href="${url}" class="text-primary underline" ${attrs}>${content}</a>`;
			} else if (node.type === 'list') {
				const listItems = node.children.map((item: any) => `<li class="list-item">${item.children.map(renderNode).join('')}</li>`).join('');
				const listType = node.listType === 'number' ? 'ol' : 'ul';

				return `<${listType} class="list-${listType === 'ol' ? 'decimal' : 'disc'} pl-4 mb-4">${listItems}</${listType}>`;

			} else if (node.type === 'block' && node.fields?.blockType === 'code') {
				return `<div id="code-block-${node.fields.id}"></div>`;
			}
			return '';
		}

		return richText.root.children.map(renderNode).join('');
	}

	function getCodeBlocks(richText: any): any[] {
		if (!richText?.root?.children) return [];
		
		return richText.root.children.filter((node: any) => 
			node.type === 'block' && node.fields?.blockType === 'code'
		);
	}

	function handleLinkClick(event: MouseEvent, url: string) {
		if (url.startsWith('/')) {
			event.preventDefault();
			goto(url);
		}
	}
</script>

<div class="mx-auto">
	<div class="flex flex-wrap -mx-4 -my-4">
		{#each block.columns as column (column.id)}
			<div class={`${sizeToClass[column.size]} px-4 py-4`}>
				<div class="h-full">
					{#if column.richText}
						<div class="prose max-w-none font-thin">
							{@html renderRichText(column.richText)}
						</div>
						{#each getCodeBlocks(column.richText) as codeBlock}
							<div id={`code-block-${codeBlock.fields.id}`}>
								<CodeBlock code={codeBlock.fields.code} language={codeBlock.fields.language} />
							</div>
						{/each}
					{/if}
					
					{#if column.enableLink && column.link?.url}
						<a 
							href={column.link.url}
							class="inline-block mt-4 text-primary hover:underline"
							target={column.link.newTab ? "_blank" : undefined}
							rel={column.link.newTab ? "noopener noreferrer" : undefined}
							on:click={(e) => handleLinkClick(e, column.link.url)}
						>
							{column.link.label || column.link.url}
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>