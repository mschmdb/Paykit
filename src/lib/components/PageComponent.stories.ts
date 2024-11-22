import type { Meta, StoryObj } from '@storybook/svelte';
import PageComponent from './PageComponent.svelte';


const meta = {
  title: 'Components/PageComponent',
  component: PageComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select', options: ['page', 'post'] },
    },
  },
} satisfies Meta<PageComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPageData = {
  id: 1,
  title: 'Sample Page',
  content: {
    root: {
      children: [
        {
          type: 'paragraph',
          children: [{ text: 'This is a sample paragraph.' }],
        },
      ],
    },
  },
  meta: {
    title: 'Sample Page',
    description: 'This is a sample page description.',
    image: { url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  },
  slug: 'sample-page',
};

const mockPostData = {
  ...mockPageData,
  title: 'Sample Blog Post',
  publishedAt: '2023-05-01T12:00:00Z',
  populatedAuthors: [{ id: 1, name: 'John Doe' }],
  categories: ['Technology', 'Web Development'],
  relatedPosts: [
    { slug: 'related-post-1', title: 'Related Post 1' },
    { slug: 'related-post-2', title: 'Related Post 2' },
  ],
};

export const Page: Story = {
  args: {
    data: mockPageData,
    type: 'page',
  },
};

export const BlogPost: Story = {
  args: {
    data: mockPostData,
    type: 'post',
  },
};

export const WithMediaBlock: Story = {
  args: {
    data: {
      ...mockPageData,
      layout: [
        {
          id: 'media-1',
          blockType: 'mediaBlock',
          position: 'default',
          media: {
            id: 1,
            alt: 'Sample image',
            caption: 'This is a sample image',
            url: 'https://example.com/image.jpg',
            width: 800,
            height: 600,
            sizes: {
              thumbnail: { url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', width: 200, height: 150 },
              medium: { url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', width: 400, height: 300 },
              large: { url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', width: 800, height: 600 },
            },
          },
        },
        {
          id: 'content-1',
          blockType: 'content',
          blockName: 'Rich Text Content',
          columns: [
            {
              id: 'column-1',
              size: 'full',
              richText: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ text: 'This is a sample paragraph after the media block.' }],
                    },
                  ],
                },
              },
              enableLink: false,
              link: null,
            },
          ],
        },
      ],
    },
    type: 'page',
  },
};

export const NoContent: Story = {
  args: {
    data: {
      ...mockPageData,
      content: { root: { children: [] } },
      layout: [],
    },
    type: 'page',
  },
};