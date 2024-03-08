<script lang="ts">
	import type { Comment } from '@prisma/client';
	import { Edit, MessageSquareX, Pen } from 'lucide-svelte';

	export let comment: Comment;

	let updatedAt: Date = new Date();

	$: updatedAt = new Date(Date.parse(comment.updatedAt.toString()));
</script>

<div class="flex flex-col">
	<div class="flex justify-between">
		<div class="flex gap-2 text-foreground_pale">
			<span>
				{`${`${updatedAt.getDay()}`.padStart(2, '0')}.${`${updatedAt.getMonth()}`.padStart(2, '0')}.${updatedAt.getFullYear()}`}
			</span>

			<span>
				{`${`${updatedAt.getHours()}`.padStart(2, '0')}:${`${updatedAt.getMinutes()}`.padStart(2, '0')}:${`${updatedAt.getSeconds()}`.padStart(2, '0')}`}
			</span>
		</div>
		<div class="flex gap-2">
			<button class="">
				<Pen size={20} />
			</button>
			<button class="text-error">
				<MessageSquareX size={20} />
			</button>
		</div>
	</div>
	<hr class="mb-2 border-foreground_pale" />
	<span class="indent-4">{comment.content}</span>
</div>
