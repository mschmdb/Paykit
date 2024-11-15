import type { Meta, StoryObj } from '@storybook/svelte';
import Content from './Content.svelte';

const meta = {
  component: Content,
  title: 'Blocks/Content',
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'object' },
  },
} satisfies Meta<Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleColumn: Story = {
  args: {
    block: {
      id: '1',
      blockName: 'Single Column',
      columns: [
        {
          id: 'col1',
          size: 'full',
          richText: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'This is a single column content block.' }],
                },
              ],
            },
          },
          enableLink: true,
          link: {
            type: 'url',
            url: 'https://example.com',
            label: 'Learn More',
          },
        },
      ],
      blockType: 'content',
    },
  },
};

export const TwoColumns: Story = {
  args: {
    block: {
      id: '2',
      blockName: 'Two Columns',
      columns: [
        {
          id: 'col1',
          size: 'half',
          richText: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'This is the first column.' }],
                },
              ],
            },
          },
          enableLink: false,
          link: null,
        },
        {
          id: 'col2',
          size: 'half',
          richText: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'This is the second column.' }],
                },
              ],
            },
          },
          enableLink: true,
          link: {
            type: 'url',
            url: 'https://example.com',
            label: 'Learn More',
          },
        },
      ],
      blockType: 'content',
    },
  },
};

export const ThreeColumns: Story = {
  args: {
    block: {
      id: '3',
      blockName: 'Three Columns',
      columns: [
        {
          id: 'col1',
          size: 'oneThird',
          richText: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'First column' }],
                },
              ],
            },
          },
          enableLink: false,
          link: null,
        },
        {
          id: 'col2',
          size: 'oneThird',
          richText: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Second column' }],
                },
              ],
            },
          },
          enableLink: false,
          link: null,
        },
        {
          id: 'col3',
          size: 'oneThird',
          richText: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Third column' }],
                },
              ],
            },
          },
          enableLink: true,
          link: {
            type: 'url',
            url: 'https://example.com',
            label: 'Learn More',
          },
        },
      ],
      blockType: 'content',
    },
  },
};