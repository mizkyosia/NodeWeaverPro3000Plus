<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import IconLink from "$lib/components/IconLink.svelte";
    import { headerState } from "$lib/headerState.svelte.js";

    const { data } = $props();

    headerState.path = [
        {
            name: "Discover",
            url: "/discover",
        },
        {
            name: "Graphs",
            url: "/discover/graphs",
        },
        {
            name: data.graph?.title ?? "",
            url: "/graph/" + data.graph?.id,
        },
    ];

    // Dialog states
    let deleteDialog = $state(false),
        editDialog = $state(false);
</script>

<!-- Delete dialog -->
<Dialog
    title="Delete"
    description="Are you sure you want to delete this graph ? This operation cannot be undone"
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
        value={data.graph?.title}
    />
    <FormInput
        title="Description"
        name="description"
        type="textarea"
        value={data.graph?.description}
    />
</Dialog>

{#if data.graph == null}
    <h2>Unknown graph</h2>
{:else}
    <section>
        <div class="actions">
            <h2>{data.graph.title}</h2>
            <IconLink
                icon="graphNetwork"
                label="Graph"
                link="./{data.graph.id}/view"
            />
            {#if data.graph.authorId === data.user?.id}
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
            {data.graph.description}
        </p>
        <div class="stats alt">
            <span
                >Created by <b>
                    {#if data.graph.author != null}
                        <a href="/profile/{data.graph.author.id}"
                            >{data.graph.author.name}</a
                        >
                    {:else}
                        Unknown
                    {/if}
                </b></span
            >
            <hr />
            <span><b>{data.graph._count.favorited}</b> favorites</span>
            <hr />
            <span><b>{data.graph._count.ratings}</b> ratings</span>
            <hr />
            <span
                >Last updated on <b
                    >{data.graph.updatedAt.toLocaleString("fr-FR", {
                        dateStyle: "short",
                        timeStyle: "short",
                    })}</b
                ></span
            >
            <hr />
        </div>

        <div class="previewList">
            {#each data.graph.ratings as rating}
                <!-- <GraphPreview data={rating} /> -->
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
