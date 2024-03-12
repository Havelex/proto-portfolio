<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: dialog && showModal && dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="bg-transparent bg-none p-0 backdrop:bg-black backdrop:opacity-50"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
	</div>
</dialog>
