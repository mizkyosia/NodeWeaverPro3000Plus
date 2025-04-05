<script lang="ts">
    import { page } from "$app/state";
    import * as icons from "$lib/icons";
    import Icon from "./Icon.svelte";

    let {
        icon,
        label,
        link,
        red = false,
        openedMenu = $bindable(),
        reload = false,
        preload = true,
    }: {
        icon: keyof typeof icons;
        label?: string;
        link: string;
        red?: boolean;
        openedMenu?: boolean;
        reload?: boolean;
        preload?: boolean;
    } = $props();

    const selected = $derived(page.route.id == link);
</script>

<a
    href={link}
    class={["iconLink", { selected }, { red }]}
    onclick={() => (openedMenu = false)}
    data-sveltekit-preload-data={preload ? "hover" : "off"}
    data-sveltekit-reload={reload}
>
    <Icon name={icon} />
    {#if label}
        <span>{label}</span>
    {/if}
</a>
