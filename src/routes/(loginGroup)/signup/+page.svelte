<script>
    import FormInput from "$lib/components/FormInput.svelte";
</script>

<h2>Create account</h2>
<FormInput name="username" type="text" title="Username" />
<FormInput name="email" type="email" title="Email adress" />
<FormInput name="password" type="password" title="Password" />
<FormInput
    name="passwordConfirm"
    type="password"
    title="Password double check"
/>
<input name="submit" type="submit" />
<a href="/login" class="slimButton">Log in</a>
