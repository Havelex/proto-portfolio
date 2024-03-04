import { loadMarkdown } from '$lib/utils/markdown';
import type { PageLoad } from './$types';
import type { Metadata } from '$lib/types/types';

export const load: PageLoad = async () => {
	const explorerGuide = await loadMarkdown('ExplorerGuide');
	return { explorerGuide } as {
		explorerGuide: { default: any; metadata: Metadata };
	};
};
