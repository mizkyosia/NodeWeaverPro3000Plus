<!-- 
@component
Used for displaying graph "previews", including name, author, time and an image
-->
<script lang="ts">
    import type { Graph, User } from "@prisma/client";
    import Icon from "./Icon.svelte";

    const {
        graph,
        author,
    }: {
        graph: Graph;
        author: User;
    } = $props();
</script>

<a href="/graph/{graph.id}" class="graphPreview">
    <h4>{graph.title}</h4>
    <p>{graph.description}</p>

    <span
        ><Icon name="settings" />
        {graph.updatedAt.toLocaleString(undefined, {
            dateStyle: "short",
            timeStyle: "short",
        })}</span
    >

    <span>
        <Icon name="account" />
        {author.name}
    </span>
</a>
