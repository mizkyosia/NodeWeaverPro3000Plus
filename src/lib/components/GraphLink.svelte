<script lang="ts">
    import type { Coordinates, Graph, Node } from "$lib/graph.svelte";
    import { getContext } from "svelte";
    import type { SvelteSet } from "svelte/reactivity";
    import * as icons from "$lib/icons";
    import { goto } from "$app/navigation";
    import { error } from "@sveltejs/kit";

    const {
        start = $bindable(),
        end = $bindable(),
        cost,
    }: {
        start: Node;
        end: Node;
        cost: number;
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

    var linkID = $derived(`link-${start.getId()}-${end.getId()}`);

    let startPos = $derived(context.graphToView(start.coord)),
        endPos = $derived(context.graphToView(end.coord)),
        selected = $derived(
            context.selectedLinks.has(linkID) ||
                (start.selected && end.selected && context.editMode),
        ),
        partiallySelected = $derived(start.selected && !selected),
        gradientName = $derived(
            "selectGradient-" + start.getId() + "-" + end.getId(),
        ),
        angle = $derived(
            Math.atan2(
                end.coord.y - start.coord.y,
                end.coord.x - start.coord.x,
            ),
        );
</script>

<defs>
    <linearGradient
        id={gradientName}
        gradientTransform="rotate({(angle * 360) / (Math.PI * 2)} 0.5 0.5)"
    >
        <stop offset="0%" stop-color="rgb(70, 138, 113)" />
        <stop offset="100%" stop-color="rgb(59,59,59)" />
    </linearGradient>
</defs>
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<path
    class={[{ selected }]}
    stroke-width={4}
    style={"stroke :" +
        (partiallySelected ? `url('#${gradientName}') !important` : "unset")}
    onclick={(e) => {
        e.stopImmediatePropagation();
        if (context.tools.selected == "delete") {
            context.graph.removeLink(start, end);
        } else if (context.tools.selected == "select") {
            start.selected = true;
            end.selected = true;
        }
    }}
    d="M{startPos.x} {startPos.y} C {startPos.x -
        20 * Math.cos(angle + (Math.PI * 6) / 5)} {startPos.y -
        20 * Math.sin(angle + (Math.PI * 6) / 5)}, {endPos.x -
        20 * Math.cos(angle - Math.PI / 5)} {endPos.y -
        20 * Math.sin(angle - Math.PI / 5)}, {endPos.x} {endPos.y}"
/>

{#if context.display.links}
    <text
        text-anchor="middle"
        x={startPos.x +
            (endPos.x - startPos.x) / 2 +
            20 * Math.cos(angle + Math.PI / 2)}
        y={startPos.y +
            (endPos.y - startPos.y) / 2 +
            20 * Math.sin(angle + Math.PI / 2)}
    >
        {cost}
    </text>
{/if}
