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
			thumbnail?: MediaSize;
			square?: MediaSize;
			small?: MediaSize;
			medium?: MediaSize;
			large?: MediaSize;
			xlarge?: MediaSize;
		};
	}

	interface MediaBlockProps {
		position?: 'default' | 'fullscreen' | 'thumbnail';
		media: Media;
		enableGutter?: boolean;
		className?: string;
		imgClassName?: string;
		captionClassName?: string;
		disableInnerContainer?: boolean;
	}

	let {
        position = 'default',
        media,
        enableGutter = true,
        className = '',
        imgClassName = '',
        captionClassName = '',
        disableInnerContainer = false
    }: MediaBlockProps = $props();
    $inspect("media", media, "position", position);

    let containerClasses = $state('');
    let captionClasses = $state('');

    function getSrcObject(media: Media, position: MediaBlockProps['position']): any {
        if (!media) return null;

        const sources: Record<string, string> = {};

        // Determine which sizes to use based on position
        let sizesToUse: (keyof Media['sizes'])[];
        if (position === 'thumbnail') {
            sizesToUse = ['thumbnail'];
        } else if (position === 'fullscreen') {
            sizesToUse = ['large', 'xlarge'];
        } else {
            sizesToUse = ['small', 'medium', 'large', 'xlarge'];
        }

        // Populate `sources` for srcset
        if (media.sizes) {
            for (const size of sizesToUse) {
                const sizeData = media.sizes[size];
                if (sizeData?.url && sizeData?.mimeType) {
                    const format = sizeData.mimeType.split('/')[1]; // Extract format from MIME type
                    if (format) {
                        sources[format] = (sources[format] || '') + `${sizeData.url} ${sizeData.width}w, `;
                    }
                }
            }
        }

        // Fallback image (use the smallest available size)
        const fallbackSize = sizesToUse.find((size) => media.sizes[size]?.url) || 'thumbnail';
        const fallbackImg = {
            src: media.sizes[fallbackSize]?.url || media.url,
            w: media.sizes[fallbackSize]?.width || media.width,
            h: media.sizes[fallbackSize]?.height || media.height
        };

        return { sources, img: fallbackImg };
    }

    // ... (previous effect blocks remain the same)

    function getImageSrc(media: Media, position: MediaBlockProps['position']): string {
        const srcObject = getSrcObject(media, position);
        return srcObject?.img?.src || '';
    }
</script>

<div class={containerClasses}>
    {#if media}
        {#if !disableInnerContainer && position === 'fullscreen'}
            <div class="relative mx-auto max-w-7xl">
                <img
                    src={getImageSrc(media, position)}
                    loading="eager"
                    alt={media.alt || ''}
                    class={imgClassName}
                />
            </div>
        {:else}
            <div class="relative mb-4">
                <img
                    src={getImageSrc(media, position)}
                    loading="eager"
                    alt={media.alt || ''}
                    class={imgClassName}
                />
            </div>
        {/if}
    {:else}
        <p class="text-red-500">Image data is missing or incomplete.</p>
    {/if}

    {#if media?.caption && position !== 'thumbnail'}
        <div class={captionClasses}>
            {media.caption}
        </div>
    {/if}
</div>