<script lang="ts">
    import "$lib/style/graphDetails.scss";

    import Dialog from "$lib/components/Dialog.svelte";
    import {
    collectionDetailsState,
        collectionManagerState,
        graphDetailsState,
    } from "$lib/previewStates.svelte";

    import { fade } from "svelte/transition";
    import { clickOutside } from "$lib/clickOutside";
    import IconButton from "$lib/components/IconButton.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import MultiSelect from "$lib/components/MultiSelect.svelte";
    import type { _GraphDetails } from "$api/graphDetails/+server.js";

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
            const newGraph: _GraphDetails = await res.json();
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

    async function toggleGraphFavorite() {
        if (graphDetailsState.data == undefined) return;

        graphDetailsState.data.favorited = !graphDetailsState.data.favorited;

        fetch("/api/favorite", {
            method: "POST",
            body: JSON.stringify({
                ID: graphDetailsState.data?.id,
                favorite: graphDetailsState.data.favorited,
                collection: false,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            graphDetailsState.data = await res.json();
        });
    }

    async function toggleCollectionFollow() {
        if (collectionDetailsState.data == undefined) return;

        collectionDetailsState.data.subscribed = !collectionDetailsState.data.subscribed;

        fetch("/api/favorite", {
            method: "POST",
            body: JSON.stringify({
                ID: collectionDetailsState.data.id,
                favorite: collectionDetailsState.data.subscribed,
                collection: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            collectionDetailsState.data = await res.json();
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
                    <h2>{graphDetailsState.data.title}</h2>
                    <a href="/graph/{graphDetailsState.data.id}">See more</a>

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
                                        ? "heartFilled"
                                        : "heart"}
                                    action={toggleGraphFavorite}
                                    cssClass={["alt"]}
                                />
                            {/key}
                        </span>
                    {/if}
                </div>

                {#if graphDetailsState.data._count != undefined}
                    <div id="graphDetails__stats" class="stats">
                        <span
                            >Favorited by <b
                                >{graphDetailsState.data._count.favorited}</b
                            > users</span
                        >
                        <hr />
                        <span
                            >Part of <b
                                >{graphDetailsState.data._count.collections}</b
                            > collections</span
                        >
                        <hr />
                        <span
                            ><b>{graphDetailsState.data._count.ratings}</b>
                            ratings
                            {#if graphDetailsState.data.averageRating != null}
                                averaging to
                                <b
                                    >{graphDetailsState.data.averageRating?.toPrecision(
                                        2,
                                    )}/5</b
                                >
                            {/if}
                        </span>
                    </div>
                {/if}

                <p>
                    {graphDetailsState.data.description}
                </p>
            {/if}
        </div>
        <span class="backdrop active"></span>
    </div>
{/if}

<!-- Collection details (opened when clicking on a collection preview) -->
{#if collectionDetailsState.show}
    <div id="graphDetails" transition:fade={{ duration: 100 }}>
        <div
            id="graphDetails__inner"
            use:clickOutside={() => {
                if (!collectionManagerState.show)
                    collectionDetailsState.show = false;
            }}
        >
            {#if collectionDetailsState.data == undefined}
                <Loader />
            {:else}
                <div id="graphDetails__actions">
                    <h2>{collectionDetailsState.data.title}</h2>
                    <a href="/collection/{collectionDetailsState.data.id}">See more</a>

                    {#if data.user != null}
                        <span>
                            {#key collectionDetailsState.data.subscribed}
                                <IconButton
                                    icon={collectionDetailsState.data.subscribed
                                        ? "heartFilled"
                                        : "heart"}
                                    action={toggleCollectionFollow}
                                    cssClass={["alt"]}
                                />
                            {/key}
                        </span>
                    {/if}
                </div>

                {#if collectionDetailsState.data._count != undefined}
                    <div id="graphDetails__stats" class="stats">
                        <span
                            ><b
                                >{collectionDetailsState.data._count.subscribers}</b
                            > subscribers</span
                        >
                        <hr />
                        <span
                            >Contains <b
                                >{collectionDetailsState.data._count.graphs}</b
                            > graphs</span
                        >
                    </div>
                {/if}

                <p>
                    {collectionDetailsState.data.description}
                </p>
            {/if}
        </div>
        <span class="backdrop active"></span>
    </div>
{/if}