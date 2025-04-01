<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";

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
            name: data.collection,
            url: "/home/" + data.collection,
        },
    ];
</script>

<h2><Icon name="box" />{data.collection}</h2>
<p>A nice description</p>
