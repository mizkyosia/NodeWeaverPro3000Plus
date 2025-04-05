<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
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
        addDialog = $state(false);
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
    <h2>This collection does not exist</h2>
{:else}
    <div id="collection__actions">
        <h2>
            <Icon name="box" />{data.collection.title}
        </h2>

        {#if data.author}
            <div>
                <IconButton
                    icon="edit"
                    label="Edit"
                    action={() => (editDialog = true)}
                />
                <IconButton
                    icon="trash"
                    label="Delete"
                    action={() => (deleteDialog = true)}
                    red
                />
            </div>
        {/if}
    </div>
    <p>{data.collection.description}</p>
    <hr />

    {#if data.collection.graphs.length > 0}
        <div class="previewList"></div>
    {:else}
        <div class="collection__empty">
            <h3>This collection is empty !</h3>
            <h4>Start adding graphs now !</h4>
            <a href="/discover" class="slimButton"><Icon name="plus" /></a>
        </div>
    {/if}
{/if}
