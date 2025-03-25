import { connection } from "$lib/db-connect.js";

export function load({ params }) {
    return {
        id: params.graphID
    }
}