<script lang="ts">
    let {
        name,
        title,
        error,
        options = $bindable(),
    }: {
        name: string;
        title: string;
        error?: string;
        options: {
            html: string;
            value: string;
            selected?: boolean;
        }[];
    } = $props();
</script>

<div class="formInput">
    <div class="formInput__inner">
        <label class="forceAnim" for={name}>{title}</label>
        <div class="multiselect">
            {#each options as opt (opt.value)}
                <button
                    class={[
                        "multiselect__option",
                        "iconLink",
                        opt.selected ? "selected" : "",
                    ]}
                    aria-label={opt.value}
                    onclick={(e) => {
                        opt.selected = !opt.selected;

                        options = [...options];

                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }}
                >
                    {@html opt.html}
                </button>
            {/each}
        </div>
    </div>
    {#if error}
        <span class="error">{error}</span>
    {/if}
</div>
