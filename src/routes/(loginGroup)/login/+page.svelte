<script>
    import FormInput from "$lib/components/FormInput.svelte";
</script>

<h2>Log in</h2>
<FormInput name="username" type="text" title="Username or email" forceAnim />
<FormInput name="password" type="password" title="Password" />
<input name="submit" type="submit" />
<a href="/signup" class="slimButton">Sign up</a>
