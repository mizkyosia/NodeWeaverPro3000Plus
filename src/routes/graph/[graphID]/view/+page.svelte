<script lang="ts">
    import type { Coordinates, Graph } from "$lib/graph.svelte.js";
    import { headerState } from "$lib/headerState.svelte";
    import { getContext, onMount } from "svelte";
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
</script>
