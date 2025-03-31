<script lang="ts">
    let {
        title,
        description = "",
        show = $bindable(),
        error = $bindable(),
        onComplete = null,
        onCancel = null,
        children,
    } = $props();

    let dialog: HTMLDialogElement | undefined = $state();

    $effect(() => {
        if (show) dialog?.showModal();
    });
</script>

{#if show}
    <dialog class="modal" bind:this={dialog}>
        <h4>{title}</h4>
        {#if description}
            <p>{description}</p>
        {/if}
        {#if error}
            <span class="error">All fields must be completed !</span>
        {/if}
        <form method="dialog">
            {@render children()}

            <div>
                <button
                    onclick={() => {
                        show = false;
                        onComplete?.();
                    }}>Confirm</button
                >
                <button
                    onclick={() => {
                        show = false;
                        onCancel?.();
                    }}
                    >Cancel
                </button>
            </div>
        </form>
    </dialog>
{/if}
