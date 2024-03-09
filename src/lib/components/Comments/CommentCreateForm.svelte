<script lang="ts">
	import { browser } from '$app/environment';
	import autosize from 'autosize';
	import { Send, Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let display = false;

	let commentInput: HTMLTextAreaElement;
	let commentInputValue: string;
	let mounted = false;

	onMount(() => {
		const commentInputValueStored = localStorage.getItem('commentInputValue');
		commentInputValueStored && (commentInputValue = commentInputValueStored);
		mounted = true;
	});

	$: mounted &&
		browser &&
		localStorage.setItem(
			'commentInputValue',
			commentInputValue ? (commentInputValue.length > 0 ? commentInputValue : '') : ''
		);
	$: commentInput, autosize(commentInput);
	$: display && commentInput && commentInput.focus();
</script>

{#if display}
	<form
		method="POST"
		action="?/post"
		transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
		class="flex flex-col gap-3"
	>
		<textarea
			name="content"
			minlength={1}
			required
			placeholder="Runes and feedback belong here..."
			class="mt-2 w-full resize-none rounded-md border-none bg-background px-2 text-lg shadow outline-none"
			bind:this={commentInput}
			bind:value={commentInputValue}
		/>
		<div class="flex gap-4">
			<button class="" on:click={() => ((commentInputValue = ''), (display = false))}>
				<Send />
			</button>
			<button
				class="text-error"
				on:click={(e) => (e.preventDefault(), (commentInputValue = ''), (display = false))}
			>
				<Trash2 />
			</button>
		</div>
	</form>
{/if}
