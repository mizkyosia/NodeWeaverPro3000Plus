<script lang="ts">
    import { flip } from "svelte/animate";
    import { crossfade } from "svelte/transition";
    import { linear } from "svelte/easing";

    const {
        elements = $bindable(),
        time,
        reverse = false,
        offset = 0,
    }: {
        elements: [any, any][];
        time: number;
        reverse?: boolean;
        offset?: number;
    } = $props();

    let [send, receive] = crossfade({
        easing: linear,
    });

    let delay = $state(1);

    function move() {
        delay = time;
        const firstElem = elements.shift();

        if (firstElem) elements.push(firstElem);
    }

    $effect(() => {
        const id = setInterval(move, delay);

        return () => {
            clearInterval(id);
        };
    });
</script>

<div class="carousel {reverse ? 'alt' : ''}" style="--offset: {offset}%">
    <div class="carousel__inner">
        {#each elements as [El, props] (props.id)}
            <span
                animate:flip={{ duration: time, easing: linear }}
                in:receive={{ key: props.id }}
                out:send={{ key: props.id }}
            >
                <El {...props}></El>
            </span>
        {/each}
    </div>
</div>
