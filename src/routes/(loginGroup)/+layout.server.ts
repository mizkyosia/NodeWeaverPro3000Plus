import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals }) => {
    if (locals.session) {
        return redirect(302, '/account');
    }

    return {}
}