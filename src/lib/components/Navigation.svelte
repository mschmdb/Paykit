<script lang="ts">
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
  
    
    let { pages } = $props<{ pages: Array<{ title: string; slug: string }> }>();
  
    let isOpen = $state(false);
    let isLargeScreen = $state(false);
  
    function toggleMenu() {
      isOpen = !isOpen;
    }
  
    function closeMenu() {
      isOpen = false;
    }
  
    onMount(() => {
      const mediaQuery = window.matchMedia('(min-width: 640px)');
      isLargeScreen = mediaQuery.matches;
  
      const handleResize = (e: MediaQueryListEvent) => {
        isLargeScreen = e.matches;
        if (isLargeScreen) closeMenu();
      };
  
      mediaQuery.addEventListener('change', handleResize);
  
      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    });
  </script>
  
  <nav class="bg-white shadow" aria-label="Main navigation">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex w-full items-center justify-between">
          <div class="flex flex-shrink-0 items-center">
            <a href="/" class="text-xl font-bold text-gray-800">afaik.fyi</a>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            {#each pages as page}
              <a
                href="/{page.slug}"
                class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                aria-current={page.slug === '' ? 'page' : undefined}
              >
                {page.title}
              </a>
            {/each}
            <a
              href="/blog"
              class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Blog
            </a>
          </div>
          <div class="flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onclick={toggleMenu}
            >
              <span class="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  
    {#if !isLargeScreen}
      <div
        id="mobile-menu"
        class="sm:hidden"
        aria-labelledby="mobile-menu-button"
        class:hidden={!isOpen}
        transition:slide
      >
        <div class="space-y-1 pb-3 pt-2">
          {#each pages as page}
            <a
              href="/{page.slug}"
              class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              aria-current={page.slug === '' ? 'page' : undefined}
              onclick={closeMenu}
            >
              {page.title}
            </a>
          {/each}
          <a
            href="/blog"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            onclick={closeMenu}
          >
            Blog
          </a>
        </div>
      </div>
    {/if}
  </nav>