import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const item = await import(`../../lib/markdown/ExplorerGuide.md`);
  const content = item.default;
  const { title } = item.metadata;
  return {
    content,
    title
  };
};
