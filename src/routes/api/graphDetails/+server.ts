import { prisma } from '$lib/server/session.js';
import { json } from '@sveltejs/kit'

export async function _getGraphDetails(graphID: number, locals: App.Locals) {
    const graph = await prisma.graph.findUnique({
        where: {
            id: graphID
        },
        include: {
            _count: {
                select: {
                    collections: true,
                    ratings: true,
                    favorited: true
                }
            },
            author: {
                select: {
                    id: true,
                    name: true
                }
            },
            favorited: {
                where: {
                    id: locals.user?.id
                }
            }
        }
    });

    const averageRating = await prisma.rating.aggregate({
        _avg: {
            rating: true
        },
        where: {
            postId: graphID
        }
    });

    return { ...graph, favorited: (graph?.favorited.length ?? 0) > 0, averageRating: averageRating._avg.rating };
}

export type _GraphDetails = Awaited<ReturnType<typeof _getGraphDetails>>;

export const GET = async ({ url, locals }) => {

    const graphID = parseInt(url.searchParams.get("graphID") ?? ''), collectionsOnly = url.searchParams.has('collectionsOnly');

    if (!collectionsOnly) {
        return json(await _getGraphDetails(graphID, locals), { status: 200 });
    } else if (locals.user != null) {
        const query = await prisma.collection.findMany({
            where: {
                authorId: locals.user.id,
            },
            include: {
                graphs: {
                    where: {
                        id: graphID
                    },
                    select: {
                        id: true
                    }
                }
            }
        });

        const collections = query.map(g => {
            return {
                title: g.title,
                id: g.id,
                visibility: g.visibility,
                containsGraph: g.graphs.length > 0
            }
        })

        return json({ collections }, { status: 200 });
    }
}