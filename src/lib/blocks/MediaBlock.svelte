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

	let {
		position,
		media,
		enableGutter,
		className,
		imgClassName,
		captionClassName,
		disableInnerContainer
	}: MediaBlockProps = $props();

	let containerClasses = $state('');
	let imageClasses = $state('');
	let captionClasses = $state('');

	$effect(() => {
		containerClasses = [
			'relative',
			position === 'fullscreen' ? 'w-screen' : 'w-full',
			enableGutter && position !== 'fullscreen' ? 'px-0' : '',
			className
		]
			.filter(Boolean)
			.join(' ');

		imageClasses = ['w-full h-auto', position === 'default' ? 'rounded-lg' : '', imgClassName]
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

	function getSrcSet(media: Media): string {
		if (!media.sizes) return '';

		const availableSizes = ['small', 'medium', 'large', 'xlarge'] as const;
		const srcsetEntries = availableSizes
			.map((size) => {
				const sizeData = media.sizes[size];
				if (!sizeData) return null;
				// Ensure URL is properly encoded and the width descriptor is properly formatted
				const encodedUrl = sizeData.url.replace(/ /g, '%20');
				return `${encodedUrl} ${sizeData.width}w`;
			})
			.filter(Boolean);

		return srcsetEntries.join(', ');
	}

	function getSizes(position: MediaBlockProps['position']): string {
		if (position === 'fullscreen') {
			return '100vw';
		}
		return '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw';
	}

	function getDefaultSrc(media: Media): string {
		if (!media.sizes) return media.url;

		// Try to get the most appropriate size for default display
		const preferredSizes = ['large', 'medium', 'small'] as const;
		for (const size of preferredSizes) {
			if (media.sizes[size]?.url) {
				return media.sizes[size].url;
			}
		}
		return media.url;
	}
</script>

<div class={containerClasses}>
	{#if !disableInnerContainer && position === 'fullscreen'}
		<div class="relative mx-auto max-w-7xl">
			<img
				src={getDefaultSrc(media)}
				srcset={getSrcSet(media)}
				sizes={getSizes(position)}
				alt={media.alt || ''}
				width={media.width}
				height={media.height}
				class={imageClasses}
				loading="lazy"
				decoding="async"
			/>
		</div>
	{:else}
		<div class="relative mb-4">
			<img
				src={getDefaultSrc(media)}
				srcset={getSrcSet(media)}
				sizes={getSizes(position)}
				alt={media.alt || ''}
				width={media.width}
				height={media.height}
				class={imageClasses}
				loading="lazy"
				decoding="async"
			/>
		</div>
	{/if}

	{#if media.caption}
		<div class={captionClasses}>
			{media.caption}
		</div>
	{/if}
</div>
