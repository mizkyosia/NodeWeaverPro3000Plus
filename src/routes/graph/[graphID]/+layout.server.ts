import { prisma } from '$lib/server/session.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, route }) {
    const graph = await prisma.graph.findUnique({
        where: {
            id: parseInt(params.graphID),
            public: true
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

    if(graph == null) return redirect(302, '/discover');
    
    return {
        graph
    }
}