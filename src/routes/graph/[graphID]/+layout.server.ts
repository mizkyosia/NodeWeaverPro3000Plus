import { prisma } from '$lib/server/session.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, route, locals }) {
    let id = parseInt(params.graphID);
    if (isNaN(id)) return redirect(302, "/discover");

    const graph = await prisma.graph.findUnique({
        where: {
            id,
            OR: [
                {
                    public: true
                },
                {
                    authorId: locals.user?.id
                }
            ]
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true
                }
            },
            ratings: true,
            _count: true
        }
    });

    if (graph == null) return redirect(302, '/discover');

    return {
        graph
    }
}