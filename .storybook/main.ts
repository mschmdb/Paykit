import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],

  "addons": [
    "@storybook/addon-svelte-csf",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-a11y',
    "@storybook/addon-mdx-gfm",
    "@chromatic-com/storybook"
  ],

  "framework": {
    "name": "@storybook/sveltekit",
    "options": {}
  },

  docs: {}
};
export default config;