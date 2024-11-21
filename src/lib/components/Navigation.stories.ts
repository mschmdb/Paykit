import type { Meta, StoryObj } from '@storybook/svelte';
import Navigation from './Navigation.svelte';

const meta = {
  component: Navigation,
  title: 'Components/Navigation',
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'object' },
  },
} satisfies Meta<Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: {
      navItems: [
        { 
          id: '1',
          link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: '' } }, url: null, label: 'Home' }
        },
        { 
          id: '2',
          link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'about' } }, url: null, label: 'About' }
        },
        { 
          id: '3',
          link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'contact' } }, url: null, label: 'Contact' }
        },
      ],
    },
  },
};

export const NoPages: Story = {
  args: {
    header: {
      navItems: [],
    },
  },
};

export const ManyPages: Story = {
  args: {
    header: {
      navItems: [
        { id: '1', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: '' } }, url: null, label: 'Home' } },
        { id: '2', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'about' } }, url: null, label: 'About' } },
        { id: '3', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'services' } }, url: null, label: 'Services' } },
        { id: '4', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'products' } }, url: null, label: 'Products' } },
        { id: '5', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'team' } }, url: null, label: 'Team' } },
        { id: '6', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'careers' } }, url: null, label: 'Careers' } },
        { id: '7', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'contact' } }, url: null, label: 'Contact' } },
      ],
    },
  },
};

export const LongPageTitles: Story = {
  args: {
    header: {
      navItems: [
        { id: '1', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: '' } }, url: null, label: 'Home' } },
        { id: '2', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'about' } }, url: null, label: 'About Our Company' } },
        { id: '3', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'services' } }, url: null, label: 'Our Services and Solutions' } },
        { id: '4', link: { type: 'reference', newTab: false, reference: { relationTo: 'pages', value: { slug: 'contact' } }, url: null, label: 'Contact Us Today' } },
      ],
    },
  },
};