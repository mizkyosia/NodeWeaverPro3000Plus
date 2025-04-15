<script lang="ts">
    import Carousel from "$lib/components/Carousel.svelte";
    import CollectionPreview from "$lib/components/CollectionPreview.svelte";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import PreviewSection from "$lib/components/PreviewSection.svelte";
    import { headerState } from "$lib/headerState.svelte.js";

    const { data } = $props();

    headerState.path = [
        {
            name: "Discover",
            url: "/discover",
        },
    ];

    let c1: [any, any][] = $state(
            data.randomGraphs
                .slice(0, 15)
                .map((v, i) => [GraphPreview, { data: v, id: i }]),
        ),
        c2: [any, any][] = $state(
            data.randomGraphs
                .slice(15, 30)
                .map((v, i) => [GraphPreview, { data: v, id: i + 15 }]),
        ),
        c3: [any, any][] = $state(
            data.randomGraphs
                .slice(30, 45)
                .map((v, i) => [GraphPreview, { data: v, id: i + 30 }]),
        );
</script>

<Carousel time={1500} bind:elements={c1} />
<Carousel time={2000} bind:elements={c2} reverse />
<Carousel time={3000} bind:elements={c3} />

<PreviewSection title="Most followed collections">
    {#each data.mostFollowed as collection}
        <CollectionPreview data={collection} />
    {/each}
</PreviewSection>

<PreviewSection title="Most favorited graphs">
    {#each data.mostFavorited as graph}
        <GraphPreview data={graph} />
    {/each}
</PreviewSection>

<PreviewSection title="Freshly updated">
    {#each data.latest as graph}
        <GraphPreview data={graph} />
    {/each}
</PreviewSection>
