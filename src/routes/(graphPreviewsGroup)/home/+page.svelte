<script lang="ts">
    import "$lib/style/discover.scss";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import PreviewSection from "$lib/components/PreviewSection.svelte";

    // Define header state
    import { headerState } from "$lib/headerState.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import IconLink from "$lib/components/IconLink.svelte";
    import { getContext } from "svelte";
    headerState.path = [
        {
            name: "Home",
            url: "/home",
        },
    ];

    const { data } = $props();

    const addingCollection: any = getContext("addingCollection");
</script>

<div id="home__title">
    <h2><Icon name="home" /><span>Home</span></h2>
    What will you create next ?
    <span>
        <IconButton
            icon="box"
            label="Collection"
            action={() => {
                addingCollection.adding = true;
            }}
        />
        <IconLink icon="graphGeometry" label="Graph" link="/graph/create" />
    </span>
</div>

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
