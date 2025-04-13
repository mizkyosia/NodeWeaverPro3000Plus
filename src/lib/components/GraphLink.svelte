<script lang="ts">
    import type { Coordinates, Node } from "$lib/graph.svelte";
    import { getContext } from "svelte";

    const {
        start = $bindable(),
        end = $bindable(),
        cost,
    }: {
        start: Node;
        end: Node;
        cost: number;
    } = $props();

    let viewport: {
        zoom: number;
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
        viewToGraph: (pos: Coordinates) => Coordinates;
        graphToView: (pos: Coordinates) => Coordinates;
    } = getContext("graphDisplay");

    let startPos = $derived(viewport.graphToView(start.coord)),
        endPos = $derived(viewport.graphToView(end.coord));

    console.log('cost ', cost);
</script>

<line x1={startPos.x} y1={startPos.y} x2={endPos.x} y2={endPos.y} stroke-width={Math.log1p(cost)} />
