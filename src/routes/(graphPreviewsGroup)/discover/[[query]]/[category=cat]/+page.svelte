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

{#if data.category == "all" && data.graphs != undefined && data.collections != undefined}
    <div>
        
    </div>
    <PreviewSection title="Graphs" link="./graphs">
        {#each data.graphs as graph}
            <DataPreview data={graph} />
        {/each}
    </PreviewSection>

    <PreviewSection title="Collections" link="./collections">
        {#each data.collections as collection}
            <CollectionPreview data={collection} />
        {/each}
    </PreviewSection>
{:else if data.category == "collections" && data.collections != undefined}
    <div class="previewList">
        {#each data.collections as collection}
            <CollectionPreview data={collection} />
        {/each}
    </div>
{:else if data.graphs != undefined}
    <div class="previewList">
        {#each data.graphs as graph}
            <DataPreview data={graph} />
        {/each}
    </div>
{/if}
