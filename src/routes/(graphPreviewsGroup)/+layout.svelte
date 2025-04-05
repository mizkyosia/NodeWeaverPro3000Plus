<script lang="ts">
    import FormInput from "$lib/components/FormInput.svelte";
    import Dialog from "$lib/components/Dialog.svelte";

    const { children } = $props();

    let addDialog = $state(false),
        collectionsToAdd = $state("");
</script>

<!-- "Add to collection" dialog -->
<Dialog
    title="Add"
    description="Choose which collection(s) you want to add this graph to"
    confirm="Confirm changes"
    action=""
    method="dialog"
    bind:show={addDialog}
>
    <FormInput
        type="multiselect"
        title="Collections"
        name="collections"
        bind:value={collectionsToAdd}
    >
        <option>Test</option>
        <option>Foo</option>
        <option>Bar</option>
    </FormInput>
</Dialog>

{@render children()}
