import type { StoryObj } from '@storybook/svelte';
import MediaBlock from './MediaBlock.svelte';

export default {
  component: MediaBlock,
  title: 'Blocks/MediaBlock',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select', options: ['default', 'fullscreen'] },
    },
    enableGutter: { control: 'boolean' },
    className: { control: 'text' },
    imgClassName: { control: 'text' },
    captionClassName: { control: 'text' },
    disableInnerContainer: { control: 'boolean' },
  },
};

type Story = StoryObj<typeof MediaBlock>;

const mockMedia = {
  id: 1,
  alt: 'Sample Image',
  caption: 'This is a sample image caption',
  url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  filename: 'sample-image.png',
  mimeType: 'image/png',
  filesize: 1000000,
  width: 1920,
  height: 1080,
  sizes: {
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      width: 300,
      height: 169,
      mimeType: 'image/png',
      filesize: 10000,
      filename: 'sample-image-thumbnail.png',
    },
    square: {
      url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      width: 500,
      height: 500,
      mimeType: 'image/png',
      filesize: 20000,
      filename: 'sample-image-square.png',
    },
    small: {
      url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      width: 600,
      height: 338,
      mimeType: 'image/png',
      filesize: 30000,
      filename: 'sample-image-small.png',
    },
    medium: {
      url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      width: 900,
      height: 506,
      mimeType: 'image/png',
      filesize: 40000,
      filename: 'sample-image-medium.png',
    },
    large: {
      url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      width: 1400,
      height: 788,
      mimeType: 'image/png',
      filesize: 50000,
      filename: 'sample-image-large.png',
    },
    xlarge: {
      url: 'https://images.unsplash.com/photo-1731077792829-a7d9b516ce0f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      width: 1920,
      height: 1080,
      mimeType: 'image/png',
      filesize: 60000,
      filename: 'sample-image-xlarge.png',
    },
  },
};

export const Default: Story = {
  args: {
    position: 'default',
    media: mockMedia,
    enableGutter: true,
    className: '',
    imgClassName: '',
    captionClassName: '',
    disableInnerContainer: false,
  },
};

export const Fullscreen: Story = {
  args: {
    ...Default.args,
    position: 'fullscreen',
  },
};

export const WithoutGutter: Story = {
  args: {
    ...Default.args,
    enableGutter: false,
  },
};

export const WithCustomClasses: Story = {
  args: {
    ...Default.args,
    className: 'custom-container-class',
    imgClassName: 'custom-img-class',
    captionClassName: 'custom-caption-class',
  },
};

export const WithoutCaption: Story = {
  args: {
    ...Default.args,
    media: { ...mockMedia, caption: null },
  },
};