<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        title = "Dialog",
        description = "",
        show = $bindable(),
        action = "default",
        confirm = "Confirm",
        children,
        method = "post",
        onValidate,
    }: {
        title?: string;
        description?: string;
        show: boolean;
        action?: string;
        confirm?: string;
        children?: Snippet;
        method?: "post" | "dialog";
        onValidate?: () => void;
    } = $props();

    let dialog: HTMLDialogElement | undefined = $state();
    let submit: HTMLElement | undefined = $state();

    $effect(() => {
        if (show) dialog?.showModal();
    });
</script>

{#if show}
    <dialog
        class="modal"
        bind:this={dialog}
        onclose={() => {
            show = false;
        }}
    >
        {#if title}
            <h4>{@html title}</h4>
        {/if}
        {#if description}
            <p>{@html description}</p>
        {/if}
        <form {method} {action}>
            {@render children?.()}

            <div>
                <input
                    type="submit"
                    style="display: none;"
                    bind:this={submit}
                />
                <button
                    onclick={() => {
                        submit?.click();
                        show = false;
                        onValidate?.();
                    }}>{confirm}</button
                >
                <button
                    onclick={() => {
                        show = false;
                    }}
                    >Cancel
                </button>
            </div>
        </form>
    </dialog>
{/if}
