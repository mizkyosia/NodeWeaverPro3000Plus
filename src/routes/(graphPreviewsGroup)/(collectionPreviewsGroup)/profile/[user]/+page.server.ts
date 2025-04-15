import { prisma } from '$lib/server/session'
import type { $Enums } from '@prisma/client'

export const load = async ({ locals, params }) => {
    let visibilities: $Enums.Visibility[] = ['PUBLIC'];
    if (locals.user != undefined) visibilities.push('RESTRICTED');

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.user),
            visibility: {
                in: visibilities
            }
        },
        include: {
            _count: {
                select: {
                    graphs: true,
                    collections: true
                }
            },
            graphs: {
                where: {
                    public: true
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                }
            },
            collections: {
                include: {
                    _count: {
                        select: {
                            graphs: true
                        }
                    },
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

    return {
        profile: user
    }
}