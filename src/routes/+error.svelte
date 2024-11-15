<script lang="ts">
    import { page } from '$app/stores';
    $inspect($page);
  </script>
  
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-600 mb-4">{$page.status}: {$page.error?.message}</h1>
      <p class="text-xl text-gray-600 mb-8">Oops! Something went wrong.</p>
      <a href="/" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Go back to homepage
      </a>
    </div>
  </div>