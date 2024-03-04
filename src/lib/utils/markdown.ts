import type { Metadata } from '$lib/types/types';

export const loadMarkdown = async (name: string) => {
	return await import(`../../markdown/${name}.md`);
};

export const loadAllSections = async (): Promise<
	Map<string, { path: string; metadata: Metadata }[]>
> => {
	const sections: Map<string, { path: string; metadata: Metadata }[]> = new Map();

	Object.entries(
		import.meta.glob(`$markdown/*.md`) as Record<string, () => Promise<{ metadata: Metadata }>>
	).forEach(async ([path, itemPromise]) => {
		const { metadata } = await itemPromise();
		if (metadata.section) {
			const entry = sections.get(metadata.section);
			if (entry) entry.push({ path, metadata });
			else sections.set(metadata.section, [{ path, metadata }]);
		}
	});
	return sections;
};
