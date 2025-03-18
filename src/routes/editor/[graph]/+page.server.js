import { connection } from "$lib/db-connect.js";

export function load({ params }) {
    console.log("Feur !!!!!!");

    return {
        id: params.graph
    }
}