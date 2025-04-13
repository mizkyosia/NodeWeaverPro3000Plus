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
    class={node.selected || !context.editMode ? "selected" : ""}
    cx={position.x}
    cy={position.y}
    r="6"
    onclick={() => {
        if (context.tools.selected == "link") {
            // Create new link
            context.selectedNodes.delete(node);
            const other = context.selectedNodes.values().next().value;
            if (other != undefined) context.graph.addLink(node, other, 1);

            context.selectedNodes.forEach((n) => (n.selected = false));
        }

        if (context.tools.selected != "add") node.selected = !node.selected;
    }}
/>
