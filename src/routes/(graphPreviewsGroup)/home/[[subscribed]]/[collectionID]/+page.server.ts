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
                graphs: true
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
                graphs: true
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

export const actions: Actions = {
    delete: async ({ locals, params }) => {
        const collection = await collectionFromParams(params, locals);

        // If user is the author, successfully delete collection
        if (collection && collection?.authorId == locals.user?.id) {
            await prisma.collection.delete({
                where: {
                    id: collection.id
                }
            });
            return redirect(302, '/home');
        } else return fail(400, {});
    },
    edit: async ({ request, locals, params }) => {
        const formData = await request.formData();

        const collection = await collectionFromParams(params, locals);

        // If user is the author, successfully update collection
        if (collection && collection?.authorId == locals.user?.id) {
            await prisma.collection.update({
                where: {
                    id: collection.id
                },
                data: {
                    title: formData.get('title')?.toString() ?? collection.title,
                    description: formData.get('description')?.toString() ?? collection.description,
                }
            });
        } else return fail(400, {});
    }
}