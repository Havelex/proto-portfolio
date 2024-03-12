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
	class="lucide lucide-message-square-plus absolute top-0"
>
	<path
		d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
		transition:draw={{ duration: 300 }}
		stroke-dashoffset={0}
	/>
	<path d="M12 7v6" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
	<path d="M9 10h6" transition:draw={{ duration: 300 }} stroke-dashoffset={0} />
</svg>
