import type { LayoutServerLoad } from "../$types";
import { prisma } from "$lib/server/session";

export const load: LayoutServerLoad = async () => {
    const res = await prisma.collection.findMany({
        where: {
            public: true
        }
    });

    return {
        collections: res
    }
}