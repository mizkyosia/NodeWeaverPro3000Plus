import { prisma } from '$lib/server/session';
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
    if (locals.user == null) return redirect(302, '/login');

    return {
        favorites: await prisma.graph.findMany({
            where: {
                favorited: {
                    some: {
                        id: locals.user.id
                    }
                }
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
    }
}