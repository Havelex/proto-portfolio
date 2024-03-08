<script lang="ts">
	import type { Comment } from '@prisma/client';
	import { quintInOut } from 'svelte/easing';

	import { draw, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import CommentItem from './CommentItem.svelte';
	import CommentCreateForm from './CommentCreateForm.svelte';

	export let comments: Comment[];

	let showComments = false;
	let mounted = false;
	let showCreateComment = false;

	onMount(() => {
		const showCommentsStored = localStorage.getItem('showComments');
		(showCommentsStored && (showComments = JSON.parse(showCommentsStored))) ||
			localStorage.setItem('showComments', JSON.stringify(showComments));

		const showCreateCommentStored = localStorage.getItem('showCreateComment');
		(showCreateCommentStored && (showCreateComment = JSON.parse(showCreateCommentStored))) ||
			localStorage.setItem('showComments', JSON.stringify(showCreateComment));

		mounted = true;
	});

	$: mounted &&
		browser &&
		(localStorage.setItem('showComments', JSON.stringify(showComments)),
		localStorage.setItem('showCreateComment', JSON.stringify(showCreateComment)));
</script>

<div class="mx-4 flex items-center justify-center">
	<div class="flex flex-col items-center justify-between">
		<button
			on:click={() => (showComments = !showComments)}
			class="relative flex h-8 w-8 items-center justify-center"
		>
			{#if showComments}
				<!-- <MessageSquare size={32} /> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-message-square-text absolute"
				>
					<path
						d="M21 15V5a2 2 0 0 0-2-2H9"
						transition:draw={{ duration: 300 }}
						stroke-dashoffset={0}
					/>
					<path d="m2 2 20 20" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
					<path
						d="M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10"
						transition:draw={{ duration: 300 }}
						stroke-dashoffset={0}
					/>
				</svg>
			{:else}
				<!-- <MessageSquareOff size={32} /> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-message-square-off absolute"
				>
					<path
						stroke-dashoffset={0}
						d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
						transition:draw={{ duration: 300 }}
					/>
					<path d="M13 8H7" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
					<path d="M17 12H7" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
				</svg>
			{/if}
		</button>
	</div>
</div>
{#if showComments}
	<div
		class="flex w-1/2 flex-col pr-4"
		transition:slide={{ duration: 300, easing: quintInOut, axis: 'x' }}
	>
		<div class="flex items-center justify-between">
			<h3>{comments?.length} Comment{comments?.length !== 1 ? 's' : ''}</h3>
			<button on:click={() => (showCreateComment = !showCreateComment)} class="relative size-9">
				{#if showCreateComment}
					<!-- <X size={36} /> -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-x absolute top-0"
					>
						<path d="M18 6 6 18" transition:draw={{ duration: 300 }} />
						<path d="m6 6 12 12" transition:draw={{ duration: 300 }} />
					</svg>
				{:else}
					<!-- <MessageSquarePlus size={36} /> -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="33"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-message-square-plus absolute top-0"
					>
						<path
							d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
							transition:draw={{ duration: 300 }}
						/>
						<path d="M12 7v6" transition:draw={{ duration: 300 }} />
						<path d="M9 10h6" transition:draw={{ duration: 300 }} />
					</svg>
				{/if}
			</button>
		</div>
		<hr class="border-foreground" />
		<CommentCreateForm bind:display={showCreateComment} />
		<div class="mt-8 flex flex-col gap-8 overflow-x-clip overflow-y-scroll">
			{#each comments as comment (comment.id)}
				<CommentItem {comment} />
				<!-- <hr class="border-foreground_pale" /> -->
			{/each}
		</div>
	</div>
{/if}
