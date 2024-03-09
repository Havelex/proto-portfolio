<script lang="ts">
	import autosize from 'autosize';

	export let content: string | null;

	let commentInput: HTMLTextAreaElement;

	$: commentInput, autosize(commentInput);
	$: commentInput && commentInput.focus();
</script>

<textarea
	name="content"
	minlength={1}
	required
	placeholder="Runes and feedback belong here..."
	class="mt-2 w-full resize-none rounded-md border-none bg-background px-2 text-lg shadow outline-none"
	bind:this={commentInput}
	bind:value={content}
/>
