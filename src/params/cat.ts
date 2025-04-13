import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('collections' | 'graphs' | 'all') => {
    return param === 'collections' || param === 'graphs' || param === 'all';
}) satisfies ParamMatcher;