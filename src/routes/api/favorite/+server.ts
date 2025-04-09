import { _getCollectionDetails } from '$api/collectionDetails/+server.js';
import { _getGraphDetails } from '$api/graphDetails/+server.js';
import { prisma } from '$lib/server/session';
import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
    const { ID, favorite, collection }: {
        ID: number;
        favorite: boolean;
        collection: boolean;
    } = await request.json();

    if (locals.user == null) return json({}, { status: 501 });

    const queryPart = (favorite ? {
        connect: {
            id: locals.user.id
        }
    } : {
        disconnect: {
            id: locals.user.id
        }
    });

    if (collection) {
        await prisma.collection.update({
            where: {
                id: ID
            },
            data: {
                subscribers: queryPart
            }
        });

        return json(await _getCollectionDetails(ID, locals), { status: 200 });
    } else {
        await prisma.graph.update({
            where: {
                id: ID
            },
            data: {
                favorited: queryPart
            }
        });

        return json(await _getGraphDetails(ID, locals), { status: 200 });
    }
}