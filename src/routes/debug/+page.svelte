<script lang="ts">
    import { Graph } from '$lib/graph';
    import { onMount } from 'svelte';

    let graph: Graph;

    onMount(() => {
        // Création d'un graph complexe
        graph = new Graph();

        // Ajout de nœuds
        const node1 = graph.addNode(0, 0);
        const node2 = graph.addNode(1, 2);
        const node3 = graph.addNode(2, 3);
        const node4 = graph.addNode(4, 5);
        const node5 = graph.addNode(5, 6);

        // Ajout de liens
        graph.addLink(node1, node2, 4);
        graph.addLink(node2, node3, 2);
        graph.addLink(node3, node4, 3);
        graph.addLink(node4, node5, 1);
        graph.addLink(node1, node3, 5);
        graph.addLink(node2, node4, 6);
        graph.addLink(node3, node5, 7);

        // Affichage de la matrice
        console.log("Matrice initiale :");
        graph.consolePrintMatrix();

        // Test de Dijkstra entre node1 et node5
        const dijkstraPath = graph.dijkstra(node1, node5);
        console.log("Chemin le plus court avec Dijkstra (node1 -> node5) :", dijkstraPath);

        // Test de Bellman-Ford entre node1 et node5
        const bellmanFordPath = graph.bellmanFord(node1, node5);
        console.log("Chemin le plus court avec Bellman-Ford (node1 -> node5) :", bellmanFordPath);

        // Suppression d'un nœud
        graph.removeNode(node2);
        console.log("Matrice après suppression de node2 :");
        graph.consolePrintMatrix();

        // Test de Dijkstra après suppression d'un nœud
        const dijkstraAfterRemove = graph.dijkstra(node1, node5);
        console.log("Chemin le plus court avec Dijkstra après suppression de node2 (node1 -> node5) :", dijkstraAfterRemove);

        // Test de Bellman-Ford après suppression d'un nœud
        const bellmanFordAfterRemove = graph.bellmanFord(node1, node5);
        console.log("Chemin le plus court avec Bellman-Ford après suppression de node2 (node1 -> node5) :", bellmanFordAfterRemove);

        // Suppression d'un lien
        graph.removeLink(node1, node3);
        console.log("Matrice après suppression du lien entre node1 et node3 :");
        graph.consolePrintMatrix();

        // Test de Dijkstra après suppression du lien
        const dijkstraAfterLinkRemove = graph.dijkstra(node1, node5);
        console.log("Chemin le plus court avec Dijkstra après suppression du lien entre node1 et node3 (node1 -> node5) :", dijkstraAfterLinkRemove);

        // Test de Bellman-Ford après suppression du lien
        const bellmanFordAfterLinkRemove = graph.bellmanFord(node1, node5);
        console.log("Chemin le plus court avec Bellman-Ford après suppression du lien entre node1 et node3 (node1 -> node5) :", bellmanFordAfterLinkRemove);
    });
</script>

<div>Voir la console pour voir les résultats de débogage.</div>
