import type { PageLoad } from './$types';

export const loadMarkdown: PageLoad = async ({ params }) => {
	const item = await import(`$lib/markdown/sections/${params.section}/posts/${params.post}`);
	const postContent = item.default;
	const { title } = item.metadata;
	return {
		postContent,
		title
	};
};
