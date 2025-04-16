<script lang="ts">
    import CollapseSection from "$lib/components/CollapseSection.svelte";
    import type { Coordinates, Graph, Node } from "$lib/graph.svelte.js";
    import { headerState } from "$lib/headerState.svelte";
    import { getContext } from "svelte";
    import type { SvelteSet } from "svelte/reactivity";

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
        clickHandler: (e: MouseEvent) => void;
        viewToGraph: (pos: Coordinates, center?: boolean) => Coordinates;
        graphToView: (pos: Coordinates, center?: boolean) => Coordinates;
    } = getContext("graphDisplay");

    let startNode = $state(0),
        endNode = $state(0),
        totalCost = $state(NaN);
</script>

<CollapseSection title="Pathfinding">
    <span
        >Start : <select bind:value={startNode}>
            {#each context.graph.nodes as node}
                <option value={node.getId()}>{node.name}</option>
            {/each}
        </select>
    </span>

    <span
        >End : <select bind:value={endNode}>
            {#each context.graph.nodes as node}
                <option value={node.getId()}>{node.name}</option>
            {/each}
        </select>
    </span>

    <span>
        <button
            onclick={() => {
                context.selectedNodes.forEach((n) => (n.selected = false));
                totalCost = 0;
                context.graph
                    .dijkstra(
                        context.graph.nodes[startNode],
                        context.graph.nodes[endNode],
                    )
                    .forEach((n, i, a) => {
                        context.graph.nodes[n].selected = true;
                        if (i != a.length - 1) {
                            context.selectedLinks.add(`link-${n}-${a[i + 1]}`);
                            totalCost += context.graph.matrix[n][a[i + 1]];
                        }
                    });
            }}>Dijkstra</button
        >
        <button
            onclick={() => {
                context.selectedNodes.forEach((n) => (n.selected = false));
                totalCost = 0;
                context.graph
                    .bellmanFord(
                        context.graph.nodes[startNode],
                        context.graph.nodes[endNode],
                    )
                    .forEach((n, i, a) => {
                        context.graph.nodes[n].selected = true;
                        if (i != a.length - 1) {
                            context.selectedLinks.add(`link-${n}-${a[i + 1]}`);
                            totalCost += context.graph.matrix[n][a[i + 1]];
                        }
                    });
            }}>Bellman-Ford</button
        >
    </span>
    <span>Total cost : {isNaN(totalCost) ? "unavailable" : totalCost}</span>
</CollapseSection>
