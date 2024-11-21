import type { Preview } from '@storybook/svelte';

import '../src/app.css';

const preview: Preview = {
  parameters: {
    a11y: {
      // Optional selector to inspect
      element: '#storybook-root',
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'image-alt',
            enabled: true,
          },
        ],
      },
      // Axe's options parameter
      options: {},
      // Optional flag to prevent the automatic check
      manual: false,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story) => {
      // Mock environment variables
      
      return Story();
    },
  ],

  tags: ['autodocs']
};

export default preview;
