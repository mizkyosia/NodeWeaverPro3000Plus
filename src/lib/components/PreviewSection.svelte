<!--
@component
Used to display `GraphPreview` components in a scrollable horizontal container.
TODO : Responsive style for both laptop and mobile rendering
-->
<script lang="ts">
    import Icon from "./Icon.svelte";

    const { children = null, title, link = "" } = $props();

    let currentIndex = $state(0);
</script>

<section class="previewSection">
    <div class="previewSection__topBar">
        <span>{title}</span>
        <hr />
        <a href={link}>See more</a>
        <button
            onclick={() => (currentIndex -= 1)}
            aria-label="Scroll to previous"><Icon name="arrow" /></button
        >
        <button onclick={() => (currentIndex += 1)} aria-label="Scroll to next"
            ><Icon name="arrow" flipped /></button
        >
    </div>
    <div class="previewSection__inner">
        {@render children?.()}
    </div>
</section>
