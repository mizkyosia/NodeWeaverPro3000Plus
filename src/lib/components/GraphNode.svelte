<script lang="ts">
    import { Graph, Node, type Coordinates } from "$lib/graph.svelte";
    import { getContext } from "svelte";
    import * as icons from "$lib/icons";
    import type { SvelteSet } from "svelte/reactivity";

    let {
        node = $bindable(),
    }: {
        node: Node;
    } = $props();

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

    $effect(() => {
        if (node.selected) {
            context.selectedNodes.add(node);
        } else {
            context.selectedNodes.delete(node);
        }
    });

    let position = $derived(context.graphToView(node.coord));
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<circle
    class={node.selected ? "selected" : ""}
    cx={position.x}
    cy={position.y}
    r="7"
    onclick={(e) => {
        if (context.tools.selected == "link") {
            // Create new link
            context.selectedNodes.delete(node);
            const other = context.selectedNodes.values().next().value;
            if (other != undefined) context.graph.addLink(other, node, 1);

            context.selectedNodes.forEach((n) => (n.selected = false));

            node.selected = !node.selected;
        } else if (context.tools.selected == "delete") {
            context.graph.removeNode(node);
        } else if (
            context.tools.selected == "select" ||
            context.tools.selected == "view"
        ) {
            e.stopImmediatePropagation();
            e.preventDefault();
            node.selected = !node.selected;
        }
    }}
    onmousedown={(e) => {
        context.inputs.movingNode = true;
        node.selected = true;
    }}
    onmouseup={(e) => {
        node.selected = !node.selected;
    }}
/>

{#if context.display.nodes}
    <text x={position.x} y={position.y - 10} text-anchor="middle">
        {node.name}
    </text>
{/if}
