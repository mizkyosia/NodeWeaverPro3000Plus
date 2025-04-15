import { prisma } from "$lib/server/session";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    delete: async ({ request, locals, params }) => {
        const formData = await request.json();

        const collection = await prisma.graph.delete({
            where: {
                id: parseInt(params.graphID),
                authorId: locals.user?.id
            }
        });

        if (collection == null) return fail(400, {});
        const link = formData.get('redirect');

        if (link) redirect(302, link.toString());
    },
    edit: async ({ request, locals, params }) => {
        const formData = await request.formData();

        const newCol =
            await prisma.graph.update({
                where: {
                    id: parseInt(params.graphID),
                    authorId: locals.user?.id
                },
                data: {
                    title: formData.get('title')?.toString() ?? undefined,
                    description: formData.get('description')?.toString() ?? undefined,
                    public: formData.get('public') == "on",
                }
            });

        if (newCol == null) return fail(400, {});

        const link = formData.get('redirect');

        if (link) redirect(302, link.toString());
    }
}