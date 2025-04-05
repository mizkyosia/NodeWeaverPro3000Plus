<script lang="ts">
    import * as icons from "$lib/icons";
    import Icon from "./Icon.svelte";

    let {
        icon,
        label,
        action,
        red = false,
        selected = $bindable(),
    }: {
        icon: keyof typeof icons;
        label?: string;
        action: () => void;
        red?: boolean;
        selected?: boolean;
    } = $props();
</script>

<button onclick={action} class={["iconLink", { selected }, { red }]}>
    <Icon name={icon} />
    {#if label}
        <span>{label}</span>
    {/if}
</button>
