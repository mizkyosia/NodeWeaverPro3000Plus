<script lang="ts">
    import type { _CollectionDetails } from "$api/collectionDetails/+server.js";
    import { clickOutside } from "$lib/clickOutside";
    import IconButton from "$lib/components/IconButton.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import { getContext, setContext } from "svelte";
    import { fade } from "svelte/transition";

    const { data, children } = $props();

    let collectionDetailsContext: {
        show: boolean;
        data?: _CollectionDetails;
    } = $state({
        show: false,
        data: undefined,
    });

    setContext('collectionDetails', collectionDetailsContext);

    let collectionManagerContext: any = getContext("collectionManager");

    async function toggleCollectionFollow() {
        if (collectionDetailsContext.data == undefined) return;

        collectionDetailsContext.data.subscribed =
            !collectionDetailsContext.data.subscribed;

        fetch("/api/favorite", {
            method: "POST",
            body: JSON.stringify({
                ID: collectionDetailsContext.data.id,
                favorite: collectionDetailsContext.data.subscribed,
                collection: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            collectionDetailsContext.data = await res.json();
        });
    }
</script>

{@render children()}

<!-- Collection details (opened when clicking on a collection preview) -->
{#if collectionDetailsContext.show}
    <div id="graphDetails" transition:fade={{ duration: 100 }}>
        <div
            id="graphDetails__inner"
            use:clickOutside={() => {
                if (!collectionManagerContext.show)
                    collectionDetailsContext.show = false;
            }}
        >
            {#if collectionDetailsContext.data == undefined}
                <Loader />
            {:else}
                <div id="graphDetails__actions">
                    <h2>{collectionDetailsContext.data.title}</h2>
                    <a href="/collection/{collectionDetailsContext.data.id}"
                        >See more</a
                    >

                    {#if data.user != null}
                        <span>
                            {#key collectionDetailsContext.data.subscribed}
                                <IconButton
                                    icon={collectionDetailsContext.data.subscribed
                                        ? "heartFilled"
                                        : "heart"}
                                    action={toggleCollectionFollow}
                                    cssClass={["alt"]}
                                />
                            {/key}
                        </span>
                    {/if}
                </div>

                {#if collectionDetailsContext.data._count != undefined}
                    <div id="graphDetails__stats" class="stats">
                        <span
                            ><b
                                >{collectionDetailsContext.data._count
                                    .subscribers}</b
                            > subscribers</span
                        >
                        <hr />
                        <span
                            >Contains <b
                                >{collectionDetailsContext.data._count.graphs}</b
                            > graphs</span
                        >
                    </div>
                {/if}

                <p>
                    {collectionDetailsContext.data.description}
                </p>
            {/if}
        </div>
        <span class="backdrop active"></span>
    </div>
{/if}
