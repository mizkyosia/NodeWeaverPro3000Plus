import { prisma } from '$lib/server/session.js'
import { redirect } from '@sveltejs/kit'

export async function load({ params, locals }) {

    const collection = await prisma.collection.findUnique({
        where: {
            id: parseInt(params.collectionID),
            OR: [{
                visibility: {
                    in: ['PUBLIC', 'RESTRICTED']
                },
                subscribers: {
                    some: {
                        id: locals.user?.id
                    }
                }
            }, {
                authorId: locals.user?.id
            }
            ]
        },
        include: {
            graphs: {
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            subscribers: {
                where: {
                    id: locals.user?.id
                }
            }
        }
    })

    if (collection == null) return redirect(302, "/home");

    return {
        collection: {
            ...collection,
            subscribed: collection.subscribers.length > 0
        }
    }
}