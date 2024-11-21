import type { Meta, StoryObj } from '@storybook/svelte';
import Footer from './Footer.svelte';

const meta: Meta<Footer> = {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    footer: {
      description: 'The footer object containing navigation items and metadata.',
      control: { type: 'object' },
    },
  },
};
export default meta;

type Story = StoryObj<Footer>;

export const Default: Story = {
  args: {
    footer: {
      id: 1,
      navItems: [
        {
          id: '1',
          link: {
            type: 'reference',
            newTab: false,
            reference: {
              relationTo: 'pages',
              value: {
                id: 101,
                title: 'Home',
                slug: 'home',
              },
            },
            label: 'Home',
          },
        },
        {
          id: '2',
          link: {
            type: 'url',
            newTab: true,
            url: 'https://example.com',
            label: 'External Link',
          },
        },
      ],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      globalType: 'footer',
    },
  },
};

export const EmptyNav: Story = {
  args: {
    footer: {
      id: 2,
      navItems: [],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      globalType: 'footer',
    },
  },
};

export const MissingLinks: Story = {
  args: {
    footer: {
      id: 3,
      navItems: [
        {
          id: '3',
          link: null, // Invalid link
        },
      ],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      globalType: 'footer',
    },
  },
};
