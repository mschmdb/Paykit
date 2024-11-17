import { browser } from '$app/environment';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (browser) {
    return date.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else {
    // Fallback for server-side rendering
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}