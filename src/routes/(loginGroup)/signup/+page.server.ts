import { checkEmail, checkPassword, checkUsername } from "$lib/server/inputChecks.js";
import { fail } from "@sveltejs/kit";
import type { Actions, RequestEvent } from "./$types.js";
import { prisma } from "$lib/server/session.js";

export const actions: Actions = {
    default: action
}

async function action(event: RequestEvent) {
    const formData = await event.request.formData(),
        email = formData.get("email"),
        password = formData.get("password"),
        passwordCheck = formData.get("passwordCheck"),
        username = formData.get("username");

    let formattedData = {
        email: email?.toString(),
        username: username?.toString(),
        emailError: '',
        passwordError: '',
        passwordCheckError: '',
        usernameError: ''
    };
    let validityCheck = true;

    if (typeof email !== 'string' || email === '' || !checkEmail(email)) {
        formattedData.emailError = "Must be a valid email adress";
        validityCheck = false
    }
    if (typeof username !== 'string' || username === '' || !checkUsername(username)) {
        formattedData.usernameError = "Usernames must be at least 4 characters long";
        validityCheck = false
    }
    if (typeof password !== 'string' || password === '' || !checkPassword(password)) {
        formattedData.passwordError = "Password must be at least 8 characters long and contain all the following :\n - 1 lowercase latin letter\n - 1 uppercase latin letter\n - 1 special character"
        validityCheck = false;
    }
    if (password !== passwordCheck) {
        formattedData.passwordError = "The passwords must match !"
        formattedData.passwordCheckError = formattedData.passwordError;
        validityCheck = false;
    }
    if (!validityCheck) {
        return fail(400, formattedData);
    }

    if (await prisma.user.findUnique({ where: { email: formattedData.email } })) {
        formattedData.emailError = "This email is already used";
        validityCheck = false;
    }
    if (await prisma.user.findUnique({ where: { name: formattedData.username } })) {
        formattedData.emailError = "This email is already used";
        validityCheck = false;
    }
    if (!validityCheck) {
        return fail(400, formattedData);
    }
}