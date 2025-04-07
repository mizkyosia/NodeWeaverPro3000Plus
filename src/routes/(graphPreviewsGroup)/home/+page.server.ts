import { prisma } from "$lib/server/session";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent } from "./$types";

export const load = async ({ locals }) => {
    return {
        homeGraphs: {
            // Last graphs edited by the user
            lastUpdated: await prisma.graph.findMany({
                orderBy: {
                    updatedAt: 'desc'
                },
                where: {
                    authorId: locals.user?.id
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                },
                take: 10
            }),
            // Graphs authored by and favorited by the user
            favorites: await prisma.graph.findMany({
                where: {
                    authorId: locals.user?.id,
                    favorited: {
                        some: {
                            id: locals.user?.id
                        }
                    }
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            })
        }
    }
}

export const actions: Actions = {
    addCollection: async (event: RequestEvent) => {
        const formData = await event.request.formData();

        const formattedData = {
            title: formData.get("title")?.toString() ?? '',
            description: formData.get("description")?.toString() ?? '',
            public: formData.get("public") ? true : false,
            error: ""
        }

        // If the user isn't connected
        if (event.locals.user == null) {
            formattedData.error = "Please log in before creating any collections";
            return fail(400, formattedData);
        }

        // Create collection
        const collection = await prisma.collection.create({
            data: {
                authorId: event.locals.user.id,
                title: formattedData.title,
                description: formattedData.description,
                updatedAt: new Date(Date.now()),
            }
        });

        // Redirect to newly created collection
        return redirect(302, `/home/${collection.id}`);
    }
}