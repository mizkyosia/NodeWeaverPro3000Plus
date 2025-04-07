<script lang="ts">
    import "$lib/style/graphDetails.scss";

    import Dialog from "$lib/components/Dialog.svelte";
    import {
        collectionManagerState,
        graphDetailsState,
        type GraphDetails,
    } from "$lib/graphPreviewStates.svelte";

    import { fade } from "svelte/transition";
    import { clickOutside } from "$lib/clickOutside";
    import IconButton from "$lib/components/IconButton.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import MultiSelect from "$lib/components/MultiSelect.svelte";

    const { children, data } = $props();

    // Derived value
    let collectionOptions = $derived(
        collectionManagerState.collections?.map((c) => {
            return {
                value: c.id.toString(),
                selected: c.containsGraph,
                html: `${c.title} <span class="details">${c.visibility}</span>`,
            };
        }) ?? [],
    );

    // Edit the graph's collections
    async function onValidate() {
        const toConnect = [],
            toDisconnect = [];

        for (let collection of collectionOptions) {
            if (collection.selected) toConnect.push(collection.value);
            else toDisconnect.push(collection.value);
        }

        fetch("/api/editCollections", {
            method: "POST",
            body: JSON.stringify({
                toConnect,
                toDisconnect,
                graphID: graphDetailsState.data?.id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const newGraph: GraphDetails = await res.json();
            graphDetailsState.data = newGraph;
        });
    }

    async function fetchCollections() {
        if (graphDetailsState.data == undefined) return;

        collectionManagerState.show = true;

        fetch(
            `/api/graphDetails?graphID=${graphDetailsState.data.id}&collectionsOnly`,
            {
                method: "GET",
            },
        ).then(async (res) => {
            collectionManagerState.collections = (await res.json()).collections;
        });
    }

    async function toggleFavorite() {
        if (graphDetailsState.data == undefined) return;

        graphDetailsState.data.favorited = !graphDetailsState.data.favorited;

        fetch("/api/favorite", {
            method: "POST",
            body: JSON.stringify({
                graphID: graphDetailsState.data?.id,
                favorite: graphDetailsState.data.favorited,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            if (graphDetailsState.data != undefined)
                graphDetailsState.data.favorited = (await res.json()).favorited;
        });
    }
</script>

{@render children()}

<!-- "Add to collection" dialog -->
<Dialog
    title="Add"
    description="Choose which collection(s) you want to add this graph to"
    confirm="Confirm changes"
    action=""
    method="dialog"
    bind:show={collectionManagerState.show}
    {onValidate}
>
    {#if collectionManagerState.collections == undefined}
        <Loader />
    {:else}
        <MultiSelect
            name="collections"
            title="Collections"
            bind:options={collectionOptions}
        />
    {/if}
</Dialog>

<!-- Graph details (opened when clicking on a graph preview) -->
{#if graphDetailsState.show}
    <div id="graphDetails" transition:fade={{ duration: 100 }}>
        <div
            id="graphDetails__inner"
            use:clickOutside={() => {
                if (!collectionManagerState.show)
                    graphDetailsState.show = false;
            }}
        >
            {#if graphDetailsState.data == undefined}
                <Loader />
            {:else}
                <div id="graphDetails__actions">
                    <h2>Graph name</h2>

                    {#if data.user != null}
                        <span>
                            <IconButton
                                icon="box"
                                action={fetchCollections}
                                cssClass={["alt"]}
                            />
                            {#key graphDetailsState.data.favorited}
                                <IconButton
                                    icon={graphDetailsState.data.favorited
                                        ? "starFilled"
                                        : "star"}
                                    action={toggleFavorite}
                                    cssClass={["alt"]}
                                />
                            {/key}
                        </span>
                    {/if}
                </div>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores nostrum totam asperiores quae. Inventore libero iste
                    possimus officia explicabo aspernatur. Excepturi consectetur
                    sint quos quidem error ducimus quae possimus eos.
                </p>
            {/if}
        </div>
        <span class="backdrop active"></span>
    </div>
{/if}
