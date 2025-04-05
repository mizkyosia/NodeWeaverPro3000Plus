interface coordonate {
    x: number; //float
    y: number; //float
}

class Graph {

    private nodeCoordonate: coordonate[];
    private matrix: number[][];
    private numberNode: number;

    //default constructor
    constructor() {
        //initialisation
        this.numberNode = 0;
        this.matrix = [];
        this.nodeCoordonate = [];

    }

    //method 
    public addNode(xCoordonate: number, yCoordonate: number) {
        let newPointCoordonate: coordonate = { x: xCoordonate, y: yCoordonate };
        let newNodeID = this.numberNode;

        //mise a jour des varaibles 
        this.numberNode++;
        this.nodeCoordonate.push(newPointCoordonate);

        this.matrix.push(new Array(this.numberNode).fill(Infinity));

        // Mise à jour des colonnes existantes
        for (let i = 0; i < this.numberNode - 1; i++) {
            this.matrix[i].push(Infinity);
        }
    }


    //debug method
    public printMatrix() {
        for (let x: number = 0; x < this.numberNode; x++) {
            console.log("| ");
            for (let y: number = 0; y < this.numberNode; y++) {
                console.log(this.matrix[y][x] + " ");
            }
            console.log(" |\n");
        }
    }

}

//test 

/*
let newGraph:Graph = new Graph();
newGraph.addNode(0, 0)
newGraph.addNode(0, 0)
newGraph.addNode(0, 0)
newGraph.addNode(0, 0)
newGraph.printMatrix();
*/