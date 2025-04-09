import { prisma } from '$lib/server/session';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals }): Promise<Response> {
    const { graphID, toConnect, toDisconnect }: {
        graphID: string;
        toConnect: string[];
        toDisconnect: string[];
    } = await request.json();

    const connectIDs = toConnect.map(v => { return { id: parseInt(v) } }),
        disconnectIDs = toDisconnect.map(v => { return { id: parseInt(v) } });

    const result = await prisma.graph.update({
        where: {
            id: parseInt(graphID)
        },
        data: {
            collections: {
                connect: connectIDs,
                disconnect: disconnectIDs
            }
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

    return json({ ...result, favorited: result.favorited.length > 0 }, { status: 201 })
}