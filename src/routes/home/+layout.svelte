<script lang="ts">
    import IconLink from "$lib/components/IconLink.svelte";
    import Dialog from "$lib/components/Dialog.svelte";
    import type { LayoutProps } from "./$types";

    const { children, data }: LayoutProps = $props();

    import "$lib/style/home.scss";
    import Icon from "$lib/components/Icon.svelte";

    console.log("Collections to add : ", data.collections.length);

    let addingCollection = $state(false);
    let collection = $state({
        name: "",
        description: "",
    });
</script>

<Dialog
    title="Create new collection"
    bind:show={addingCollection}
    onComplete={() => {
        console.log("Adding collection : ", $state.snapshot(collection));
        collection = {
            name: "",
            description: "",
        };
    }}
>
    <input
        type="text"
        bind:value={collection.name}
        placeholder="New Collection"
    />

    <textarea
        bind:value={collection.description}
        placeholder="Description (optional)"
    ></textarea>
</Dialog>

<main id="home">
    <nav class="buttonList">
        <input id="home__search" type="text" placeholder="Search..." />
        <IconLink label="Home" icon="home" link="/home" />
        <IconLink label="Favorites" icon="star" link="/home/favorites" />
        <div id="home__collectionBar">
            <span>Collections</span>
            <hr />
            <button class="slimButton" onclick={() => (addingCollection = true)}
                ><Icon name="plus" /></button
            >
        </div>
        {#each data.collections as c}
            <IconLink label={c.title} icon="box" link="/home/{c.id}" />
        {/each}
    </nav>
    <section>
        {@render children()}
    </section>
</main>
