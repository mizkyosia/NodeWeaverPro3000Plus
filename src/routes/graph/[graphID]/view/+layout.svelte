<script lang="ts">
    import GraphLink from "$lib/components/GraphLink.svelte";
    import GraphNode from "$lib/components/GraphNode.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import * as icons from "$lib/icons";

    import { Graph, Node, type Coordinates } from "$lib/graph.svelte.js";
    import "$lib/style/graph.scss";
    import { setContext } from "svelte";
    import { SvelteSet } from "svelte/reactivity";

    const { data, children } = $props();

    const previousData: any = data.graph.data;

    // Instantiate graph
    const graph = Graph.buildFromData(previousData);

    // Tools state
    const _tools: {
        all: {
            name: string;
            icon: keyof typeof icons;
            value: string;
        }[];
        selected: string;
    } = {
        all: [],
        selected: "view",
    };

    // Context states
    let context = $state({
        graph,
        zoom: 1.0,
        editMode: false,
        offset: {
            x: 0.0,
            y: 0.0,
        },
        selectedNodes: new SvelteSet<Node>(),

        rect: {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            width: 0,
            height: 0,
        },

        tools: _tools,

        clickHandler(
            e: MouseEvent & {
                currentTarget: SVGSVGElement & EventTarget;
            },
        ) {},

        viewToGraph(screenPos: Coordinates): Coordinates {
            const distToCenter: Coordinates = {
                x: screenPos.x - this.rect.width / 2,
                y: screenPos.y - this.rect.height / 2,
            };

            return {
                x:
                    distToCenter.x * this.zoom + // Appply zoom
                    this.offset.x + // Offset (scroll)
                    this.rect.width / 2, // Recenter
                y:
                    distToCenter.y * this.zoom + // Appply zoom
                    this.offset.y + // Offset (scroll)
                    this.rect.height / 2, // Recenter
            };
        },

        graphToView(graphPos: Coordinates): Coordinates {
            const distToCenter: Coordinates = {
                x: graphPos.x - this.rect.width / 2,
                y: graphPos.y - this.rect.height / 2,
            };

            return {
                x:
                    (distToCenter.x - this.offset.x) / this.zoom +
                    this.rect.width / 2,
                y:
                    (distToCenter.y - this.offset.y) / this.zoom +
                    this.rect.height / 2,
            };
        },
    });

    // Key states
    const keys = $state({
        ctrl: false,
        shift: false,
    });

    setContext("graphDisplay", context);

    const keyEvent = (e: KeyboardEvent) => {
        keys.ctrl = e.ctrlKey;
        keys.shift = e.shiftKey;

        console.log(keys.ctrl);
    };

    let mousePos = $state({
        x: 0,
        y: 0,
    });
</script>

<svelte:window onkeydown={keyEvent} onkeyup={keyEvent} />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main id="graph">
    <section id="graphData">
        <h2>Nodes</h2>
        <table>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col" colspan="2">Position (x,y)</th>
                </tr>
            </thead>
            <tbody>
                {#each context.graph.nodes as node}
                    <tr>
                        {#if context.editMode}
                            <td><input type="text" value={node.name} /></td
                            >
                            <td
                                ><input
                                    type="number"
                                    bind:value={node.coord.x}
                                    onwheel={(e) => {
                                        e.preventDefault();
                                        node.coord.x += e.deltaY / 5;
                                    }}
                                /></td
                            >
                            <td
                                ><input
                                    type="number"
                                    bind:value={node.coord.y}
                                    onwheel={(e) => {
                                        e.preventDefault();
                                        node.coord.y += e.deltaY / 5;
                                    }}
                                /></td
                            >
                        {:else}
                            <td>{node.name}</td>
                            <td>{node.coord.x.toFixed(2)}</td>
                            <td>{node.coord.y.toFixed(2)}</td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </section>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <svg
        class={context.tools.selected}
        role="application"
        id="graphDisplay"
        bind:contentRect={context.rect}
        onwheel={(e) => {
            // Stop event propagation
            e.preventDefault();
            e.stopImmediatePropagation();

            // Check if we're scrolling or zooming (pinch or scroll + ctrl)
            if (
                keys.ctrl ||
                (Math.abs(e.deltaY) < 5 && Math.abs(e.deltaX) < 5)
            ) {
                // If using ctrl + scroll, reduce delta
                const zoomPower = e.deltaY / (keys.ctrl ? 100 : 1);

                context.zoom *= Math.pow(1.1, zoomPower);
            } else {
                // Update offset based on scroll values and zoom
                context.offset.x += e.deltaX * 0.5 * context.zoom;
                context.offset.y += e.deltaY * 0.5 * context.zoom;
            }
        }}
        onclick={context.clickHandler}
        onmousemove={(e) => {
            mousePos.x = e.layerX;
            mousePos.y = e.layerY;
        }}
    >
        <!-- Render links -->
        {#each context.graph.matrix as row, i}
            {#each row as link, j}
                {#if link != Infinity && link != null}
                    <GraphLink
                        bind:start={context.graph.nodes[i]}
                        bind:end={context.graph.nodes[j]}
                        cost={link}
                    />
                {/if}
            {/each}
        {/each}

        <!-- Link preview -->
        {#if context.selectedNodes.size == 1 && context.tools.selected == "link"}
            {#each context.selectedNodes as selectedNode (selectedNode)}
                <line
                    class="phantom"
                    x1={context.graphToView(selectedNode.coord).x}
                    y1={context.graphToView(selectedNode.coord).y}
                    x2={mousePos.x}
                    y2={mousePos.y}
                />
            {/each}
        {/if}

        <!-- Render nodes -->
        {#each context.graph.nodes as node, i}
            <GraphNode bind:node={graph.nodes[i]} />
        {/each}
    </svg>

    <section id="graphActions">
        <div id="graphActions__picker">
            {#if context.editMode}
                {#each context.tools.all as tool}
                    <IconButton
                        icon={tool.icon}
                        label={tool.name}
                        action={() => {
                            context.tools.selected = tool.value;
                            context.selectedNodes.forEach(
                                (n) => (n.selected = false),
                            );
                        }}
                        cssClass={[
                            context.tools.selected == tool.value
                                ? "selected"
                                : "",
                        ]}
                    />
                {/each}
            {/if}
        </div>
    </section>
</main>

{@render children()}
