import type { ServerLoad } from '@sveltejs/kit';
import { ISR_CONFIG } from './isr-config';

type LoadWithConfig = {
  load: ServerLoad;
  config?: { isr: typeof ISR_CONFIG };
};

export function withISR(loadFn: ServerLoad): LoadWithConfig {
  const isISREnabled = import.meta.env.ISR === 'TRUE';

  if (isISREnabled) {
    return {
      load: loadFn,
      config: { isr: ISR_CONFIG }
    };
  } else {
    return {
      load: loadFn
    };
  }
}