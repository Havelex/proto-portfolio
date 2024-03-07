<script lang="ts">
	import type { Comment } from '@prisma/client';

	export let comment: Comment;
</script>

<div class="flex flex-col">
	<div class="text-foreground_pale">
		<span>{comment.updatedAt}</span>
	</div>
	<hr />
</div>
