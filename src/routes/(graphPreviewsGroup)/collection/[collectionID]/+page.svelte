<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import { headerState } from "$lib/headerState.svelte.js";

    const { data } = $props();

    let collection = $state({ inner: data.collection });

    headerState.path = [
        {
            name: "Discover",
            url: "/discover",
        },
        {
            name: "Collections",
            url: "/discover/collections",
        },
        {
            name: collection.inner?.title ?? "",
            url: "/collection/" + collection.inner?.id,
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
    action="?/delete"
    bind:show={deleteDialog}
></Dialog>

<!-- Edit dialog -->
<Dialog
    title="Edit"
    description="Change the title and/or description"
    confirm="Confirm changes"
    action="?/edit"
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

    <FormInput name="visibility" title="Visibility" type="select">
        <option
            value="PRIVATE"
            selected={collection.inner?.visibility == "PRIVATE"}>PRIVATE</option
        >
        <option
            value="PUBLIC"
            selected={collection.inner?.visibility == "PUBLIC"}>PUBLIC</option
        >
        <option
            value="RESTRICTED"
            selected={collection.inner?.visibility == "RESTRICTED"}
            >RESTRICTED</option
        >
    </FormInput>
</Dialog>

{#if collection.inner == null}
    <h2>Unknown collection</h2>
{:else}
    <section>
        <div class="actions">
            <h2>{collection.inner.title}</h2>
            {#key collection.inner.subscribed}
                <IconButton
                    icon={collection.inner.subscribed ? "heartFilled" : "heart"}
                    label={collection.inner.subscribed
                        ? "Subscribed"
                        : "Subscribe"}
                    action={updateFavorite}
                />
            {/key}
            {#if collection.inner.authorId === data.user?.id}
                <IconButton
                    icon="edit"
                    label="Edit"
                    action={() => (editDialog = true)}
                />
                <IconButton
                    icon="trash"
                    label="Delete"
                    cssClass={["red"]}
                    action={() => (deleteDialog = true)}
                />
            {/if}
        </div>
        <p>
            {collection.inner.description}
        </p>
        <div class="stats alt">
            <span><b>{collection.inner._count.subscribers}</b> subscribers</span
            >
            <hr />
            <span><b>{collection.inner.graphs.length}</b> graphs</span>
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

        <div class="previewList">
            {#each collection.inner.graphs as graph}
                <GraphPreview data={graph} />
            {/each}
        </div>
    </section>
{/if}

<style>
    section {
        padding: 1em;
    }

    p {
        margin-left: 1em;
    }

    .actions {
        display: flex;
        flex-direction: row;
        align-items: center;

        gap: 1em;
    }
</style>
