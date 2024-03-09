<script lang="ts">
	import type { Comment } from '@prisma/client';
	import { Check, Pen, Trash2, X } from 'lucide-svelte';
	import CommentEditForm from './CommentEditForm.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import chineseBible from '$lib/assets/mozart_chinese_bible.jpg';
	import mondayLeftMeBroken from '$lib/assets/monday-left-me-broken-cat.gif';

	export let comment: Comment;

	let dialog: HTMLDialogElement;
	let updatedAt: Date = new Date();
	let beingEdited = false;
	let contentInEdit: string | null;
	let mounted = false;

	onMount(() => {
		document.body.addEventListener('click', () => {
			dialog.close();
		});

		const contentInEditStored = localStorage.getItem('contentInEdit');
		if (contentInEditStored !== null) {
			const contentInEditParsed = JSON.parse(contentInEditStored) as {
				commentId: string;
				content: string;
			};
			if (contentInEditParsed && contentInEditParsed.commentId === comment.id) {
				contentInEdit = contentInEditParsed.content;
				beingEdited = true;
			}
		}
		mounted = true;
	});

	$: mounted &&
		browser &&
		localStorage.setItem(
			'contentInEdit',
			JSON.stringify(
				contentInEdit
					? contentInEdit.length > 0
						? { commentId: comment.id, content: contentInEdit }
						: null
					: null
			)
		);
	$: updatedAt = new Date(Date.parse(comment.updatedAt.toString()));
</script>

<div class="flex flex-col">
	<div class="flex justify-between">
		<div class="flex gap-2 text-foreground_pale">
			<span>
				{`${`${updatedAt.getDay()}`.padStart(2, '0')}.${`${updatedAt.getMonth()}`.padStart(2, '0')}.${updatedAt.getFullYear()}`}
			</span>
			<span>
				{`${`${updatedAt.getHours()}`.padStart(2, '0')}:${`${updatedAt.getMinutes()}`.padStart(2, '0')}:${`${updatedAt.getSeconds()}`.padStart(2, '0')}`}
			</span>
		</div>
		<div class="flex gap-2">
			{#if beingEdited}
				<button
					type="submit"
					on:click={async () => (
						await fetch(`/api/comments?id=${comment.id}`, {
							method: 'PATCH',
							body: JSON.stringify(contentInEdit)
						}),
						(contentInEdit = null),
						(beingEdited = !beingEdited),
						invalidateAll()
					)}
				>
					<Check size={20} />
				</button>
				<button on:click={() => ((contentInEdit = null), (beingEdited = !beingEdited))}>
					<X size={20} />
				</button>
			{:else}
				<button on:click={() => ((contentInEdit = comment.content), (beingEdited = !beingEdited))}>
					<Pen size={20} />
				</button>
			{/if}
			<button class="text-error" on:click|stopPropagation={() => dialog.showModal()}>
				<Trash2 size={20} />
			</button>
		</div>
	</div>
	<hr class="mb-2 border-foreground_pale" />
	{#if beingEdited}
		<CommentEditForm bind:content={contentInEdit} />
	{:else}
		<span class="indent-4">{comment.content}</span>
	{/if}
</div>

<dialog bind:this={dialog} class="bg-transparent bg-none p-0 backdrop:bg-black backdrop:opacity-50">
	<div class="flex flex-col gap-5 self-center rounded-md bg-background_light p-4">
		<h1>U sure?</h1>
		<div class="flex gap-4">
			<button
				class="rounded-xl bg-primary px-4 py-2"
				on:click={async () => {
					const res = await fetch(`/api/comments?id=${comment.id}`, { method: 'DELETE' });
					res.ok && invalidateAll();
					dialog.close();
				}}><img src={mondayLeftMeBroken} alt="monday left me broken" class="h-12 w-24" /></button
			>
			<button class="rounded-xl bg-error px-4 py-2" on:click={() => dialog.close()}>
				<img src={chineseBible} alt="chineseBible" class="h-12" />
			</button>
		</div>
	</div>
</dialog>
