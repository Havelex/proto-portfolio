import { loadAllSections } from '$lib/utils/markdown';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const sections = await loadAllSections();
	return { sections };
};
