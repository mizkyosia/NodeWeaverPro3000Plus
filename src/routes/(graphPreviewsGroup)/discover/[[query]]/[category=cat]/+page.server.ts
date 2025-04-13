import { prisma } from '$lib/server/session'
import type { $Enums } from '@prisma/client';

export const load = async ({ params, locals }) => {

    let graphs, collections;

    const visibilities: $Enums.Visibility[] = ['PUBLIC', 'RESTRICTED'];

    if (params.query != undefined) {
        const searchText = params.query.replace(/(\w+)/g, (m) => `*${m}*`);

        if (params.category != 'collections') graphs = await prisma.graph.findMany({
            where: {
                OR: [
                    {
                        title: {
                            search: searchText
                        }
                    },
                    {
                        description: {
                            contains: params.query
                        }
                    }
                ],
                NOT: {
                    public: false
                }
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    },
                    where: {
                        visibility: {
                            in: visibilities
                        }
                    }
                }
            },
            take: (params.category == 'all' ? 15 : 100)
        });

        if (params.category != 'graphs') collections = await prisma.collection.findMany({
            where: {
                OR: [
                    {
                        title: {
                            search: searchText
                        }
                    },
                    {
                        description: {
                            contains: params.query
                        }
                    }
                ],
                visibility: 'PUBLIC'
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    },
                    where: {
                        visibility: {
                            in: visibilities
                        }
                    }
                },
                _count: {
                    select: {
                        graphs: true
                    }
                }
            },
            take: (params.category == 'all' ? 15 : 100)
        });
    }

    return {
        graphs,
        collections,
        category: params.category
    }
}