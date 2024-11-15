import type { StoryObj } from '@storybook/svelte';
import Navigation from './Navigation.svelte';

export default {
  component: Navigation,
  title: 'Components/Navigation',
  tags: ['autodocs'],
  argTypes: {
    pages: { control: 'object' },
  },
};

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: {
    pages: [
      { title: 'Home', slug: '' },
      { title: 'About', slug: 'about' },
      { title: 'Contact', slug: 'contact' },
    ],
  },
};

export const NoPages: Story = {
  args: {
    pages: [],
  },
};

export const ManyPages: Story = {
  args: {
    pages: [
      { title: 'Home', slug: '' },
      { title: 'About', slug: 'about' },
      { title: 'Services', slug: 'services' },
      { title: 'Products', slug: 'products' },
      { title: 'Team', slug: 'team' },
      { title: 'Careers', slug: 'careers' },
      { title: 'Contact', slug: 'contact' },
    ],
  },
};

export const LongPageTitles: Story = {
  args: {
    pages: [
      { title: 'Home', slug: '' },
      { title: 'About Our Company', slug: 'about' },
      { title: 'Our Services and Solutions', slug: 'services' },
      { title: 'Contact Us Today', slug: 'contact' },
    ],
  },
};