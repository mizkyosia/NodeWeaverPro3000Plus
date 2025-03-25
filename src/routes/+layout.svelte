<script lang="ts">
    import menuIcon from "$lib/img/menu.svg";
    import closeIcon from "$lib/img/close.svg";
    import homeIcon from "$lib/img/home.svg";
    import worldIcon from "$lib/img/world.svg";
    import bookIcon from "$lib/img/book.svg";
    import loginIcon from "$lib/img/login.svg";

    import { page } from "$app/state";

    import { headerState } from "$lib/headerState.svelte";

    const { children } = $props();

    let openPanel: boolean = $state(false);
</script>

<svelte:head>
    <link rel="stylesheet" href="/src/style/header.scss" />
</svelte:head>

<header>
    <div>
        <button aria-label="Menu" onclick={() => (openPanel = true)}>
            <img alt="Menu button" src={menuIcon} />
        </button>
        <span>{page.url}</span>
    </div>

    <div>
        <img src="/favicon.png" alt="logo" />
        <span class="header__title">NodeWeaver</span>
    </div>

    <div>
        {#if headerState.showSearchBar}
            <input placeholder="Search..." />
        {/if}
        <span> @user12345 </span>
        <button class="header__account" aria-label="Account button"
            ><img src={loginIcon} alt="Your profile" /></button
        >
    </div>

    <!-- Side panel -->
    <section id="sidePanel" class={{ openPanel }}>
        <div id="sidePanel__topBar">
            <button aria-label="Close panel" onclick={() => (openPanel = false)}
                ><img alt="Close panel" src={closeIcon} /></button
            >
            <span>Navigate</span>
        </div>
        <a class="sidePanel__link" href="/discover">
            <img alt="Discover" src={worldIcon} />
            <span>Discover</span>
        </a>
        <a class="sidePanel__link" href="/home">
            <img alt="Home" src={homeIcon} />
            <span>Home</span>
        </a>
        <a class="sidePanel__link" href="/tutorial">
            <img alt="Tutorial" src={bookIcon} />
            <span>Learn</span>
        </a>
        <a class="sidePanel__link" href="/account">
            <img alt="Home" src={loginIcon} />
            <span>Account</span>
        </a>
    </section>
</header>

{@render children()}
