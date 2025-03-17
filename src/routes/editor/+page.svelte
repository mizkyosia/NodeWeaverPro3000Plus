<script lang="ts">
    import GraphPreview from "./GraphPreview.svelte";

    let data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            name: "Test",
            date: "01/01/1970",
            image: "/images/placeholder.webp",
            id: i
        });
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/style/editorList.scss" />
</svelte:head>

<div id="graphList">
    {#each data as graph}
        <GraphPreview {...graph} />
    {/each}
</div>
