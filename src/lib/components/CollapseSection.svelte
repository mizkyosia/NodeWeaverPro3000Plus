<script lang="ts">
    import type { Snippet } from "svelte";
    import IconButton from "./IconButton.svelte";

    const {
        title,
        children,
        startOpened = false,
    }: {
        title: string;
        children: Snippet;
        startOpened?: boolean;
    } = $props();

    let opened = $state(startOpened);
</script>

<section class={["collapseSection", { opened }]}>
    <IconButton
        icon="arrowCollapse"
        label={title}
        action={() => (opened = !opened)}
    />
    {#if opened}
        <div class="collapseSection__inner">
            {@render children()}
        </div>
    {/if}
</section>
