// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    interface UserProfile {
        _id: number,
        name: string,
        joined_ts: string,
    }

    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}


export { };