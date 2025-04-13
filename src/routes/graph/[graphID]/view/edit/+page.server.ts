import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    const parent = await event.parent();

    if (parent.graph.authorId != event.locals.user?.id) return redirect(302, './');
}