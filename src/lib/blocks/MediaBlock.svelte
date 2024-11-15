<script lang="ts">


    interface MediaSize {
      url: string;
      width: number;
      height: number;
      mimeType: string;
      filesize: number;
      filename: string;
    }
  
    interface Media {
      id: number;
      alt: string;
      caption: string | null;
      url: string;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      sizes: {
        thumbnail: MediaSize;
        square: MediaSize;
        small: MediaSize;
        medium: MediaSize;
        large: MediaSize;
        xlarge: MediaSize;
      };
    }
  
    interface MediaBlockProps {
      position?: 'default' | 'fullscreen';
      media: Media;
      enableGutter?: boolean;
      className?: string;
      imgClassName?: string;
      captionClassName?: string;
      disableInnerContainer?: boolean;
    }
  
    export let position: MediaBlockProps['position'] = 'default';
  export let media: MediaBlockProps['media'];
  export let enableGutter = true;
  export let className = '';
  export let imgClassName = '';
  export let captionClassName = '';
  export let disableInnerContainer = false;

  $: containerClasses = [
    'relative',
    position === 'fullscreen' ? 'w-screen' : 'w-full',
    enableGutter && position !== 'fullscreen' ? 'px-4' : '',
    className
  ].filter(Boolean).join(' ');

  $: imageClasses = [
    'w-full h-auto',
    position === 'default' ? 'rounded-lg' : '',
    imgClassName
  ].filter(Boolean).join(' ');

  $: captionClasses = [
    'mt-2 text-sm text-gray-600',
    position === 'fullscreen' ? 'px-4' : '',
    captionClassName
  ].filter(Boolean).join(' ');

  function getSrcSet(media: Media): string {
    const sizes = ['small', 'medium', 'large', 'xlarge'] as const;

    return sizes
      .map(size => {
        const sizeObj = media.sizes[size];
        return sizeObj ? `${sizeObj.url} ${sizeObj.width}w` : null;
      })
      .filter(Boolean)
      .join(', ');
  }

  function getDefaultSrc(media: Media): string {
    // Prioritize WebP format, fallback to original if not available
    const webpSizes = ['large', 'medium', 'small', 'xlarge'] as const;
    for (const size of webpSizes) {
      const sizeObj = media.sizes[size];
      if (sizeObj && sizeObj.mimeType === 'image/webp') {
        return sizeObj.url;
      }
    }
    return media.url; // Fallback to original URL if no WebP is available
  }
</script>

<div class={containerClasses}>
  {#if !disableInnerContainer && position === 'fullscreen'}
    <div class="relative mx-auto max-w-7xl">
      <img
        src={getDefaultSrc(media)}
        srcset={getSrcSet(media)}
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 900px, 1400px"
        alt={media.alt}
        width={media.width}
        height={media.height}
        class={imageClasses}
        loading="lazy"
      />
    </div>
  {:else}
    <img
      src={getDefaultSrc(media)}
      srcset={getSrcSet(media)}
      sizes="(max-width: 600px) 100vw, (max-width: 900px) 900px, 1400px"
      alt={media.alt}
      width={media.width}
      height={media.height}
      class={imageClasses}
      loading="lazy"
    />
  {/if}

  {#if media.caption}
    <div class={captionClasses}>
      {media.caption}
    </div>
  {/if}
</div>