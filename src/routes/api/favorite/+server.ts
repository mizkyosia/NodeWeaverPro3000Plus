import { prisma } from '$lib/server/session';
import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
    const { graphID, favorite }: {
        graphID: number;
        favorite: boolean;
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
    })

    let graph = await prisma.graph.update({
        where: {
            id: graphID
        },
        data: {
            favorited: queryPart
        },
        include: {
            favorited: {
                where: {
                    id: locals.user.id
                }
            }
        }
    })

    return json({ favorited: graph.favorited.length > 0 }, { status: 200 });
}