<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLInputTypeAttribute } from "svelte/elements";

    let {
        name,
        title,
        value = $bindable(),
        error,
        type,
        required = false,
        forceAnim = false,
        children,
    }: {
        name: string;
        title: string;
        value?: string | null;
        type: HTMLInputTypeAttribute | "textarea" | "select" | "multiselect";
        required?: boolean;
        error?: string | null;
        forceAnim?: boolean;
        children?: Snippet;
    } = $props();

    if (type == "select") forceAnim = true;

    const condition = type == "multiselect";
</script>

<div class="formInput">
    <div class="formInput__inner">
        <label class={{ forceAnim }} for={name}>{title}</label>
        {#if type == "textarea"}
            <textarea bind:value {name} {required} placeholder=" "></textarea>
        {:else if type == "select"}
            <select bind:value {name} {required}>
                {@render children?.()}
            </select>
        {:else if type == "multiselect"}
            <select multiple bind:value {name} {required}>
                {@render children?.()}
            </select>
        {:else}
            <input bind:value {name} {type} {required} placeholder=" " />
        {/if}
    </div>
    {#if error}
        <span class="error">{error}</span>
    {/if}
</div>
