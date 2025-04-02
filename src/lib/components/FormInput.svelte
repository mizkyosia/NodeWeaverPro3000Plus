<script lang="ts">
    import type { HTMLInputTypeAttribute } from "svelte/elements";

    let {
        name,
        title,
        value = $bindable(),
        error = $bindable(),
        type,
        required = false,
        forceAnim = false,
    }: {
        name: string;
        title: string;
        value?: string | null;
        type: HTMLInputTypeAttribute;
        required?: boolean;
        error?: string | null;
        forceAnim?: boolean;
    } = $props();
</script>

<div class="formInput">
    {#if error}
        <span class="error">{error}</span>
    {/if}
    <div class="formInput__inner">
        <label class={{ forceAnim }} for={name}>{title}</label>
        <input bind:value {name} {type} {required} placeholder=" " />
    </div>
</div>
