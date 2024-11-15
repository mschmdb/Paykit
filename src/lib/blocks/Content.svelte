<script lang="ts">
    import type { SvelteComponentTyped } from 'svelte';
  
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
      
      return richText.root.children.map((node: any) => {
        if (node.type === 'paragraph') {
          const text = node.children
            .map((child: any) => child.text)
            .join('');
          return `<p class="mb-4">${text}</p>`;
        }
        return '';
      }).join('');
    }
  </script>
  
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap -mx-2">
      {#each block.columns as column (column.id)}
        <div class={`${sizeToClass[column.size]} px-2 mb-4`}>
          {#if column.richText}
            <div class="prose max-w-none">
              {@html renderRichText(column.richText)}
            </div>
          {/if}
          
          {#if column.enableLink && column.link?.url}
            <a 
              href={column.link.url}
              class="inline-block mt-4 text-blue-600 hover:underline"
              target={column.link.newTab ? "_blank" : undefined}
              rel={column.link.newTab ? "noopener noreferrer" : undefined}
            >
              {column.link.label || column.link.url}
            </a>
          {/if}
        </div>
      {/each}
    </div>
  </div>