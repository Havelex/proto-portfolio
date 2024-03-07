<script lang="ts">
	import { browser } from '$app/environment';
	import Comment from '$lib/components/Comment/Comment.svelte';
	import { currentPageTitle, selectedItem } from '$lib/stores/stores.js';
	import { MessageSquare, MessageSquareOff, MessageSquarePlus, Plus } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;

	let article: HTMLElement;
	let wordCount: number;
	let showComments = false;
	let mounted = false;

	onMount(() => {
		const showCommentsStored = localStorage.getItem('sideBarOpen');
		(showCommentsStored !== null && (showComments = JSON.parse(showCommentsStored))) ||
			localStorage.setItem('showComments', JSON.stringify(open));
		mounted = true;
	});

	$: mounted && browser && localStorage.setItem('sideBarOpen', JSON.stringify(showComments));
	$: $selectedItem = data.post.metadata;
	$: $currentPageTitle = data.post.metadata.title;
	$: article && (wordCount = article.innerText.split(' ').length);
</script>

<div class="flex h-full grow">
	<div class="flex h-full grow flex-col items-center overflow-y-scroll pb-5">
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
			<div class="h-1 rounded-full bg-foreground_pale"></div>
		</div>
	</div>

	{#if showComments}
		<div class="flex w-1/4 flex-col pl-4">
			<div class="sticky">
				<div class="mb-5 flex items-end justify-between">
					<h3>{data.comments?.length} comment{data.comments?.length !== 1 && 's'}</h3>
					<button on:click={() => (showComments = false)} class="flex items-center justify-center">
						<MessageSquareOff size={32} />
					</button>
				</div>
			</div>
			{#each data.comments as comment (comment.id)}
				<div>
					<Comment {comment} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="mx-4 flex h-full w-10 items-center justify-center" />

		<button on:click={() => (showComments = true)} class="flex items-center justify-center">
			<MessageSquare size={32} />
		</button>
	{/if}
</div>
