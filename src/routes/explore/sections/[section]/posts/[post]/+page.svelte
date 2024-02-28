<script lang="ts">
	export let data;
</script>

<article class="prose">
	<h1>{data.title}</h1>
	<svelte:component this={data.postContent}></svelte:component>
</article>
