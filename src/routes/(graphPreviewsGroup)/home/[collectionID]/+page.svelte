<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import Dialog from "$lib/components/Dialog.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    import GraphPreview from "$lib/components/GraphPreview.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import IconButton from "$lib/components/IconButton.svelte";

    // Get route params
    const { data } = $props();

    // Define header state
    import { headerState } from "$lib/headerState.svelte";

    headerState.path = [
        {
            name: "Home",
            url: "/home",
        },
        {
            name: data.collection?.title ?? "Unknown",
            url: "/home/" + (data.collection?.id ?? ""),
        },
    ];

    // Dialog states
    let deleteDialog = $state(false),
        editDialog = $state(false),
        subscribed = $state(true);
</script>

<!-- Delete dialog -->
<Dialog
    title="Delete"
    description="Are you sure you want to delete this collection ? This operation cannot be undone"
    action="/collection/{data.collection?.id}?/delete"
    bind:show={deleteDialog}
>
    <input type="hidden" value="/home" name="redirect" /></Dialog
>

<!-- Edit dialog -->
<Dialog
    title="Edit"
    description="Change the title and/or description"
    confirm="Confirm changes"
    action="/collection/{data.collection?.id}?/edit"
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
    <input type="hidden" value="/home/{data.collection?.id}" name="redirect" />
</Dialog>

{#if data.collection == null}
    <h2>This collection does not exist</h2>
{:else}
    <div id="collection__actions">
        <h2>
            <Icon name="box" />{data.collection.title}
        </h2>
        <div>
            {#if data.collection.authorId == data.user?.id}
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
            {:else}
                <IconButton
                    icon="heartFilled"
                    label="Favorite"
                    action={() => {
                        fetch("/api/favorite", {
                            method: "POST",
                            body: JSON.stringify({
                                ID: data.collection?.id,
                                favorite: false,
                                collection: true,
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }).then(async () => {
                            invalidateAll();
                            goto("/home");
                        });
                    }}
                />
            {/if}
        </div>
    </div>
    <p>{data.collection.description}</p>
    <div class="stats alt">
        <span><b>XYZ</b> graphs</span>
        <hr />
        <span><b>XYZ</b> followers</span>
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

    <div
        class={data.collection.graphs.length > 0
            ? "previewList"
            : "collection__empty"}
    >
        {#each data.collection.graphs as graph}
            <GraphPreview data={graph} />
        {:else}
            <h3>This collection is empty !</h3>
            <h4>Start adding graphs now !</h4>
            <a href="/graph/create" class="slimButton"><Icon name="plus" /></a>
        {/each}
    </div>
{/if}
