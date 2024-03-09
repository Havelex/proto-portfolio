import { createComment, updateComment } from '$lib/db/db';
import type { Actions } from './$types';

export const actions = {
	post: async ({ request, params }) => {
		const data = await request.formData();
		const content = data.get('content')?.toString();
		await createComment(params.post, params.section, content ?? '');
	},

	patch: async ({ request }) => {
		const data = await request.formData();
		const content = data.get('content')?.toString();
		const commentId = data.get('commentId')?.toString();
		if (!commentId) return { success: false };
		await updateComment(commentId, content ?? '');
	}
} satisfies Actions;
