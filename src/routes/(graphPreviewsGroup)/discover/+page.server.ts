import { prisma } from '$lib/server/session.js'

export async function load(event) {
    const { _count: graphCount } = await prisma.graph.aggregate({
        _count: true,
    });
    const { _count: userCount } = await prisma.user.aggregate({
        _count: true,
    });
    const { _count: collectionCount } = await prisma.collection.aggregate({
        _count: true,
    });

    const latest = await prisma.graph.findMany({
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

    const bestRated = await prisma.graph.findMany({

    })

    return {
        graphCount,
        userCount,
        collectionCount,
        latest,
    }
}
