<script lang="ts">
	import type { Comment } from '@prisma/client';
	import { quintInOut } from 'svelte/easing';

	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import CommentItem from './CommentItem.svelte';
	import CommentCreateForm from './CommentCreateForm.svelte';
	import { KeyRound } from 'lucide-svelte';
	import Modal from '../Modal/Modal.svelte';
	import X from '$lib/assets/svgs/X.svelte';
	import MessageSquarePlus from '$lib/assets/svgs/MessageSquarePlus.svelte';

	export let comments: Comment[];
	export let authorId: string | null;

	let ready = false;
	let showCreateComment = false;
	let authorIdInput: HTMLInputElement;
	let showKeyModal: boolean;

	onMount(() => {
		const showCreateCommentStored = localStorage.getItem('showCreateComment');
		(showCreateCommentStored && (showCreateComment = JSON.parse(showCreateCommentStored))) ||
			localStorage.setItem('showComments', JSON.stringify(showCreateComment));

		ready = true;
	});

	$: ready && authorIdInput && authorIdInput.focus();

	$: ready &&
		browser &&
		localStorage.setItem('showCreateComment', JSON.stringify(showCreateComment));
</script>

<div
	class="flex w-1/2 flex-col rounded-md bg-background_light p-4 shadow-lg shadow-black"
	transition:slide={{ duration: 300, easing: quintInOut, axis: 'x' }}
>
	<div class="flex items-center justify-between">
		<h3>{comments?.length} Comment{comments?.length !== 1 ? 's' : ''}</h3>
		<button
			on:click|stopPropagation={() =>
				(authorId && ((showCreateComment = !showCreateComment) || true)) || (showKeyModal = true)}
			class="relative size-9"
		>
			{#if showCreateComment}
				<X size={32} />
			{:else if authorId}
				<MessageSquarePlus size={32} />
			{:else}
				<KeyRound size={32} />
			{/if}
		</button>
	</div>
	<hr class="border-foreground" />
	{#if authorId && showCreateComment}
		<CommentCreateForm />
	{/if}
	<div class="mt-8 flex flex-col gap-8 overflow-x-clip overflow-y-scroll px-2">
		{#each comments as comment (comment.id)}
			<CommentItem {comment} {authorId} />
		{/each}
	</div>
</div>

<Modal bind:showModal={showKeyModal}>
	<div class="flex flex-col gap-5 self-center rounded-lg bg-background_light p-2">
		<form method="POST" action="?/login">
			<div class="flex flex-col items-center justify-center gap-8 p-8">
				<label for="author-id"><h3>Enter Super Secret Key pls</h3></label>
				<input
					id="author-id"
					name="author-id"
					type="password"
					bind:this={authorIdInput}
					class="w-full rounded-md p-4 shadow-lg shadow-black"
				/>
				<button class="rounded-md bg-accent p-4 shadow-md shadow-black"><h4>Login</h4></button>
			</div>
		</form>
	</div>
</Modal>
