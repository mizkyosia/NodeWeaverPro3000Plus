<script lang="ts">
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import image from "$lib/img/placeholder.webp";

    import "$lib/style/discover.scss";

    let titles = [1, 2, 3];
</script>

<h1>Discover</h1>

{#each titles as i}
    <h3>Category {i}</h3>
    <div class="graphList">
    </div>
{/each}
