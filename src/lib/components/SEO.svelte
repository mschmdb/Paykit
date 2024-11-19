<script lang="ts">
    interface SEOProps {
        title: string;
        description: string;
        url: string;
        imageUrl: string;
        siteName: string;
        type: 'article' | 'website';
        publishedTime?: string;
        authors?: string[];
    }

    let { data } = $props<{ data: SEOProps }>();
    
</script>

<svelte:head>
    <!-- Basic Meta Tags -->
    <title>{data.title}</title>
    <meta name="description" content={data.description} />
    <link rel="canonical" href={data.url} />

    <!-- Open Graph -->
    <meta property="og:title" content={data.title} />
    <meta property="og:description" content={data.description} />
    <meta property="og:url" content={data.url} />
    <meta property="og:site_name" content={data.siteName} />
    <meta property="og:type" content={data.type} />
    {#if data.imageUrl}
        <meta property="og:image" content={data.imageUrl} />
    {/if}
    {#if data.type === 'article' && data.publishedTime}
        <meta property="article:published_time" content={data.publishedTime} />
        {#each data.authors || [] as author}
            <meta property="article:author" content={author} />
        {/each}
    {/if}

    <!-- Twitter -->
    <meta name="twitter:card" content={data.imageUrl ? "summary_large_image" : "summary"} />
    <meta name="twitter:title" content={data.title} />
    <meta name="twitter:description" content={data.description} />
    {#if data.imageUrl}
        <meta name="twitter:image" content={data.imageUrl} />
    {/if}
</svelte:head>