import type { LayoutServerLoad, } from "./$types";
import { prisma } from "$lib/server/session";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
    // If not connected, redirect to the login page
    if (event.locals.user == null) return redirect(302, "/login");

    // Fetch collections created by the user
    const collections = await prisma.collection.findMany({
        where: {
            authorId: event.locals.user.id
        }
    });

    // Fetch collections to which the user is subscribed
    const subscribed = await prisma.collection.findMany({
        where: {
            visibility: {
                in: ['RESTRICTED', 'PUBLIC']
            },
            subscribers: {
                some: {
                    id: event.locals.user.id
                }
            }
        }
    })

    return {
        collections,
        subscribed,
    }
}