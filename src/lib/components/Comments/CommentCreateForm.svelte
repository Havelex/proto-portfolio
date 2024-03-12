<script lang="ts">
	import { browser } from '$app/environment';
	import autosize from 'autosize';
	import { Send, Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	let commentInput: HTMLTextAreaElement;
	let commentInputValue = '';
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
</script>

<form
	method="POST"
	action="?/post"
	transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
	class="flex flex-col gap-3"
>
	<textarea
		id="content"
		name="content"
		minlength={1}
		required
		placeholder="Runes and feedback belong here..."
		class="mt-2 w-full resize-none rounded-md border-none bg-background px-2 text-lg shadow outline-none"
		bind:this={commentInput}
		bind:value={commentInputValue}
	/>
	<div class="flex gap-4">
		<button class="">
			<Send />
		</button>
		<button class="text-error" on:click|preventDefault={() => (commentInputValue = '')}>
			<Trash2 />
		</button>
	</div>
</form>
