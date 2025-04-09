interface Coordinates {
    x: number;
    y: number;
}

export class Node {
    private coord: Coordinates = { x: 0, y: 0 };
    private name: string = "No Name";
    private idInMatrix: number = 0;
    private isValid: boolean = true;

    constructor() { }

    public setCoord(xCoordonate: number, yCoordonate: number) {
        this.coord = { x: xCoordonate, y: yCoordonate };
    }

    public getCoord(): Coordinates {
        return this.coord;
    }

    public setId(newId: number) {
        this.idInMatrix = newId;
    }

    public getId(): number {
        return this.idInMatrix;
    }

    public getIsValid(): boolean {
        return this.isValid;
    }

    public invalidate() {
        this.isValid = false;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}

export class Graph {
    private matrix: number[][] = [];
    private nodes: Node[] = [];

    constructor() { }

    public getNodeByName(name: string): Node {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].getName() == name) {
                return this.nodes[i];
            }
        }
        let ret: Node = new Node;
        ret.setName("Node Not Found");
        return ret;
    }

    public addNode(name: string = 'default', x: number, y: number): Node {
        const newNode = new Node();
        newNode.setCoord(x, y);
        newNode.setId(this.nodes.length);
        newNode.setName(name);
        this.nodes.push(newNode);

        // Ajout ligne et colonne
        this.matrix.push(new Array(this.nodes.length).fill(Infinity));
        for (let i = 0; i < this.nodes.length - 1; i++) {
            this.matrix[i].push(Infinity);
        }

        return newNode;
    }

    public removeNode(node: Node): void {
        const id = node.getId();
        if (!node.getIsValid() || id < 0 || id >= this.matrix.length) {
            console.error("Node is invalid or already removed");
            return;
        }

        // Supprimer dans la matrice
        this.matrix.splice(id, 1);
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i].splice(id, 1);
        }

        // Marquer le node comme invalide
        node.invalidate();

        // Retirer le node de la liste des nœuds
        this.nodes = this.nodes.filter(n => n.getId() !== id);

        // Décaler les IDs restants dans la liste des nœuds
        for (let i = 0; i < this.nodes.length; i++) {
            const n = this.nodes[i];
            if (n.getId() > id) {
                n.setId(n.getId() - 1);
            }
        }
    }

    public addLink(from: Node, to: Node, cost: number): void {
        if (!from.getIsValid() || !to.getIsValid()) {
            console.error("Invalid node(s)");
            return;
        }

        this.matrix[from.getId()][to.getId()] = cost;
    }

    public removeLink(from: Node, to: Node): void {
        if (!from.getIsValid() || !to.getIsValid()) {
            console.error("Invalid node(s)");
            return;
        }

        this.matrix[from.getId()][to.getId()] = Infinity;
    }

    public consolePrintMatrix(): void {
        console.table(this.matrix);
    }

    public getMatrix(): number[][] {
        return this.matrix;
    }

    public dijkstra(start: Node, end: Node): number[] {
        if (!start.getIsValid() || !end.getIsValid()) {
            console.error("Invalid node(s)");
            return [];
        }

        const startId = start.getId();
        const endId = end.getId();
        const n = this.nodes.length;

        const dist = new Array(n).fill(Infinity);
        const prev = new Array(n).fill(-1);
        const visited = new Array(n).fill(false);

        dist[startId] = 0;

        for (let i = 0; i < n; i++) {
            let u = -1;
            for (let j = 0; j < n; j++) {
                if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
                    u = j;
                }
            }

            if (u === -1 || dist[u] === Infinity) break;

            visited[u] = true;

            for (let v = 0; v < n; v++) {
                const alt = dist[u] + this.matrix[u][v];
                if (this.matrix[u][v] < Infinity && alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }

        const path: number[] = [];
        for (let at = endId; at !== -1; at = prev[at]) {
            path.push(at);
        }
        path.reverse();

        return path[0] === startId ? path : [];
    }

    public bellmanFord(start: Node, end: Node): number[] {
        if (!start.getIsValid() || !end.getIsValid()) {
            console.error("Invalid node(s)");
            return [];
        }

        const startId = start.getId();
        const endId = end.getId();
        const n = this.nodes.length;

        // Vérification si le graphe contient des nœuds
        if (n === 0) {
            console.error("Le graphe est vide.");
            return [];
        }

        const dist = new Array(n).fill(Infinity);
        const prev = new Array(n).fill(-1);
        dist[startId] = 0;

        for (let i = 0; i < n - 1; i++) {
            for (let u = 0; u < n; u++) {
                for (let v = 0; v < n; v++) {
                    const weight = this.matrix[u][v];
                    if (weight < Infinity && dist[u] + weight < dist[v]) {
                        dist[v] = dist[u] + weight;
                        prev[v] = u;
                    }
                }
            }
        }

        // Vérification des cycles de poids négatif
        for (let u = 0; u < n; u++) {
            for (let v = 0; v < n; v++) {
                const weight = this.matrix[u][v];
                if (weight < Infinity && dist[u] + weight < dist[v]) {
                    console.warn("Cycle de poids négatif détecté.");
                    return [];
                }
            }
        }

        const path: number[] = [];
        for (let at = endId; at !== -1; at = prev[at]) {
            path.push(at);
        }
        path.reverse();

        return path[0] === startId ? path : [];
    }

}
