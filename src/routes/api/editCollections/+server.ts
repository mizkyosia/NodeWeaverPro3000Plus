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
            }
        }
    });

    console.log("Updated graph : ", result);


    return json(result, { status: 201 })
}