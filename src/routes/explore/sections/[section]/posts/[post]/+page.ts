import type { Metadata } from '$lib/types/types';
import { loadMarkdown } from '$lib/utils/markdown';
import type { Comment } from '@prisma/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const post = await loadMarkdown(params.post);
	const res = await fetch(`/api/comments?title=${params.post}&section=${params.section ?? ''}`);
	const comments = (await res.json()) as Comment[];
	return { post, comments } as { post: { default: any; metadata: Metadata }; comments: Comment[] };
};
