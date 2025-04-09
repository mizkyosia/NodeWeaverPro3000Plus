<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import { headerState } from "$lib/headerState.svelte.js";

    const { data } = $props();

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
            name: data.collection?.title ?? "",
            url: "/collection/" + data.collection?.id,
        },
    ];

    // Dialog states
    let deleteDialog = $state(false),
        editDialog = $state(false);
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
        value={data.collection?.title}
    />
    <FormInput
        title="Description"
        name="description"
        type="textarea"
        value={data.collection?.description}
    />
</Dialog>

{#if data.collection == null}
    <h2>Unknown collection</h2>
{:else}
    <section>
        <div class="actions">
            <h2>{data.collection.title}</h2>
            {#if data.collection.authorId === data.user?.id}
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
            {data.collection.description}
        </p>
        <div class="stats alt">
            <span><b>{data.collection._count.subscribers}</b> subscribers</span>
            <hr />
            <span><b>{data.collection.graphs.length}</b> graphs</span>
            <hr />
            <span
                >Last updated on <b
                    >{data.collection.updatedAt.toLocaleString("fr-FR", {
                        dateStyle: "short",
                        timeStyle: "short",
                    })}</b
                ></span
            >
            <hr />
        </div>

        <div class="previewList">
            {#each data.collection.graphs as graph}
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
