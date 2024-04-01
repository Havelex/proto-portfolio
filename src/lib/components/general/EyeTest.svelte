<script lang="ts">
	let value = '';
	let solution = ' ';
</script>

<div class="flex flex-col items-center gap-4">
	<label for="answer">What animal do you see here?</label>
	<input name="answer" bind:value class="rounded" />
	<button
		on:click={() => (
			(solution = value
				.split('')
				.map((c: string) => c.toUpperCase().charCodeAt(0) - 64)
				.join('')),
			(value = '')
		)}
		class="rounded-md bg-primary px-4">Submit</button
	>
	<h3>{solution}</h3>
	<img src="/images/stereogram_bigger.png" alt="eyetest" class="rounded-xl" />
</div>
