import { checkPassword, checkUsername } from "$lib/server/inputChecks";
import { fail, redirect } from "@sveltejs/kit";
import { createSession, generateSessionToken, prisma, setSessionTokenCookie } from "$lib/server/session";
import { verifyPasswordHash } from "$lib/server/password";
import type { Actions, RequestEvent } from "./$types";

export const actions: Actions = {
    default: action
}

async function action(event: RequestEvent) {
    // Fetch form data
    const formData = await event.request.formData(),
        password = formData.get("password")?.toString() ?? '',
        username = formData.get("username")?.toString();


    let formattedData = {
        username: username ?? '',
        passwordError: '',
        usernameError: ''
    };
    let validityCheck = true;

    // Type & validity checking
    if (typeof username !== 'string' || username === '' || !checkUsername(username)) {
        formattedData.usernameError = "This username is invalid";
        validityCheck = false
    }
    if (typeof password !== 'string' || password === '' || !checkPassword(password)) {
        formattedData.passwordError = "This password is invalid"
        validityCheck = false;
    }
    if (!validityCheck) {
        return fail(400, formattedData);
    }

    var user = await prisma.user.findUnique({ where: { name: formattedData.username } });

    // If no account exists under the username
    if (user == null) {
        // Check for the email
        user = await prisma.user.findUnique({ where: { name: formattedData.username } });

        // If still no corresponding user, fail
        if (user == null) {
            formattedData.usernameError = "No account exists under this username/email";
            validityCheck = false;
            return fail(400, formattedData)
        }
    }

    // Check if passwords match
    if (!await verifyPasswordHash(user.passwordHash, password)) {
        formattedData.passwordError = "Wrong password"
        return fail(400, formattedData);
    }

    // Create a user session and redirect them to their homepage
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    setSessionTokenCookie(event, token, session.expiresAt);

    return redirect(302, "/home");
}