import { prisma } from '$lib/server/session';
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types.js';
import { verifyPasswordHash } from '$lib/server/password';

export const load = async ({ locals }) => {
    if (locals.user == null) return redirect(302, "/login");

    const user = await prisma.user.findUnique({
        where: {
            id: locals.user.id
        },
    });

    if (user == null) return redirect(302, "/login");

    return {
        user
    }
}

export const actions: Actions = {
    edit: async ({ request, locals, params }) => {
        if (locals.user == null) return fail(400);

        const formData = await request.formData();

        const password = formData.get("password")?.toString() ?? "";

        if (!verifyPasswordHash(locals.user.passwordHash, password)) return fail(400);

        await prisma.user.update({
            where: {
                id: locals.user.id,
            },
            data: {
                name: formData.get("name")?.toString() ?? locals.user.name,
                bio: formData.get("bio")?.toString() ?? locals.user.bio,
                email: formData.get("email")?.toString() ?? locals.user.email,
            }
        });
    }
}