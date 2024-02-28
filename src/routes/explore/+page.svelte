<script lang="ts">
	export let data;
</script>

<div class="prose dark:prose-invert">
	<svelte:component this={data.content} />
</div>
