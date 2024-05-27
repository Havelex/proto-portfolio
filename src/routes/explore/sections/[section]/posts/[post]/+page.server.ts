import { createComment, getAuthorById, updateComment } from '$lib/db/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const authorId = cookies.get('authorId');
	return {
		authorId: authorId
			? await (async () => {
					if (authorId === 'undefined') return;
					if (!authorId) return;
					const res = getAuthorById(JSON.parse(authorId));
					return (await res)?.id;
				})()
			: null
	};
};

export const actions = {
	post: async ({ request, params, cookies }) => {
		const authorId = cookies.get('authorId');
		if (!authorId) {
			return { error: true, message: 'Must be logged in to post!' };
		}
		const data = await request.formData();
		const content = data.get('content')?.toString();
		await createComment(params.post, params.section, content ?? '', JSON.parse(authorId));
	},

	// patch: async ({ request }) => {
	// 	const data = await request.formData();
	// 	const content = data.get('content')?.toString();
	// 	const commentId = data.get('commentId')?.toString();
	// 	if (!commentId) return { success: false };
	// 	await updateComment(commentId, content ?? '');
	// }

	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const authorId = data.get('author-id');

		cookies.set(
			'authorId',
			authorId
				? JSON.stringify((await getAuthorById(authorId.toString()))?.id)
				: JSON.stringify(null),
			{ path: '/' }
		);
	}
} satisfies Actions;
