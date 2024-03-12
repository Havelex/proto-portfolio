<script lang="ts">
	import { draw } from 'svelte/transition';

	export let size = 24;
</script>

<svg
	xmlns="https://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="lucide lucide-x absolute top-0"
>
	<path d="M18 6 6 18" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
	<path d="m6 6 12 12" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
</svg>
