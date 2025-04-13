<script lang="ts">
    import IconButton from "$lib/components/IconButton.svelte";
    import IconLink from "$lib/components/IconLink.svelte";

    import "$lib/style/discover.scss";

    const { children } = $props();

    let query = $state("");
    let link = $derived("/discover/" + query + '/all');
</script>

<section id="search">
    <h1>Discover</h1>

    <div id="searchBar">
        <input
            bind:value={query}
            type="text"
            name="query"
            placeholder="Search..."
        />

        <span>
            <IconLink icon="search" bind:link />
        </span>
    </div>
</section>
{@render children()}
