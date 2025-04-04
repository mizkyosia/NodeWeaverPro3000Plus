<script lang="ts">
    import "$lib/style/login.scss";
    import { enhance } from "$app/forms";

    let { children } = $props();
</script>

<main id="login__main">
    <video src="/background.mp4" muted loop autoplay controls={false}></video>

    <dialog id="login">
        <form method="post" use:enhance>
            {@render children()}
        </form>
    </dialog>
</main>
