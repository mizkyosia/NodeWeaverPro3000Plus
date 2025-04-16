<script lang="ts">
    import "$lib/style/anim.scss";
    import { onMount } from "svelte";

    const { children } = $props();

    const ANIM_PADDING = 50,
        ANIM_INTERVAL = 50;

    const animatedGraph: {
        rect: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        nodes: {
            x: number;
            y: number;
            delay: number;
            dx: number;
            dy: number;
            speed: number;
        }[];
    } = $state({
        nodes: [],
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
    });

    function randomizeNode(node: {
        x: number;
        y: number;
        dx: number;
        dy: number;
        speed: number;
    }) {
        let random = Math.floor(Math.random() * 4);
        let angle = (Math.random() * Math.PI * 2) / 3 + Math.PI / 6;

        // If y is "blocked" axis
        if (random & 2) {
            if (random & 1) {
                node.y = -5;
                angle = -angle;
            } else {
                node.y = animatedGraph.rect.height + ANIM_PADDING - 5;
            }

            node.x =
                (Math.random() * animatedGraph.rect.width * 2) / 3 +
                animatedGraph.rect.width / 6;
        } else {
            if (random & 1) {
                node.x = -5;
                angle -= Math.PI / 2;
            } else {
                node.x = animatedGraph.rect.width + ANIM_PADDING - 5;
                angle += Math.PI / 2;
            }

            node.y =
                (Math.random() * animatedGraph.rect.height * 2) / 3 +
                animatedGraph.rect.height / 6;
        }

        node.dx = Math.cos(angle);
        node.dy = Math.sin(angle);
        node.speed = Math.floor(Math.random() * 20) + 10;
    }

    onMount(() => {
        for (let i = 0; i < 50; i++) {
            let angle = Math.PI * 2 * Math.random();

            let node = {
                x: Math.random() * 1000,
                y: Math.random() * 1000,
                delay: -Math.random() * 15,
                dx: Math.cos(angle),
                dy: Math.sin(angle),
                speed: Math.floor(Math.random() * 20) + 10,
            };
            animatedGraph.nodes.push(node);
        }

        const id = setInterval(() => {
            for (let node of animatedGraph.nodes) {
                node.x += (node.speed * node.dx * ANIM_INTERVAL) / 1000;
                node.y += (node.speed * node.dy * ANIM_INTERVAL) / 1000;

                if (
                    node.x < -ANIM_PADDING ||
                    node.x > animatedGraph.rect.width + ANIM_PADDING ||
                    node.y < -ANIM_PADDING ||
                    node.y > animatedGraph.rect.height + ANIM_PADDING
                )
                    randomizeNode(node);
            }
        }, ANIM_INTERVAL);
        return () => {
            clearInterval(id);
        };
    });
</script>

<main id="anim">
    <svg bind:contentRect={animatedGraph.rect}>
        {#each animatedGraph.nodes as node, i}
            {#each animatedGraph.nodes as other, j}
                {#if i % 3 == j % 3}
                    <line
                        style:opacity={0.7 -
                            Math.sqrt(
                                Math.pow(other.x - node.x, 2) +
                                    Math.pow(other.y - node.y, 2),
                            ) /
                                450}
                        x1={node.x}
                        x2={other.x}
                        y1={node.y}
                        y2={other.y}
                    />
                {/if}
            {/each}
        {/each}

        {#each animatedGraph.nodes as node}
            <circle
                cx={node.x}
                cy={node.y}
                r="4"
                class="ignoreStyle"
                style="--delay: {node.delay}s"
            />
        {/each}
    </svg>

    {@render children()}
</main>
