<script lang="ts">
	import type { Comment } from '@prisma/client';
	import { Check, Edit, MessageSquareX, Pen, Trash2, X } from 'lucide-svelte';
	import CommentEditForm from './CommentEditForm.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';

	export let comment: Comment;
	export let deleteComment: () => Promise<boolean>;

	let updatedAt: Date = new Date();
	let beingEdited = false;
	let contentInEdit: string | null;
	let mounted = false;

	onMount(() => {
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
			<button class="text-error" on:click={deleteComment}>
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
