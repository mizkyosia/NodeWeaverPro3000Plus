<script lang="ts">
    import FormInput from "$lib/components/FormInput.svelte";

    const { form } = $props();
</script>

<h2>Create account</h2>
<FormInput
    name="username"
    type="text"
    title="Username"
    error={form?.usernameError}
    required
/>
<FormInput
    name="email"
    type="email"
    title="Email adress"
    error={form?.emailError}
    required
/>
<FormInput
    name="password"
    type="password"
    title="Password"
    error={form?.passwordError}
    required
/>
<FormInput
    name="passwordConfirm"
    type="password"
    title="Password double check"
    error={form?.passwordCheckError}
    required
/>
<input name="submit" type="submit" />
<a href="/login" class="slimButton">Log in</a>
