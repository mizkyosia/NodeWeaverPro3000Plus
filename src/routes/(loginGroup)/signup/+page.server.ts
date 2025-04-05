import { checkEmail, checkPassword, checkUsername } from "$lib/server/inputChecks.js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent } from "./$types.js";
import { createSession, generateSessionToken, prisma, setSessionTokenCookie } from "$lib/server/session.js";
import { signupUser } from "$lib/server/user.js";

export const actions: Actions = {
    default: action
}

async function action(event: RequestEvent) {
    // Fetch form data
    const formData = await event.request.formData(),
        email = formData.get("email")?.toString(),
        password = formData.get("password")?.toString() ?? '',
        passwordCheck = formData.get("passwordConfirm"),
        username = formData.get("username")?.toString();

    let formattedData = {
        email: email ?? '',
        username: username ?? '',
        emailError: '',
        passwordError: '',
        passwordCheckError: '',
        usernameError: ''
    };
    let validityCheck = true;

    // Type & validity checking
    if (typeof email !== 'string' || email === '' || !checkEmail(email)) {
        formattedData.emailError = "Must be a valid email adress";
        validityCheck = false
    }
    if (typeof username !== 'string' || username === '' || !checkUsername(username)) {
        formattedData.usernameError = "Usernames must be between 4 and 30 characters long";
        validityCheck = false
    }
    if (typeof password !== 'string' || password === '' || !checkPassword(password)) {
        formattedData.passwordError = "Password must be between 4 and 30 characters long and contain all the following :\n - 1 lowercase latin letter\n - 1 uppercase latin letter\n - 1 special character : @$!%*?&_+-"
        validityCheck = false;
    }

    // Check if user already exists
    if (await prisma.user.findUnique({ where: { email: formattedData.email } })) {
        formattedData.emailError = "This email is already used";
        validityCheck = false;
    }
    if (await prisma.user.findUnique({ where: { name: formattedData.username } })) {
        formattedData.emailError = "This email is already used";
        validityCheck = false;
    }

    // Check if passwords match
    if (password !== passwordCheck) {
        formattedData.passwordError = "The passwords must match !"
        formattedData.passwordCheckError = formattedData.passwordError;
        validityCheck = false;
    }
    if (!validityCheck) {
        return fail(400, formattedData);
    }

    // All checks passed, create account
    const user = await signupUser(formattedData.email, formattedData.username, password);

    // Create session for the user, to log them in
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    setSessionTokenCookie(event, token, session.expiresAt);

    return redirect(302, "/home");
}