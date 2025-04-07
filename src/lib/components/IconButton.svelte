<script lang="ts">
    import * as icons from "$lib/icons";
    import Icon from "./Icon.svelte";

    let {
        icon,
        label,
        action,
        selected = $bindable(),
        cssClass = [],
    }: {
        icon: keyof typeof icons;
        label?: string;
        action?: () => void;
        selected?: boolean;
        cssClass?: any[];
    } = $props();
</script>

<button
    onclick={action}
    class={["iconLink", { selected }].concat(cssClass)}
>
    <Icon name={icon} />
    {#if label}
        <span>{label}</span>
    {/if}
</button>
