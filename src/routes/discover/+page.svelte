<script lang="ts">
    import GraphPreview from "$lib/components/GraphPreview.svelte";

    let data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            name: "Test",
            date: "01/01/1970",
            image: "/images/placeholder.webp",
            id: i,
        });
    }

    let titles = [1, 2, 3];
</script>

<svelte:head>
    <link rel="stylesheet" href="/src/style/discover.scss" />
</svelte:head>

<h1>Discover</h1>

{#each titles as i}
    <h3>Category {i}</h3>
    <div class="graphList">
        {#each data as graph}
            <GraphPreview {...graph} />
        {/each}
    </div>
{/each}
