<!-- 
@component
Used for displaying graph "previews", including name, author, time and an image
-->
<script lang="ts">
    import { getContext } from "svelte";
    import IconLink from "./IconLink.svelte";
    import type { _GraphDetails } from "$api/graphDetails/+server";

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
        };
    } = $props();

    let graphDetailsContext: {
        show: boolean;
        data?: _GraphDetails;
    } = getContext("graphDetails");

    let description =
        data.description.length > 100
            ? data.description.substring(0, 100) + "..."
            : data.description;

    // Open graph details panel, and fetch necessary data
    async function openGraphDetails() {
        graphDetailsContext.show = true;

        if (graphDetailsContext.data?.id == data.id) return;

        graphDetailsContext.data = undefined;

        fetch(`/api/graphDetails?graphID=${data.id}`, {
            method: "GET",
        }).then(async (res) => {
            graphDetailsContext.data = await res.json();
        });
    }
</script>

<button class="graphPreview" onclick={openGraphDetails}>
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
