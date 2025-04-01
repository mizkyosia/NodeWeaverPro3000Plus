import type { User } from "$lib/server/user";
import type { Session } from "$lib/server/session";


declare global {
    interface UserProfile {
        _id: number,
        name: string,
        joined_ts: string,
    }

    namespace App {
        // interface Error {}
        interface Locals {
            user: User | null,
            session: Session | null
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}


export { };