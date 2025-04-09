<script lang="ts">
    import Carousel from "$lib/components/Carousel.svelte";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import PreviewSection from "$lib/components/PreviewSection.svelte";
    import { headerState } from "$lib/headerState.svelte.js";

    const { data } = $props();

    headerState.path = [
        {
            name: "Discover",
            url: "/discover",
        }
    ];

    let temp1: [any, any][] = [];
    let temp2 = [...temp1];

    for (let i = 0; i < 15; i++) {
        temp1.push([GraphPreview, { data: data.latest[i % 2], id: i * 2 }]);

        temp2.push([
            GraphPreview,
            { data: data.latest[i % 2], id: i * 2 + 1 },
        ]);
    }

    let latestGraphs = $state(temp1);
    let bestRatedGraphs = $state(temp2);
</script>

<Carousel time={2000} bind:elements={latestGraphs} />
<Carousel time={1800} bind:elements={bestRatedGraphs} reverse />

<PreviewSection title="Freshly updated">
    {#each data.latest as graph}
        <GraphPreview data={graph} />
    {/each}
</PreviewSection>
