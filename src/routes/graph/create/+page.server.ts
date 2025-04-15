import { prisma } from "$lib/server/session.js"
import { redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
    if (locals.user == undefined) return redirect(302, '/login');

    const graph = await prisma.graph.create({
        data: {
            authorId: locals.user.id,
            title: "New graph",
            description: "Your brand new graph !",
            public: false,
            data: {
                nodes: [],
                matrix: []
            }
        }
    });

    return redirect(302, `/graph/${graph.id}`);
}