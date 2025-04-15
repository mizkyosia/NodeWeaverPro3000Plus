<!-- 
@component
Used for displaying collection "previews", including name, author, last update & number of graphs
-->
<script lang="ts">
    import { getContext } from "svelte";
    import IconLink from "./IconLink.svelte";
    import type { _CollectionDetails } from "$api/collectionDetails/+server";

    const {
        data,
    }: {
        data: {
            updatedAt: Date;
            title: string;
            description: string;
            id: number;
            author: {
                id: number;
                name: string;
            } | null;
            _count: {
                graphs: number;
            };
        };
    } = $props();

    let collectionDetailsContext: {
        show: boolean;
        data?: _CollectionDetails;
    } = getContext("collectionDetails");

    let description =
        data.description.length > 100
            ? data.description.substring(0, 100) + "..."
            : data.description;

    // Open collection details panel, and fetch necessary data
    async function openCollectionDetails() {
        collectionDetailsContext.show = true;

        if (collectionDetailsContext.data?.id == data.id) return;

        collectionDetailsContext.data = undefined;

        fetch(`/api/collectionDetails?collectionID=${data.id}`, {
            method: "GET",
        }).then(async (res) => {
            collectionDetailsContext.data = await res.json();
        });
    }
</script>

<button class="graphPreview" onclick={openCollectionDetails}>
    <h4>{data.title}</h4>
    <p>{description}</p>

    <IconLink
        icon="account"
        label={data.author?.name}
        link=""
        cssClass={["slimButton", "noHover"]}
    />

    <IconLink
        icon="rewind"
        label={data.updatedAt.toLocaleString("fr-FR", {
            dateStyle: "short",
            timeStyle: "short",
        })}
        cssClass={["slimButton", "noHover"]}
        link=""
    />
</button>
