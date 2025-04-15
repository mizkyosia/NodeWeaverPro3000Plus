<script lang="ts">
    import { goto } from "$app/navigation";
    import IconButton from "$lib/components/IconButton.svelte";
    import IconLink from "$lib/components/IconLink.svelte";

    import "$lib/style/discover.scss";

    const { children } = $props();

    let query = $state(""),
        allowGraphs = $state(true),
        allowCollections = $state(true);
    let link = $derived(
        "/discover/" +
            query +
            "/" +
            (allowCollections
                ? allowGraphs
                    ? "all"
                    : "collections"
                : "graphs"),
    );
</script>

<section id="search">
    <h1>Discover</h1>

    <div id="searchBar">
        <input
            bind:value={query}
            type="text"
            name="query"
            placeholder="Search..."
            onkeydown={(e) => {
                if(e.key == "Enter") goto(link);
            }}
        />

        <span>
            <IconLink icon="search" bind:link />
        </span>
    </div>

    <h4>Search parameters :</h4>
    <div>
        <span>Graphs <input bind:checked={allowGraphs} type="checkbox" /></span>
        <span
            >Collections <input
                bind:checked={allowCollections}
                type="checkbox"
            /></span
        >
    </div>
</section>
{@render children()}
