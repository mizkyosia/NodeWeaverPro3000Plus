import type { Node, Graph } from "$lib/graph.svelte"
import { prisma } from "$lib/server/session"
import { json } from "@sveltejs/kit";

export const POST = async ({ request }) => {
    const { graphData, id }: { graphData: ReturnType<Graph['exportData']>, id: number } = await request.json();

    console.log("Updating graph...");

    await prisma.graph.update({
        where: {
            id
        },
        data: {
            data: graphData
        }
    });

    return json("", { status: 200 });
}