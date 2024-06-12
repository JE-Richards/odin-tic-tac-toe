// create gameboard factory
function Gameboard() {
    // set empty array and number of rows and columns for grid
    const board = [];
    const numRows = 3;
    const numCols = 3;

    // nested for loops to fill empty array with grid cells
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        // create a sub array for a row
        for (let j = 0; j < numCols; j++) {
            // populate the rows with cells via cell function
            board[i].push(Cell());
        }
    }

    // function that just gets the board
    const getBoard = () => board;

    // function to dictate cell value (might need to be outside of module);
    function Cell() {
        // default value blank
        let value = 0;

        // function to override value
        const addToken = (player) => {
            // value = player token
            value = player;
        }

        // function to get cell value
        const getValue = () => value;

        return { addToken, getValue };
    }

    // function for player input
    const playerInput = (row, column, player) => {
        // check if cell is empty (value = 0);
        // if not empty move invalid so end loop
        if (board[row][column] !== 0) {
            return;
        }
        else if (board[row][column] === 0)
            board[row][column].addToken(player);
    }

    // function to print game bord to console
    const printBoard = () => {
        // board is array of 3 arrays
        // for each cell we want to return its value
        // need to map the board -> map the rows -> cell get value
        const boardPopulated = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardPopulated);
    }

    // return get board, user input, and print board
    return { getBoard, playerInput, printBoard };
}