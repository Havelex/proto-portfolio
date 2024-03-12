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
	class="lucide lucide-message-square-text absolute"
>
	<path d="M21 15V5a2 2 0 0 0-2-2H9" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
	<path d="m2 2 20 20" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
	<path
		d="M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10"
		transition:draw={{ duration: 300 }}
		stroke-dashoffset={0}
	/>
</svg>
