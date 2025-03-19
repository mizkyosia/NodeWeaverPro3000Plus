interface coordonate{
    x : number; //float
    y : number; //float
}

class Graph{

    private nodeCoordonate : coordonate[];
    private matrix : number[][];
    private numberNode : number;

    //default constructor
    constructor(){
        //initialisation
        this.numberNode = 0;
        this.matrix = []; 
        this.nodeCoordonate = [];

    }

    public addNode(xCoordonate : number, yCoordonate : number) {
        let newPointCoordonate :coordonate = {x:xCoordonate, y:yCoordonate};
        let newNodeID = this.numberNode;
        
        //mise a jour des varaibles 
        this.numberNode++;
        this.nodeCoordonate.push(newPointCoordonate);
        
        for (let x:number = 0; x < this.numberNode; x++){
            this.matrix[newNodeID][x] = Infinity;
        }

        for (let y:number = 0; y < this.numberNode; y++){
            this.matrix[y][newNodeID];
        }
    } 

    public printMatrix(){
        for (let x:number = 0; x < this.numberNode; x++){
            console.log("| ");
            for (let y:number = 0; y < this.numberNode; y++){
                console.log(this.matrix[y][x] + " ");
            }
            console.log(" |\n");
        }

        
    }

}




//test

let newGraph:Graph;

newGraph.printMatrix();
