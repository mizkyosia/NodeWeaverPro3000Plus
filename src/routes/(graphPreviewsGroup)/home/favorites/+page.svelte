<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";

    // Define header state
    import { headerState } from "$lib/headerState.svelte";
    headerState.path = [
        {
            name: "Home",
            url: "/home",
        },
        {
            name: "Favorites",
            url: "/home/favorites",
        },
    ];
</script>

<h2><Icon name="star" /> Favorites</h2>
<p>You can favorite a graph by clicking the little star on its page</p>
