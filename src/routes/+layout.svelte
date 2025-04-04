<script lang="ts">
    // Icons & style imports
    import "$lib/style/shared.scss";
    import "$lib/style/header.scss";

    // Components
    import IconLink from "$lib/components/IconLink.svelte";

    // State imports
    import { headerState } from "$lib/headerState.svelte";
    import Icon from "$lib/components/Icon.svelte";

    // Lib imports
    import { clickOutside } from "$lib/clickOutside";

    // Props
    const { children, data } = $props();

    // State declarations
    let openPanel: boolean = $state(false);
    let openAccountPanel: boolean = $state(false);
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
        <span>
            {#if data.user}
                {@html data.user.name}
            {:else}
                Guest
            {/if}
        </span>
        <button
            class="header__account"
            aria-label="Account button"
            onclick={() => (openAccountPanel = !openAccountPanel)}
        >
            <Icon name="account" />
        </button>
    </div>

    <!-- Account info panel -->
    {#if openAccountPanel}
        <section
            class="dialog"
            id="accountPanel"
            use:clickOutside={() => {
                openAccountPanel = false;
            }}
        >
            {#if data.user}
                <span id="accountPanel__username">{@html data.user.name}</span>
                <hr />
                <IconLink
                    label="Manage account"
                    icon="settings"
                    link="/account"
                    bind:openedMenu={openAccountPanel}
                />
                <IconLink
                    label="Log out"
                    icon="logout"
                    link="/logout"
                    red
                    reload={true}
                    preload={false}
                    bind:openedMenu={openAccountPanel}
                />
            {:else}
                <IconLink
                    label="Log in"
                    icon="login"
                    link="/login"
                    bind:openedMenu={openAccountPanel}
                />
            {/if}
        </section>
    {/if}

    <!-- Side panel -->
    <section
        id="sidePanel"
        class={{ openPanel }}
        use:clickOutside={() => {
            openPanel = false;
        }}
    >
        <div id="sidePanel__topBar">
            <button aria-label="Close panel" onclick={() => (openPanel = false)}
                ><Icon name="xmark" />
            </button>
            <span>Navigate</span>
        </div>

        <div id="sidePanel__body" class="buttonList">
            <IconLink
                label="Discover"
                icon="world"
                link="/discover"
                bind:openedMenu={openPanel}
            />
            <IconLink
                label="Home"
                icon="home"
                link="/home"
                bind:openedMenu={openPanel}
            />
            <IconLink
                label="Learn"
                icon="book"
                link="/tutorial"
                bind:openedMenu={openPanel}
            />
            {#if data.user}
                <IconLink
                    label="Account"
                    icon="account"
                    link="/account"
                    bind:openedMenu={openPanel}
                />
            {:else}
                <IconLink
                    label="Login"
                    icon="account"
                    link="/login"
                    bind:openedMenu={openPanel}
                />
            {/if}
        </div>
    </section>
    <div id="sidePanel__backdrop"></div>
</header>

{@render children()}
