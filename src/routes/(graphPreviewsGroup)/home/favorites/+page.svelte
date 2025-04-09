<script lang="ts">
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import Icon from "$lib/components/Icon.svelte";

    // Define header state
    import { headerState } from "$lib/headerState.svelte";
    headerState.path = [
        {
            name: "Home",
            url: "/home",
        },
        {
            name: "Favorites",
            url: "/home/favorites",
        },
    ];

    const { data } = $props();
</script>

<h2><Icon name="heart" /> Favorites</h2>
<p>You can favorite a graph by clicking the little heart on its page</p>
<div class="previewList">
    {#each data.favorites as graph}
        <GraphPreview data={graph} />
    {/each}
</div>
