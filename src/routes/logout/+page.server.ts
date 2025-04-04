import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/session";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";
import { invalidateAll } from "$app/navigation";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
    if (event.locals.session == null) return redirect(302, "/login");

    // Invalidates the current session
    await invalidateSession(event.locals.session.id);

    // Remove the session token, since it is no longer valid
    deleteSessionTokenCookie(event);

    // Redirect to the discover page
    return redirect(302, "/login");
}