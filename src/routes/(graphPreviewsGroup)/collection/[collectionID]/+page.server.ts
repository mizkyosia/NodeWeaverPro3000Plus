import { prisma } from '$lib/server/session.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { $Enums } from '@prisma/client';

export async function load({ params, locals }) {
    const collection = await prisma.collection.findUnique({
        where: {
            id: parseInt(params.collectionID)
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
            _count: {
                select: {
                    subscribers: true
                }
            },
            subscribers: {
                where: {
                    id: locals.user?.id
                }
            }
        }
    });

    if (collection != null)
        return {
            collection: { ...collection, subscribed: (collection?.subscribers.length ?? 0) > 0 }
        }
    else return redirect(302, "/discover");
}

export const actions: Actions = {
    delete: async ({ request, locals, params }) => {
        const formData = await request.json();

        const collection = await prisma.collection.delete({
            where: {
                id: parseInt(params.collectionID),
                authorId: locals.user?.id
            }
        });

        if (collection == null) return fail(400, {});
        const link = formData.get('redirect');

        if (link) redirect(302, link.toString());
    },
    edit: async ({ request, locals, params }) => {
        const formData = await request.formData();

        const newCol =
            await prisma.collection.update({
                where: {
                    id: parseInt(params.collectionID),
                    authorId: locals.user?.id
                },
                data: {
                    title: formData.get('title')?.toString() ?? undefined,
                    description: formData.get('description')?.toString() ?? undefined,
                    visibility: (formData.get('visibility')?.toString() as $Enums.Visibility) ?? "PRIVATE",
                }
            });

        if (newCol == null) return fail(400, {});

        const link = formData.get('redirect');

        if (link) redirect(302, link.toString());
    }
}