<script lang="ts">
    import type { Coordinates, Graph, Node } from "$lib/graph.svelte";
    import { getContext, onMount } from "svelte";
    import type { SvelteSet } from "svelte/reactivity";
    import * as icons from "$lib/icons";
    import { headerState } from "$lib/headerState.svelte";

    const { data } = $props();

    headerState.path = [
        {
            name: "Discover",
            url: "/discover",
        },
        {
            name: "Graphs",
            url: "/discover/graphs",
        },
        {
            name: data.graph.title,
            url: "/graph/" + data.graph.id,
        },
        {
            name: "View",
            url: "/graph/" + data.graph.id + "/view",
        },
        {
            name: "Edit",
            url: "/graph/" + data.graph.id + "/view/edit",
        },
    ];

    let context: {
        graph: Graph;
        zoom: number;
        editMode: boolean;
        offset: {
            x: number;
            y: number;
        };
        rect: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        selectedNodes: SvelteSet<Node>;
        clickHandler: (e: MouseEvent) => void;
        viewToGraph: (pos: Coordinates) => Coordinates;
        graphToView: (pos: Coordinates) => Coordinates;
        tools: {
            all: {
                name: string;
                icon: keyof typeof icons;
                value: string;
            }[];
            selected: string;
        };
    } = getContext("graphDisplay");

    async function saveGraph() {
        await fetch("/api/graphData", {
            method: "POST",
            body: JSON.stringify({
                graphData: context.graph.exportData(),
                id: data.graph.id,
            }),
        });
    }

    onMount(() => {
        // Allow edits to the graph
        context.editMode = true;

        // Set action buttons
        context.tools = {
            all: [
                {
                    name: "Select",
                    value: "select",
                    icon: "account",
                },
                {
                    name: "Add nodes",
                    value: "add",
                    icon: "plus",
                },
                {
                    name: "Link nodes",
                    value: "link",
                    icon: "graphGeometry",
                },
                {
                    name: "Delete",
                    value: "delete",
                    icon: "trash",
                },
            ],
            selected: "select",
        };

        // Handle edits to the graph
        context.clickHandler = function (e: MouseEvent) {
            e.stopImmediatePropagation();
            e.preventDefault();

            // Perform action
            if (context.tools.selected == "add") {
                context.graph.addNodeFromCoords(
                    context.viewToGraph({ x: e.layerX, y: e.layerY }),
                );
            }
        };

        // Save every 5 minutes
        const loopID = setInterval(() => saveGraph(), 1000 * 60 * 5);

        // Cleanup
        return async () => {
            clearInterval(loopID);

            context.editMode = false;
            context.tools = {
                all: [],
                selected: "view",
            };
            context.clickHandler = () => {};
            context.selectedNodes.forEach((n: any) => (n.selected = false));

            // Save graph when changing page
            await saveGraph();
        };
    });
</script>
