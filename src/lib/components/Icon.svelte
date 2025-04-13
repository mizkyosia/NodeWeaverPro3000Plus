<!--
@component
Thin component wrapper around an svg icon. Simplifies managing different icons
-->

<script lang="ts">
    import * as icons from "$lib/icons";

    let {
        name,
        flipped = false,
    }: {
        name: keyof typeof icons;
        flipped?: boolean;
    } = $props();

    let Image = icons[name];
</script>

<Image />
