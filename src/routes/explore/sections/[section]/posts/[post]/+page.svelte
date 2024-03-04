<script lang="ts">
	import { currentPageTitle } from '$lib/stores/stores.js';

	export let data;

	let article: HTMLElement;
	let wordCount: number;

	$: $currentPageTitle = data.post.metadata.title;
	$: article && (wordCount = article.innerText.split(' ').length);
</script>

<div class="flex flex-col gap-4">
	<h1>
		{data.post.metadata.title}
	</h1>
	<div class="flex w-full flex-col text-foreground_pale">
		<div class="flex justify-between">
			<span>{data.post.metadata.section}</span>
			<span> {data.post.metadata.date}</span>
		</div>
		<div class="flex justify-between">
			<span>
				{data.post.metadata.tags &&
					data.post.metadata.tags.length > 0 &&
					`${data.post.metadata.tags}`}
			</span>
			<span>Words: {wordCount}</span>
		</div>
	</div>
	<hr
		class="divide-foreground_pale border-foreground_pale bg-foreground_pale text-foreground_pale"
	/>
	<article bind:this={article} class="prose mt-4 dark:prose-invert">
		<svelte:component this={data.post.default}></svelte:component>
	</article>
</div>
