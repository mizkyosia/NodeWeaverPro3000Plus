<!-- 
@component
Used for displaying collection "previews", including name, author, last update & number of graphs
-->
<script lang="ts">
    import IconLink from "./IconLink.svelte";
    import { collectionDetailsState } from "../previewStates.svelte";

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

    let description =
        data.description.length > 100
            ? data.description.substring(0, 100) + "..."
            : data.description;

    // Open collection details panel, and fetch necessary data
    async function openCollectionDetails() {
        collectionDetailsState.show = true;

        if (collectionDetailsState.data?.id == data.id) return;

        collectionDetailsState.data = undefined;

        fetch(`/api/collectionDetails?collectionID=${data.id}`, {
            method: "GET",
        }).then(async (res) => {
            collectionDetailsState.data = await res.json();
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
