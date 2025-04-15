<script lang="ts">
    import CollectionPreview from "$lib/components/CollectionPreview.svelte";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import "$lib/style/graph.scss";

    const { data } = $props();
</script>

<section>
    {#if data.profile != null}
        <div class="actions"><h2>{data.profile.name}</h2></div>
        <p>
            {data.profile.bio}
        </p>
        <div class="stats alt">
            <span><b>{data.profile._count.graphs}</b> graphs</span>
            <hr />
            <span><b>{data.profile._count.collections}</b> collections</span>
            <hr />
        </div>
        <h2>Collections</h2>
        <div class="previewList">
            {#each data.profile.collections as collection}
                <CollectionPreview data={collection} />
            {/each}
        </div>

        <h2>Graphs</h2>
        <div class="previewList">
            {#each data.profile.graphs as graph}
                <GraphPreview data={graph} />
            {/each}
        </div>
    {:else}
        <h1>Unknown profile</h1>
    {/if}
</section>

<style>
    section {
        padding: 1em;
    }

    p {
        margin-left: 1em;
    }

    .actions {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 1em;
    }

    .actions > h2 {
        gap: 0;
    }

    .actions > h2::before {
        content: "@";
        color: gray;
    }
</style>
