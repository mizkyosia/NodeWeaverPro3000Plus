<script lang="ts">
    // Icons & style imports
    import "$lib/style/shared.scss";
    import "$lib/style/header.scss";

    // Components
    import IconLink from "$lib/components/IconLink.svelte";

    // State imports
    import { headerState } from "$lib/headerState.svelte";
    import Icon from "$lib/components/Icon.svelte";

    // Props
    const { children } = $props();

    // State declarations
    let openPanel: boolean = $state(false);
</script>

<header>
    <div>
        <button aria-label="Menu" onclick={() => (openPanel = true)}>
            <Icon name="menu" />
        </button>
        <div id="header__routeDisplay">
            {#each headerState.path as part, i}
                <a href={part.url}>{part.name}</a>
                {#if i < headerState.path.length - 1}
                    <span>/</span>
                {/if}
            {/each}
        </div>
    </div>

    <div>
        <img src="/favicon.png" alt="logo" />
        <span class="header__title">NodeWeaver</span>
    </div>

    <div>
        <input placeholder="Search..." />
        <span> @user12345 </span>
        <button class="header__account" aria-label="Account button"
            ><Icon name="login" /></button
        >
    </div>

    <!-- Side panel -->
    <section id="sidePanel" class={{ openPanel }}>
        <div id="sidePanel__topBar">
            <button aria-label="Close panel" onclick={() => (openPanel = false)}
                ><Icon name="xmark" />
            </button>
            <span>Navigate</span>
        </div>

        <div id="sidePanel__body" class="buttonList">
            <IconLink label="Discover" icon="world" link="/discover" />
            <IconLink label="Home" icon="home" link="/home" />
            <IconLink label="Learn" icon="book" link="/tutorial" />
            <IconLink label="Account" icon="login" link="/account" />
        </div>
    </section>
</header>

{@render children()}
