<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte';
	import CodeBlock from './CodeBlock.svelte';

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

		return richText.root.children
			.map((node: any) => {
				if (node.type === 'paragraph') {
					const text = node.children
						.map((child: any) => {
							if (child.format === 1) {
								return `<strong>${child.text}</strong>`;
							}
							return child.text;
						})
						.join('');
					return `<p class="mb-2 font-serif font-light leading-relaxed text-black dark:text-white text-pretty">${text}</p>`;
				} else if (node.type === 'heading') {
					const text = node.children
						.map((child: any) => {
							if (child.format === 1) {
								return `<strong>${child.text}</strong>`;
							}
							return child.text;
						})
						.join('');
					const tag = node.tag || 'h2';
					return `<${tag} class="text-2xl font-sans font-bold mb-4">${text}</${tag}>`;
				} else if (node.type === 'block' && node.fields?.blockType === 'code') {
					return `<div id="code-block-${node.fields.id}"></div>`;
				}
				return '';
			})
			.join('');
	}

	function getCodeBlocks(richText: any): any[] {
		if (!richText?.root?.children) return [];

		return richText.root.children.filter(
			(node: any) => node.type === 'block' && node.fields?.blockType === 'code'
		);
	}
</script>

<div class="mx-auto">
	<div class="-mx-4 -my-4 flex flex-wrap">
		{#each block.columns as column (column.id)}
			<div class={`${sizeToClass[column.size]} px-4 py-4`}>
				<div class="h-full">
					{#if column.richText}
						<div class="prose max-w-none">
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
							class="mt-4 inline-block text-primary hover:underline"
							target={column.link.newTab ? '_blank' : undefined}
							rel={column.link.newTab ? 'noopener noreferrer' : undefined}
						>
							{column.link.label || column.link.url}
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
