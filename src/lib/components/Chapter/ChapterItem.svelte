<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Chapter } from '$lib/types/types';

	export let chapter: Chapter;

	let showButton = false;
</script>

<td
	on:mouseenter={() => (showButton = true)}
	on:mouseleave={() => (showButton = false)}
	class="flex flex-col rounded-md bg-background_light p-3 shadow shadow-background [&>p]:line-clamp-2 hover:[&>p]:line-clamp-6"
>
	<h4>{chapter.title}</h4>
	<p class="overflow-hidden text-ellipsis">
		{chapter.description}
	</p>
	{#if showButton}
		<button
			on:click={() => goto(`/chapters/${chapter.id}`)}
			class="mt-4 self-end rounded-md bg-primary p-2 hover:bg-accent">Read more...</button
		>
	{/if}
</td>

<style>
	td:hover p {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
	}
</style>
