<script lang="ts">
    import "$lib/style/graphDetails.scss";

    import Dialog from "$lib/components/Dialog.svelte";

    import { fade } from "svelte/transition";
    import { clickOutside } from "$lib/clickOutside";
    import IconButton from "$lib/components/IconButton.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import MultiSelect from "$lib/components/MultiSelect.svelte";
    import type { _GraphDetails } from "$api/graphDetails/+server.js";
    import * as Prisma from "@prisma/client";
    import { setContext } from "svelte";

    const { children, data } = $props();

    let collectionManagerContext: {
        show: boolean;
        collections?: {
            id: number;
            title: string;
            visibility: Prisma.$Enums.Visibility;
            containsGraph: boolean;
        }[];
        newValue: string[];
    } = $state({
        show: false,
        collections: undefined,
        newValue: [],
    });

    let graphDetailsContext: {
        show: boolean;
        data?: _GraphDetails;
    } = $state({
        show: false,
        data: undefined,
    });

    setContext("collectionManager", collectionManagerContext);
    setContext("graphDetails", graphDetailsContext);

    // Derived value
    let collectionOptions = $derived(
        collectionManagerContext.collections?.map((c) => {
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
                graphID: graphDetailsContext.data?.id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const newGraph: _GraphDetails = await res.json();
            graphDetailsContext.data = newGraph;
        });
    }

    async function fetchCollections() {
        if (graphDetailsContext.data == undefined) return;

        collectionManagerContext.show = true;

        fetch(
            `/api/graphDetails?graphID=${graphDetailsContext.data.id}&collectionsOnly`,
            {
                method: "GET",
            },
        ).then(async (res) => {
            collectionManagerContext.collections = (
                await res.json()
            ).collections;
        });
    }

    async function toggleGraphFavorite() {
        if (graphDetailsContext.data == undefined) return;

        graphDetailsContext.data.favorited = !graphDetailsContext.data.favorited;

        fetch("/api/favorite", {
            method: "POST",
            body: JSON.stringify({
                ID: graphDetailsContext.data?.id,
                favorite: graphDetailsContext.data.favorited,
                collection: false,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            graphDetailsContext.data = await res.json();
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
    bind:show={collectionManagerContext.show}
    {onValidate}
>
    {#if collectionManagerContext.collections == undefined}
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
{#if graphDetailsContext.show}
    <div id="graphDetails" transition:fade={{ duration: 100 }}>
        <div
            id="graphDetails__inner"
            use:clickOutside={() => {
                if (!collectionManagerContext.show)
                    graphDetailsContext.show = false;
            }}
        >
            {#if graphDetailsContext.data == undefined}
                <Loader />
            {:else}
                <div id="graphDetails__actions">
                    <h2>{graphDetailsContext.data.title}</h2>
                    <a href="/graph/{graphDetailsContext.data.id}">See more</a>

                    {#if data.user != null}
                        <span>
                            <IconButton
                                icon="box"
                                action={fetchCollections}
                                cssClass={["alt"]}
                            />
                            {#key graphDetailsContext.data.favorited}
                                <IconButton
                                    icon={graphDetailsContext.data.favorited
                                        ? "heartFilled"
                                        : "heart"}
                                    action={toggleGraphFavorite}
                                    cssClass={["alt"]}
                                />
                            {/key}
                        </span>
                    {/if}
                </div>

                {#if graphDetailsContext.data._count != undefined}
                    <div id="graphDetails__stats" class="stats">
                        <span
                            >Favorited by <b
                                >{graphDetailsContext.data._count.favorited}</b
                            > users</span
                        >
                        <hr />
                        <span
                            >Part of <b
                                >{graphDetailsContext.data._count.collections}</b
                            > collections</span
                        >
                        <hr />
                        <span
                            ><b>{graphDetailsContext.data._count.ratings}</b>
                            ratings
                            {#if graphDetailsContext.data.averageRating != null}
                                averaging to
                                <b
                                    >{graphDetailsContext.data.averageRating?.toPrecision(
                                        2,
                                    )}/5</b
                                >
                            {/if}
                        </span>
                    </div>
                {/if}

                <p>
                    {graphDetailsContext.data.description}
                </p>
            {/if}
        </div>
        <span class="backdrop active"></span>
    </div>
{/if}
