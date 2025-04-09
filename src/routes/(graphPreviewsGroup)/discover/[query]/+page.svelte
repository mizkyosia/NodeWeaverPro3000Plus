<script lang="ts">
    import { page } from "$app/state";
    import CollectionPreview from "$lib/components/CollectionPreview.svelte";
    import DataPreview from "$lib/components/GraphPreview.svelte";
    import PreviewSection from "$lib/components/PreviewSection.svelte";
    import { headerState } from "$lib/headerState.svelte";

    const { data } = $props();

    headerState.path = [
        {
            name: "Discover",
            url: "/discover",
        },
        {
            name: "Search",
            url: page.url.toString(),
        },
    ];
</script>

<PreviewSection title="Graphs" link="?/graphs">
    {#each data.graphs as graph}
        <DataPreview data={graph} />
    {/each}
</PreviewSection>

<PreviewSection title="Collections" link="?/collections">
    {#each data.collections as collection}
        <CollectionPreview data={collection} />
    {/each}
</PreviewSection>
