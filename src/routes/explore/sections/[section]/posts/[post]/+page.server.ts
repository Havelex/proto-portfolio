import { createComment } from '$lib/db/db';
import type { Actions } from './$types';

export const actions = {
	post: async ({ request, params }) => {
		console.log(request + ' ' + params);
		const data = await request.formData();
		const content = data.get('content')?.toString();
		await createComment(params.post, params.section, content ?? '');
	}
} satisfies Actions;
