<script lang="ts">
    import GraphLink from "$lib/components/GraphLink.svelte";
    import GraphNode from "$lib/components/GraphNode.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import * as icons from "$lib/icons";

    import { Graph, Node, type Coordinates } from "$lib/graph.svelte.js";
    import "$lib/style/graph.scss";
    import { onMount, setContext } from "svelte";
    import { SvelteSet } from "svelte/reactivity";
    import IconLink from "$lib/components/IconLink.svelte";
    import CollapseSection from "$lib/components/CollapseSection.svelte";
    import { render } from "svelte/server";

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
        zoom: 100,
        editMode: false,
        offset: {
            x: 0.0,
            y: 0.0,
        },
        selectedNodes: new SvelteSet<Node>(),
        selectedLinks: new SvelteSet<string>(),

        display: {
            nodes: false,
            links: false,
        },

        rect: {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            width: 0,
            height: 0,
        },

        tools: _tools,

        inputs: {
            ctrl: false,
            shift: false,
            mouseDown: false,
            movingNode: false,
        },

        clickHandler(
            e: MouseEvent & {
                currentTarget: SVGSVGElement & EventTarget;
            },
        ) {
            if (context.inputs.movingNode) return;
            context.selectedLinks.clear();
            context.selectedNodes.forEach((n) => (n.selected = false));
        },

        viewToGraph(
            screenPos: Coordinates,
            center: boolean = false,
        ): Coordinates {
            const distToCenter: Coordinates = {
                x: screenPos.x - (center ? this.rect.width / 2 : 0),
                y: screenPos.y - (center ? this.rect.height / 2 : 0),
            };

            return {
                x:
                    distToCenter.x / this.zoom + // Appply zoom
                    this.offset.x + // Offset (scroll)
                    (center ? 0 : this.rect.width / 2), // Recenter
                y:
                    distToCenter.y / this.zoom + // Appply zoom
                    this.offset.y + // Offset (scroll)
                    (center ? 0 : this.rect.height / 2), // Recenter
            };
        },

        graphToView(
            graphPos: Coordinates,
            center: boolean = false,
        ): Coordinates {
            const distToCenter: Coordinates = {
                x: graphPos.x - (center ? this.rect.width / 2 : 0),
                y: graphPos.y - (center ? this.rect.height / 2 : 0),
            };

            return {
                x:
                    (distToCenter.x - this.offset.x) * this.zoom +
                    (center ? 0 : this.rect.width / 2),
                y:
                    (distToCenter.y - this.offset.y) * this.zoom +
                    (center ? 0 : this.rect.height / 2),
            };
        },
    });

    setContext("graphDisplay", context);

    const keyEvent = (e: KeyboardEvent) => {
        context.inputs.ctrl = e.ctrlKey;
        context.inputs.shift = e.shiftKey;
    };

    let mousePos = $state({
        x: 0,
        y: 0,
    });
</script>

<svelte:window
    onkeydown={keyEvent}
    onkeyup={keyEvent}
    onmousedown={() => {
        context.inputs.mouseDown = true;
    }}
    onmouseup={() => {
        context.inputs.mouseDown = false;
        context.inputs.movingNode = false;
    }}
    onmousemove={(e) => {
        if (context.inputs.movingNode && context.editMode) {
            context.selectedNodes.forEach((n) => {
                n.coord.x += e.movementX / context.zoom;
                n.coord.y += e.movementY / context.zoom;
            });
        }
    }}
/>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main id="graph">
    <section id="graphData">
        <!-- Viewport params -->
        <CollapseSection title="Viewport" startOpened>
            <span
                >Zoom : <input
                    bind:value={context.zoom}
                    onwheel={(e) => {
                        context.zoom *= Math.pow(1.1, -Math.sign(e.deltaY));
                    }}
                /></span
            >
            <span
                >Offset : <input
                    bind:value={context.offset.x}
                    onwheel={(e) => {
                        context.offset.x -= e.deltaY;
                    }}
                />
                <input
                    bind:value={context.offset.y}
                    onwheel={(e) => {
                        context.offset.y -= e.deltaY;
                    }}
                /></span
            >
            <span>
                Display node names : <input
                    type="checkbox"
                    bind:checked={context.display.nodes}
                />
            </span>
            <span>
                Display link costs : <input
                    type="checkbox"
                    bind:checked={context.display.links}
                />
            </span>
        </CollapseSection>

        <!-- Node informations -->
        <CollapseSection title="Nodes">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" colspan="2">Position (x,y)</th>
                    </tr>
                </thead>
                <tbody>
                    {#each context.graph.nodes as node}
                        <tr
                            class={context.selectedNodes.has(node)
                                ? "selected"
                                : ""}
                        >
                            {#if context.editMode}
                                <td><input type="text" value={node.name} /></td>
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
        </CollapseSection>

        <!-- Link informations -->
        <CollapseSection title="Links">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {#each context.graph.matrix as row, i}
                        {#each row as link, j}
                            {#if link != Infinity}
                                <tr
                                    id="link-{i}-{j}"
                                    class={context.selectedLinks.has(
                                        `link-${i}-${j}`,
                                    ) ||
                                    (context.graph.nodes[i].selected &&
                                        context.graph.nodes[j].selected)
                                        ? "selected"
                                        : ""}
                                >
                                    <td>{context.graph.nodes[i].name}</td>
                                    <td>{context.graph.nodes[j].name}</td>
                                    {#if context.editMode}
                                        <td
                                            ><input
                                                type="number"
                                                bind:value={
                                                    context.graph.matrix[i][j]
                                                }
                                                onwheel={(e) => {
                                                    e.preventDefault();
                                                    context.graph.matrix[i][j] =
                                                        Math.max(
                                                            1,
                                                            link -
                                                                Math.sign(
                                                                    e.deltaY,
                                                                ),
                                                        );
                                                }}
                                            /></td
                                        >
                                    {:else}
                                        <td>{link}</td>
                                    {/if}
                                </tr>
                            {/if}
                        {/each}
                    {/each}
                </tbody>
            </table>
        </CollapseSection>
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
                context.inputs.ctrl ||
                (Math.abs(e.deltaY) < 5 && Math.abs(e.deltaX) < 5)
            ) {
                // If using ctrl + scroll, reduce delta
                const zoomPower = -e.deltaY / (context.inputs.ctrl ? 100 : 1);

                context.zoom *= Math.pow(1.1, zoomPower);
            } else if (context.inputs.shift) {
                // Scroll only on x axis based on y delta
                context.offset.x += (e.deltaY * 0.5) / context.zoom;

                console.log("Mrrp meow :3");
            } else {
                // Update offset based on scroll values and zoom
                context.offset.x += (e.deltaX * 0.5) / context.zoom;
                context.offset.y += (e.deltaY * 0.5) / context.zoom;
            }
        }}
        onclick={context.clickHandler}
        onmousemove={(e) => {
            mousePos.x = e.offsetX;
            mousePos.y = e.offsetY;
        }}
    >
        <!-- Render links -->
        {#each context.graph.matrix as row, i}
            {#each row as link, j}
                {#if link != Infinity}
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
        {#if !context.editMode && data.user != undefined && data.user.id == data.graph.authorId}
            <IconLink icon="edit" label="Edit mode" link="./view/edit" />
        {/if}
        {@render children()}
    </section>
</main>
