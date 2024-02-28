<script lang="ts">
	let clazz = '';
	export { clazz as class };
</script>

<div
	class={`xl-grid-cols-4 grid gap-5 p-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 ${clazz}`}
>
	<slot />
</div>
