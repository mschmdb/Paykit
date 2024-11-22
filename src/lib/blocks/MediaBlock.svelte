<script lang="ts">
	import Img from '@zerodevx/svelte-img';

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


	let containerClasses = $state('');
	let captionClasses = $state('');

	function getPreloadSrc(media: Media): string | null {
	if (!media || !media.url) return null;
	return media.url; // Use the main image URL for preloading
}


	// Generate `src` object for svelte-img
	function getSrcObject(media: Media): any {
		if (!media) return null;

		const sources: Record<string, string> = {};

		// Populate `sources` for srcset
		if (media.sizes) {
			const availableSizes = ['thumbnail', 'small', 'medium', 'large', 'xlarge'] as const;
			for (const size of availableSizes) {
				const sizeData = media.sizes[size];
				if (sizeData?.url && sizeData?.mimeType) {
					const format = sizeData.mimeType.split('/')[1]; // Extract format from MIME type
					if (format) {
						sources[format] = (sources[format] || '') + `${sizeData.url} ${sizeData.width}w, `;
					}
				}
			}
		}

		// Fallback image
		const fallbackImg = {
			src: media.url,
			w: media.width,
			h: media.height
		};

		return { sources, img: fallbackImg };
	}

	// Classes and captions
	$effect(() => {
		containerClasses = [
			'relative',
			position === 'fullscreen' ? 'w-screen' : 'w-full',
			enableGutter && position !== 'fullscreen' ? 'px-0' : '',
			className
		]
			.filter(Boolean)
			.join(' ');

		captionClasses = [
			'mt-2 text-sm text-gray-600',
			position === 'fullscreen' ? 'px-4' : '',
			captionClassName
		]
			.filter(Boolean)
			.join(' ');
	});

	$effect(() => {
		// Ensure media is defined
		if (!media) {
			console.error('Media object is undefined or null');
		}
	});
</script>
<svelte:head>
	<link
		rel="preload"
		as="image"
		href={getPreloadSrc(media)}
		fetchpriority="high"
	/>
</svelte:head>


<div class={containerClasses}>
	{#if media && getSrcObject(media)}
		<Img src={getSrcObject(media)} loading="eager" alt={media.alt || ''} class={imgClassName} />
	{:else}
		<p class="text-red-500">Image data is missing or incomplete.</p>
	{/if}

	{#if media?.caption && position !== 'thumbnail'}
		<div class={captionClasses}>
			{media.caption}
		</div>
	{/if}
</div>