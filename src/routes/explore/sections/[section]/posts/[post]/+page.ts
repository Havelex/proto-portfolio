import { currentPageTitle } from '$lib/stores/stores';
import type { Metadata } from '$lib/types/types';
import { loadMarkdown } from '$lib/utils/markdown';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await loadMarkdown(params.post);
	return { post } as { post: { default: any; metadata: Metadata } };
};
