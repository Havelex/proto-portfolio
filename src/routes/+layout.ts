import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  const pathname = url.pathname;
  return {
    pathname
  };
};
