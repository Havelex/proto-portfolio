<script lang="ts">
	import CommentList from '$lib/components/Comments/CommentList.svelte';
	import { currentPageTitle, selectedItem } from '$lib/stores/stores.js';

	export let data;

	let article: HTMLElement;
	let wordCount: number;

	$: $selectedItem = data.post.metadata;
	$: $currentPageTitle = data.post.metadata.title;
	$: article && (wordCount = article.innerText.split(' ').length);
</script>

<svelte:head>
	<title>{data.post.metadata.title}</title>
</svelte:head>

<div class="flex h-full grow">
	<div class="flex h-full grow flex-col items-center overflow-y-scroll pb-5">
		<div class="flex flex-col gap-4 px-2">
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
							`${data.post.metadata.tags.sort((a, b) => a.localeCompare(b)).join(', ')}`}
					</span>
					<span>Words: {wordCount}</span>
				</div>
			</div>
			<hr
				class="divide-foreground_pale border-foreground_pale bg-foreground_pale text-foreground_pale"
			/>
			<article bind:this={article} class="prose prose-xl mt-4 dark:prose-invert">
				<svelte:component this={data.post.default}></svelte:component>
			</article>
		</div>
	</div>
	<CommentList comments={data.comments} />
</div>
