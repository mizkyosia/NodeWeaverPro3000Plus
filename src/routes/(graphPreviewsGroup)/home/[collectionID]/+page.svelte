<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import IconButton from "$lib/components/IconButton.svelte";

    // Get route params
    const { data } = $props();
    let collection = $state({ inner: data.collection });

    // Define header state
    import { headerState } from "$lib/headerState.svelte";

    headerState.path = [
        {
            name: "Home",
            url: "/home",
        },
        {
            name: collection.inner?.title ?? "Unknown",
            url: "/home/" + (collection.inner?.id ?? ""),
        },
    ];

    // Dialog states
    let deleteDialog = $state(false),
        editDialog = $state(false);

    function updateFavorite() {
        collection.inner.subscribed = !collection.inner.subscribed;

        fetch("/api/favorite", {
            method: "POST",
            body: JSON.stringify({
                ID: collection.inner.id,
                favorite: collection.inner.subscribed,
                collection: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            collection.inner = {
                ...(await res.json()),
                graphs: collection.inner.graphs,
            };
        });
    }
</script>

<!-- Delete dialog -->
<Dialog
    title="Delete"
    description="Are you sure you want to delete this collection ? This operation cannot be undone"
    action="/collection/{collection.inner?.id}?/delete"
    bind:show={deleteDialog}
>
    <input type="hidden" value="/home" name="redirect" /></Dialog
>

<!-- Edit dialog -->
<Dialog
    title="Edit"
    description="Change the title and/or description"
    confirm="Confirm changes"
    action="/collection/{collection.inner?.id}?/edit"
    bind:show={editDialog}
>
    <FormInput
        title="Title"
        name="title"
        type="text"
        value={collection.inner?.title}
    />
    <FormInput
        title="Description"
        name="description"
        type="textarea"
        value={collection.inner?.description}
    />
    <input type="hidden" value="/home/{collection.inner?.id}" name="redirect" />
</Dialog>

<div id="collection__actions">
    <h2>
        <Icon name="box" />{collection.inner.title}
    </h2>
    <div>
        {#key collection.inner.subscribed}
            <IconButton
                icon={collection.inner.subscribed ? "heartFilled" : "heart"}
                label={collection.inner.subscribed ? "Subscribed" : "Subscribe"}
                action={updateFavorite}
            />
        {/key}
        {#if collection.inner.authorId == data.user?.id}
            <IconButton
                icon="edit"
                label="Edit"
                action={() => (editDialog = true)}
            />
            <IconButton
                icon="trash"
                label="Delete"
                action={() => (deleteDialog = true)}
                cssClass={["red"]}
            />
        {/if}
    </div>
</div>
<p>{collection.inner.description}</p>
<div class="stats alt">
    <span><b>XYZ</b> graphs</span>
    <hr />
    <span><b>XYZ</b> followers</span>
    <hr />
    <span
        >Last updated on <b
            >{collection.inner.updatedAt.toLocaleString("fr-FR", {
                dateStyle: "short",
                timeStyle: "short",
            })}</b
        ></span
    >
    <hr />
</div>

<div
    class={collection.inner.graphs.length > 0
        ? "previewList"
        : "collection__empty"}
>
    {#each collection.inner.graphs as graph}
        <GraphPreview data={graph} />
    {:else}
        <h3>This collection is empty !</h3>
        <h4>Start adding graphs now !</h4>
        <a href="/graph/create" class="slimButton"><Icon name="plus" /></a>
    {/each}
</div>
