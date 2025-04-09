import { prisma } from '$lib/server/session.js'
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, RouteParams } from './$types.js';

async function collectionFromParams(params: RouteParams, locals: App.Locals) {
    // If the user is subscribed to the collection
    if (params.subscribed) {
        return await prisma.collection.findUnique({
            where: {
                id: parseInt(params.collectionID),
                subscribers: {
                    some: {
                        id: locals.user?.id
                    }
                }
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
                }
            }
        })
    } else {
        // Otherwise, it is the author
        return await prisma.collection.findUnique({
            where: {
                id: parseInt(params.collectionID),
                authorId: locals.user?.id
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
                }
            }
        })
    }
}

export async function load({ params, locals }) {

    const collection = await collectionFromParams(params, locals);

    return {
        collection,
        author: collection?.authorId == locals.user?.id
    }
}