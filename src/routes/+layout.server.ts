import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {

    return {
        user: locals.user == null ? null : {
            name: locals.user.name,
            id: locals.user.id
        }
    }
}