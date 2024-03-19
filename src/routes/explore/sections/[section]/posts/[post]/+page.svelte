<script lang="ts">
	import CommentList from '$lib/components/Comments/CommentList.svelte';
	import { currentPageTitle, selectedItem } from '$lib/stores/stores.js';
	import { onDestroy, onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';
	import { browser } from '$app/environment';
	import MessageSquareOff from '$lib/assets/svgs/MessageSquareOff.svelte';
	import MessageSquare from '$lib/assets/svgs/MessageSquare.svelte';

	export let data: PageData;
	export let form: ActionData;

	let article: HTMLElement;
	let wordCount: number;
	let showComments = false;
	let ready = false;

	onMount(() => {
		const showCommentsStored = localStorage.getItem('showComments');
		(showCommentsStored !== null && (showComments = JSON.parse(showCommentsStored))) ||
			localStorage.setItem('showComments', JSON.stringify(showComments));
		ready = true;
	});

	onDestroy(() => (ready = false));

	$: ready && browser && localStorage.setItem('showComments', JSON.stringify(showComments));
	$: $selectedItem = data.post.metadata;
	$: $currentPageTitle = data.post.metadata.title;
	$: article && (wordCount = article.innerText.split(' ').length);
</script>

<svelte:head>
	<title>{data.post.metadata.title}</title>
</svelte:head>

{#if ready}
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

		<div class="mx-4 flex items-center justify-center">
			<div class="flex flex-col items-center justify-between">
				<button
					on:click={() => (showComments = !showComments)}
					class="relative flex h-8 w-8 items-center justify-center"
				>
					{#if showComments}
						<MessageSquareOff size={32} />
					{:else}
						<MessageSquare size={32} />
					{/if}
				</button>
			</div>
		</div>
		{#if showComments}
			<CommentList comments={data.comments} authorId={data.authorId} />
		{/if}
		{#if form?.error}{/if}
	</div>
{/if}
