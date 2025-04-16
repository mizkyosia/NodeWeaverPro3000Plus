<script lang="ts">
    import "$lib/style/login.scss";
    import { enhance } from "$app/forms";

    let { children } = $props();
</script>

<dialog id="login">
    <form method="post" use:enhance>
        {@render children()}
    </form>
</dialog>
