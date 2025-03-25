<script lang="ts">
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import placeholder from "$lib/img/placeholder.webp";

    let data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            name: "Test",
            date: "01/01/1970",
            image: placeholder,
            id: i,
        });
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/src/style/discover.scss" />
</svelte:head>

<div id="editorList" class="graphList">
    {#each data as graph}
        <GraphPreview {...graph} />
    {/each}
</div>
