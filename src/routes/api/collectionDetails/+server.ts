import { prisma } from '$lib/server/session.js';
import { json } from '@sveltejs/kit'

export async function _getCollectionDetails(collectionID: number, locals: App.Locals) {
    const collection = await prisma.collection.findUnique({
        where: {
            id: collectionID
        },
        include: {
            _count: true,
            author: {
                select: {
                    id: true,
                    name: true
                }
            },
            subscribers: {
                where: {
                    id: locals.user?.id
                }
            }
        }
    });

    return { ...collection, subscribed: (collection?.subscribers.length ?? 0) > 0 };
}

export type _CollectionDetails = Awaited<ReturnType<typeof _getCollectionDetails>>;

export const GET = async ({ url, locals }) => {

    const collectionID = parseInt(url.searchParams.get("collectionID") ?? ''), graphsOnly = url.searchParams.has('graphsOnly');

    if (!graphsOnly) {
        return json(await _getCollectionDetails(collectionID, locals), { status: 200 });
    } else if (locals.user != null) {
        const query = await prisma.graph.findMany({
            where: {
                authorId: locals.user.id,
                collections: {
                    some: {
                        id: collectionID
                    }
                }
            },
        });

        return json({ graphs: query }, { status: 200 });
    }
}