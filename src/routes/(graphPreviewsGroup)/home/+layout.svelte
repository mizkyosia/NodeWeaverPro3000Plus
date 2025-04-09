<script lang="ts">
    import IconLink from "$lib/components/IconLink.svelte";
    import Dialog from "$lib/components/Dialog.svelte";
    import type { LayoutProps } from "./$types";

    const { children, data }: LayoutProps = $props();

    import "$lib/style/home.scss";
    import Icon from "$lib/components/Icon.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    
    let addingCollection = $state(false);
</script>

<Dialog
    title="Create new collection"
    bind:show={addingCollection}
    action="/home?/addCollection"
>
    <FormInput title="Name" name="title" type="text" />

    <FormInput
        title="Description (optional)"
        type="textarea"
        name="description"
    />
</Dialog>

<main id="home">
    <nav class="buttonList">
        <input id="home__search" type="text" placeholder="Search..." />
        <IconLink label="Home" icon="home" link="/home" />
        <IconLink label="Favorites" icon="heart" link="/home/favorites" />

        <!-- Collections authored by this user -->
        <div class="home__collectionBar">
            <span>My collections</span>
            <hr />
            <button class="slimButton" onclick={() => (addingCollection = true)}
                ><Icon name="plus" /></button
            >
        </div>
        {#each data.collections as c}
            <IconLink label={c.title} icon="box" link="/home/{c.id}" />
        {/each}

        <!-- Collections the user is subscribed to -->
        <div class="home__collectionBar">
            <span>Subscribed</span>
            <hr />
        </div>
        {#each data.subscribed as c}
            <IconLink label={c.title} icon="box" link="/home/{c.id}" />
        {/each}
    </nav>
    <section id="home__collectionDisplay">
        {@render children()}
    </section>
</main>
