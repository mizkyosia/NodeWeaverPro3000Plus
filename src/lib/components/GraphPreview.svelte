<!-- 
@component
Used for displaying graph "previews", including name, author, time and an image
-->
<script lang="ts">
    import type { Graph } from "@prisma/client";
    import IconLink from "./IconLink.svelte";

    import {
        graphDetailsState,
        type GraphDetails,
    } from "../graphPreviewStates.svelte";

    const {
        graph,
    }: {
        graph: Graph & {
            author: {
                id: number;
                name: string;
            } | null;
        };
    } = $props();

    // If description too long, cut it short
    if (graph.description.length > 100) {
        graph.description = graph.description.substring(0, 100) + "...";
    }

    // Open graph details panel, and fetch necessary data
    async function openGraphDetails() {
        graphDetailsState.show = true;

        if (graphDetailsState.data?.id == graph.id) return;

        graphDetailsState.data = undefined;

        fetch(`/api/graphDetails?graphID=${graph.id}`, {
            method: "GET",
        }).then(async (res) => {
            const graph: GraphDetails = await res.json();
            graphDetailsState.data = graph;
        });
    }
</script>

<button class="graphPreview" onclick={openGraphDetails}>
    <h4>{graph.title}</h4>
    <p>{graph.description}</p>

    <IconLink
        icon="account"
        label={graph.author?.name}
        link=""
        cssClass={["slimButton", "noHover"]}
    />

    <IconLink
        icon="settings"
        label={graph.updatedAt.toLocaleString(undefined, {
            dateStyle: "short",
            timeStyle: "short",
        })}
        cssClass={["slimButton", "noHover"]}
        link=""
    />
</button>
