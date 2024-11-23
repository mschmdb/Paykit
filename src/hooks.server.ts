import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { i18n } from '$lib/i18n';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from '$lib/trpc/router';
import { createContext } from '$lib/trpc/context';
import {PRIVATE_PLAUSIBLE_DOMAIN, PRIVATE_PLAUSIBLE_URI} from '$env/static/private'

const handleParaglide: Handle = i18n.handle();
const handleTRPC = createTRPCHandle({ router, createContext });

// Neuer Tracking-Handle mit Plausible-Optionen
const handlePlausible: Handle = async ({ event, resolve }) => {
  const plausibleUri = PRIVATE_PLAUSIBLE_URI;
  const plausibleDomain = PRIVATE_PLAUSIBLE_DOMAIN;

  const response = await resolve(event, {
    transformPageChunk: ({ html }) => {
      if (plausibleUri && plausibleDomain) {
        // Tracking-Code mit Optionen einfügen
        const trackingScript = `
          <script async defer data-domain="${plausibleDomain}" src="${plausibleUri}"></script>
        `;
        return html.replace('</head>', `${trackingScript}</head>`);
      }
      return html;
    },
  });

  return response;
};

// Kombiniere alle Handles
export const handle: Handle = sequence(handleParaglide, handleTRPC, handlePlausible);
