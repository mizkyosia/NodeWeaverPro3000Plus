import { prisma } from '$lib/server/session.js'

export async function load(event) {
    const graphCount = await prisma.graph.count();
    const userCount = await prisma.user.count();
    const collectionCount = await prisma.collection.count();

    const latest = await prisma.graph.findMany({
        where: {
            public: true
        },
        orderBy: {
            updatedAt: 'desc'
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

    const mostFollowed = await prisma.collection.findMany({
        where: {
            visibility: 'PUBLIC',
        },
        orderBy: {
            subscribers: {
                _count: 'desc'
            }
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

    const mostFavorited = await prisma.graph.findMany({
        where: {
            public: true
        },
        orderBy: {
            favorited: {
                _count: 'desc'
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
    })

    let randomGraphs = [];

    for (let i = 0; i < 45; i++) {
        let graph;
        while (graph == null) {
            let skip = Math.floor(Math.random() * graphCount);
            graph = await prisma.graph.findFirst({
                where: {
                    public: true
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                skip
            });
        }
        randomGraphs.push(graph);
    }

    return {
        randomGraphs,
        graphCount,
        userCount,
        collectionCount,
        latest,
        mostFollowed,
        mostFavorited
    }
}
