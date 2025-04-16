<script lang="ts">
    import type { Coordinates, Graph, Node } from "$lib/graph.svelte";
    import { getContext, onMount } from "svelte";
    import type { SvelteSet } from "svelte/reactivity";
    import * as icons from "$lib/icons";
    import { headerState } from "$lib/headerState.svelte";
    import IconLink from "$lib/components/IconLink.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import CollapseSection from "$lib/components/CollapseSection.svelte";

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
        selectedLinks: SvelteSet<string>;
        display: {
            nodes: boolean;
            links: boolean;
        };
        inputs: {
            ctrl: boolean;
            shift: boolean;
            mouseDown: boolean;
            movingNode: boolean;
        };
        clickHandler: (e: MouseEvent) => void;
        viewToGraph: (pos: Coordinates, center?: boolean) => Coordinates;
        graphToView: (pos: Coordinates, center?: boolean) => Coordinates;
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
                    context.viewToGraph(
                        {
                            x: e.layerX,
                            y: e.layerY,
                        },
                        true,
                    ),
                );
            } else if (!context.inputs.movingNode) {
                context.selectedNodes.forEach((n) => (n.selected = false));
                context.selectedLinks.clear();
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
            context.clickHandler = () => {
                if (context.inputs.movingNode) return;
                context.selectedLinks.clear();
                context.selectedNodes.forEach((n) => (n.selected = false));
            };
            context.selectedNodes.forEach((n: any) => (n.selected = false));

            // Save graph when changing page
            await saveGraph();
        };
    });
</script>

<div id="graphActions__picker">
    <IconLink icon="view" label="View mode" link="./" />
    <IconButton
        icon="save"
        label="Save"
        action={() => saveGraph().then(() => alert("The graph has been saved"))}
    />

    <CollapseSection title="Tools" startOpened>
        {#each context.tools.all as tool}
            <IconButton
                icon={tool.icon}
                label={tool.name}
                action={() => {
                    context.tools.selected = tool.value;
                    context.selectedNodes.forEach((n) => (n.selected = false));
                }}
                cssClass={[
                    context.tools.selected == tool.value ? "selected" : "",
                ]}
            />
        {/each}
    </CollapseSection>
</div>
