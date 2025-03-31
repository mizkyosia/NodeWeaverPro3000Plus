<script lang="ts">
    import IconLink from "$lib/components/IconLink.svelte";
    import Dialog from "$lib/components/Dialog.svelte";

    const { children } = $props();

    import "$lib/style/home.scss";
    import Icon from "$lib/components/Icon.svelte";

    let addingCollection = $state(false);
    let collectionName = $state("");
</script>

<svelte:head></svelte:head>

<Dialog
    title="Create new collection"
    bind:show={addingCollection}
    onComplete={
        () => {
            console.log("Adding collection : " + collectionName);
            collectionName = "New Collection";
        }
    }
>
    <input
        type="text"
        bind:value={collectionName}
        placeholder="New Collection"
    />
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
        <IconLink label="Collection 1" icon="box" link="/home/abc" />
    </nav>
    <section>
        {@render children()}
    </section>
</main>
