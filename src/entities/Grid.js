class GridBuilder {
    #rowCount;
    #bombChance;
    #adjacencyMatrix;
    #cells;

    constructor(rowCount, bombChance) {
        if (isNaN(bombChance) || isNaN(Number.parseFloat(bombChance))) throw new Error("bombChance must be a float!");
        if (isNaN(rowCount) || !Number.isInteger(rowCount)) throw new Error("rowCount must be an integer!");

        this.#rowCount = rowCount;
        this.#bombChance = bombChance;
    }

    #validate() {

    }

    #createGrid() {
        const cells = Array(this.#rowCount * this.#rowCount)
            .fill({})
            .map((o, i) => {
                return {
                    id: i,
                    hasBomb: Math.random() <= this.#bombChance,
                    isHidden: true,
                    isFlagged: false,
                    adjacentBombs: 0
                }
            });

        cells.forEach(c => c.adjacentBombs = this.#adjacencyMatrix[c.id].reduce((acc, cur) => {
            if (cells[cur]?.hasBomb === true) return acc + 1;
            return acc;
        }, 0));

        this.#cells = cells;
    }

    #createMatrix() {
        const adjMatrix = [];
        const getX = index => index % this.#rowCount;
        const getY = index => Math.floor(index / this.#rowCount);

        for (let i = 0; i < (this.#rowCount * this.#rowCount); i++) {

            const x = getX(i);
            const y = getY(i);

            const neighbors = {
                top: ((y - 1) * this.#rowCount + x), //top
                bottom: ((y + 1) * this.#rowCount + x), //bottom
                left: (y * this.#rowCount + x - 1), //left
                right: (y * this.#rowCount + x + 1), //right
                topRight: ((y - 1) * this.#rowCount + (x + 1)), //top-right
                topLeft: ((y - 1) * this.#rowCount + (x - 1)), //top-left
                bottomRight: ((y + 1) * this.#rowCount + (x + 1)), //bottom-right
                bottomLeft: ((y + 1) * this.#rowCount + (x - 1)), //bottom-left
            }

            adjMatrix.push([
                neighbors.top,
                neighbors.bottom,
                getY(neighbors.left) === y ? neighbors.left : null,
                getY(neighbors.right) === y ? neighbors.right : null,
                getY(neighbors.topLeft) === y - 1 ? neighbors.topLeft : null,
                getY(neighbors.topRight) === y - 1 ? neighbors.topRight : null,
                getY(neighbors.bottomLeft) === y + 1 ? neighbors.bottomLeft : null,
                getY(neighbors.bottomRight) === y + 1 ? neighbors.bottomRight : null
            ]);
        }

        this.#adjacencyMatrix = adjMatrix;
    }

    build() {
        //Validate
        this.#validate();

        //Create adjacency matrix
        this.#createMatrix();

        //Create cells
        this.#createGrid();

        //Return created object
        return [
            {
                cells: this.#cells,
                rows: this.#rowCount,
                bombCount: this.#cells.reduce((acc, cur) => cur.hasBomb ? acc + 1 : acc, 0),
                flagCount: 0
            },
            this.#adjacencyMatrix
        ];
    }
}

export default GridBuilder;