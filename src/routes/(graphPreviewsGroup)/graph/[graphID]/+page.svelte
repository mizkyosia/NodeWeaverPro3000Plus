<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import IconLink from "$lib/components/IconLink.svelte";
    import { headerState } from "$lib/headerState.svelte.js";
    import { getContext } from "svelte";

    const { data } = $props();

    let graph = $state({ inner: data.graph });

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
            name: graph.inner?.title ?? "",
            url: "/graph/" + graph.inner?.id,
        },
    ];

    const collectionManager: any = getContext("collectionManager");
    const graphDetails: any = getContext("graphDetails");

    graphDetails.data = data.graph;

    // Dialog states
    let deleteDialog = $state(false),
        editDialog = $state(false),
        date = $derived(graph.inner.updatedAt.toLocaleString("en-US"));

    function updateFavorite() {
        graph.inner.favorited = !graph.inner.favorited;

        fetch("/api/favorite", {
            method: "POST",
            body: JSON.stringify({
                ID: graph.inner.id,
                favorite: graph.inner.favorited,
                collection: false,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            graph.inner = await res.json();
        });
    }

    async function fetchCollections() {
        collectionManager.show = true;

        fetch(`/api/graphDetails?graphID=${data.graph.id}&collectionsOnly`, {
            method: "GET",
        }).then(async (res) => {
            collectionManager.collections = (await res.json()).collections;
        });
    }
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
        value={graph.inner?.title}
    />
    <FormInput
        title="Description"
        name="description"
        type="textarea"
        value={graph.inner?.description}
    />

    <span>
        Public ?
        <input type="checkbox" name="public" checked={graph.inner?.public} />
    </span>
</Dialog>

{#if graph.inner == null}
    <h2>Unknown graph</h2>
{:else}
    <section>
        <div class="actions">
            <h2>{graph.inner.title}</h2>
            <IconLink
                icon="graphNetwork"
                label="Graph"
                link="./{graph.inner.id}/view"
            />

            <IconButton
                icon="box"
                label="Collections"
                action={fetchCollections}
            />
            {#key graph.inner.favorited}
                <IconButton
                    icon={graph.inner.favorited ? "heartFilled" : "heart"}
                    label={graph.inner.favorited ? "Unfavorite" : "Favorite"}
                    action={updateFavorite}
                />
            {/key}

            {#if graph.inner.authorId === data.user?.id}
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
            {graph.inner.description}
        </p>
        <div class="stats alt">
            <span
                >Created by <b>
                    {#if graph.inner.author != null}
                        <a href="/profile/{graph.inner.author.id}"
                            >{graph.inner.author.name}</a
                        >
                    {:else}
                        Unknown
                    {/if}
                </b></span
            >
            <hr />
            <span><b>{graph.inner._count.favorited}</b> favorites</span>
            <hr />
            <span><b>{graph.inner._count.ratings}</b> ratings</span>
            <hr />
            <span>In <b>{graph.inner._count.collections}</b> collections</span>
            <hr />
            <span
                >Last updated on <b>
                    {#key graph.inner.updatedAt}
                        {date}
                    {/key}</b
                ></span
            >
            <hr />
        </div>

        <div class="previewList"></div>
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
