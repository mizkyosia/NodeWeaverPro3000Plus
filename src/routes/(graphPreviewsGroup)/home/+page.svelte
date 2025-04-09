<script lang="ts">
    import "$lib/style/discover.scss";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import PreviewSection from "$lib/components/PreviewSection.svelte";

    // Define header state
    import { headerState } from "$lib/headerState.svelte";
    headerState.path = [
        {
            name: "Home",
            url: "/home",
        },
    ];

    const { data } = $props();
</script>

<PreviewSection title="Finish what you started">
    {#each data.homeGraphs.lastUpdated as graph}
        <GraphPreview data={graph} />
    {/each}
</PreviewSection>

<PreviewSection title="Your best work !">
    {#each data.homeGraphs.favorites as graph}
        <GraphPreview data={graph} />
    {/each}
</PreviewSection>

<!--
<PreviewSection title="Recently worked on">
    {#each data as graph}
        <GraphPreview {...graph} />
    {/each}
</PreviewSection> -->
