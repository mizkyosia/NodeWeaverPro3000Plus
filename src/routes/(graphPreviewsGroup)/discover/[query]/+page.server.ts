import { prisma } from '$lib/server/session'

export const load = async ({ params }) => {
    const searchText = params.query.replace(/(\w+)/g, (m) => `*${m}*`);

    const graphs = await prisma.graph.findMany({
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
                }
            }
        },
        take: 15
    });

    const collections = await prisma.collection.findMany({
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
                }
            },
            _count: {
                select: {
                    graphs: true
                }
            }
        },
        take: 15
    });

    return {
        graphs,
        collections
    }
}