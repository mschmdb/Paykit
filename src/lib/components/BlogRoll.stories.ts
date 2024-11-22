import type { Meta, StoryObj } from '@storybook/svelte';
import BlogRoll from './BlogRoll.svelte';

const meta: Meta<BlogRoll> = {
  title: 'Components/BlogRoll',
  component: BlogRoll,
  argTypes: {
    post: {
      description: 'Blog post object with details such as title, content, slug, and meta.',
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<BlogRoll>;

export const Default: Story = {
  args: {
    post: {
      slug: 'example-blog-post',
      title: 'Example Blog Post',
      content: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [
                { text: 'This is a sample excerpt for the blog post content.' },
                { text: 'Another sample text node to extend the content.' },
              ],
            },
          ],
        },
      },
      excerpt: 'A short excerpt for the blog post.',
      publishedAt: new Date().toISOString(),
      populatedAuthors: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
      meta: {
        image: {
          url: 'https://via.placeholder.com/300x225',
          alt: 'Example thumbnail',
        },
      },
    },
  },
};

export const Loading: Story = {
  args: {
    post: {
      slug: 'loading-blog-post',
      title: 'Loading Blog Post',
      content: {
        root: {
          children: [],
        },
      },
      excerpt: '',
      publishedAt: '',
      populatedAuthors: [],
      meta: {},
    },
  },
};

export const NoImage: Story = {
  args: {
    post: {
      slug: 'no-image-blog-post',
      title: 'No Image Blog Post',
      content: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [
                { text: 'Content without an associated image.' },
              ],
            },
          ],
        },
      },
      excerpt: 'Content for a blog post without an image.',
      publishedAt: new Date().toISOString(),
      populatedAuthors: [{ name: 'John Doe' }],
      meta: {
        image: null,
      },
    },
  },
};
