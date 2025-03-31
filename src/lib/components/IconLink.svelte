<script lang="ts">
    import { page } from "$app/state";
    import * as icons from "$lib/icons";
    import Icon from "./Icon.svelte";

    const {
        icon,
        label,
        link,
    }: {
        icon: keyof typeof icons;
        label: string;
        link: string;
    } = $props();

    const selected = $derived(page.route.id == link);
</script>

<a href={link} class={["iconLink", { selected }]}>
    <Icon name={icon} />
    <span>{label}</span>
</a>
