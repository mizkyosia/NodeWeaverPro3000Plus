<script lang="ts">
    import FormInput from "$lib/components/FormInput.svelte";

    const { data } = $props();
</script>

<main>
    <h2>Account informations</h2>
    <form action="?/edit" method="post" class="dialog">
        <h4>Update</h4>
        <FormInput
            title="Username"
            name="name"
            type="text"
            value={data.user.name}
        />
        <FormInput
            title="Email"
            name="email"
            type="email"
            value={data.user.email}
        />
        <FormInput type="select" name="visibility" title="Visibility">
            <option selected={data.user.visibility == "PUBLIC"} value="PUBLIC"
                >PUBLIC</option
            >
            <option selected={data.user.visibility == "PRIVATE"} value="PRIVATE"
                >PRIVATE</option
            >
            <option
                selected={data.user.visibility == "RESTRICTED"}
                value="RESTRICTED">RESTRICTED</option
            >
        </FormInput>

        <FormInput
            type="textarea"
            value={data.user.bio}
            name="bio"
            title="Bio"
        />

        <div class="stats alt">
            <hr />
        </div>

        <FormInput type="password" name="password" title="Password" />

        <button>Update</button>
    </form>
</main>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.8em;

        padding: 1em;
    }

    h4 {
        text-align: center;
    }
</style>
