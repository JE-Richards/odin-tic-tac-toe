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
        let value = "";

        // function to override value
        const addToken = (player) => {
            // value = player token
            value = player.token;
        }

        // function to get cell value
        const getValue = () => value;

        return { addToken, getValue };
    }

    // create variable to help detect invalid moves
    // if move is invalid, set to true
    // if move is valid, set to false
    let invalidMove = false;
    const getInvalidMove = () => invalidMove;

    // function for player input
    const playerInput = (row, column, player) => {
        // check if cell is empty (value = 0);
        // if not empty move invalid so end loop
        if (board[row][column].getValue() !== "") {
            invalidMove = true;
            return;
        }
        else if (board[row][column].getValue() === "") {
            board[row][column].addToken(player);
            invalidMove = false;
            return;
        }
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
    return { getBoard, playerInput, printBoard, getInvalidMove };
}

// create game controller factory
// Accepts two inputs, a name for player 1 and a name for player 2
// Default names provided if no inputs given
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    // create an array containing player information
    // needs the name and the corresponding token
    // for now offer a default token of x and o
    const players = [
        { name: playerOneName, token: "X" },
        { name: playerTwoName, token: "O" }
    ]

    // Instantiate the gameboard
    const board = Gameboard();

    // Pick current player
    // Initially pick the player randomly
    let currentPlayer = players[
        // Pick either 0 or 1 randomly
        (Math.floor(Math.random() * 2))
    ];

    // Logic to switch from one player to another
    const switchPlayer = () => {
        // if current player = 1, set to 2
        // if current player = 2, set to 1
        // use ternary over longer if statement
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    // function to return the current player
    const getCurrentPlayer = () => currentPlayer;

    // set a games status
    let gameStatus = "In progress";

    // function to get the game status after updated value
    const getGameStatus = () => gameStatus;

    // Win / lose / tie logic
    const winConditions = () => {
        // if no combinations possible -> tie game
            // if all cells.getValue() !== 0 then no moves left
        if (board.getBoard().every(row => row.every(cell => cell.getValue() !== ""))) {
            gameStatus = "Tie Game";
            getGameStatus();
            return;
        }

        // Check for all combinations of 3 in a row
        // 3 in a row for rows
        for (let row = 0; row < 3; row ++) {
            if (
                (board.getBoard()[row][0].getValue() === board.getBoard()[row][1].getValue()) &&
                (board.getBoard()[row][0].getValue() === board.getBoard()[row][2].getValue())
            ) {
                // switch to avoid needing to use nested ifs
                switch (board.getBoard()[row][0].getValue()) {
                    case "":
                        break;
                    
                    case "X":
                        gameStatus = "Player One Wins";
                        getGameStatus();
                        break;
                    
                    case "O":
                        gameStatus = "Player Two Wins";
                        getGameStatus();
                        break;
                }
            }
        }

        // 3 in a row for columns
        for (let col = 0; col < 3; col++) {
            if (
                (board.getBoard()[0][col].getValue() === board.getBoard()[1][col].getValue()) &&
                (board.getBoard()[0][col].getValue() === board.getBoard()[2][col].getValue())
            ) {
                switch (board.getBoard()[0][col].getValue()) {
                    case "":
                        break;
                    
                    case "X":
                        gameStatus = "Player One Wins";
                        getGameStatus();
                        break;
                    
                    case "O":
                        gameStatus = "Player Two Wins";
                        getGameStatus();
                        break;
                }
            }
        }

        // 3 in a row for diagonals
        // leading diagonal
        if (
            (board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue()) &&
            (board.getBoard()[0][0].getValue() === board.getBoard()[2][2].getValue())
        ) {
            switch (board.getBoard()[0][0].getValue()) {
                case "":
                    break;
                
                case "X":
                    gameStatus = "Player One Wins";
                    getGameStatus();
                    break;
                
                case "O":
                    gameStatus = "Player Two Wins";
                    getGameStatus();
                    break;
            }
        }
    
        // reverse diagonal
        if (
            (board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue()) &&
            (board.getBoard()[0][2].getValue() === board.getBoard()[2][0].getValue())
        ) {
            switch (board.getBoard()[0][2].getValue()) {
                case "":
                    break;
                
                case "X":
                    gameStatus = "Player One Wins";
                    getGameStatus();
                    break;
                
                case "O":
                    gameStatus = "Player Two Wins";
                    getGameStatus();
                    break;
            }
        }
    }

    // function to display a new round
    // includes logic to declare win, loss, tie
    const displayRound = () => {
        // print the board
        board.printBoard();
        // print the player who's turn it is, or if the game has finished
        switch (gameStatus) {
            case "In progress":
                console.log(`It is currently ${currentPlayer.name}'s turn.`);
                break;

            case "Player One Wins":
                console.log(`GAME OVER!!!\n${players[0].name} WINS!!!`);
                return;
            
            case "Player Two Wins":
                console.log(`GAME OVER!!!\n${players[1].name} WINS!!!`);
                return;

            case "Tie Game":
                console.log(`GAME OVER!!!\nIT'S A TIE, NO MOVES REMAINING!`);
        }
    }

    // function to play a round
    const playRound = (row, col) => {
        // Accept user input to make the move - row, column input into the play round function
        // need to make sure that if the cell is already populated with a player token, then playerInput is called again
        board.playerInput(row, col, currentPlayer)

        // handle invalid moves
        let isMoveInvalid = board.getInvalidMove();
        if (isMoveInvalid === true) {
            console.log(`${currentPlayer.name}, you have made an invalid move. Please try again.`)
            return;
        }

        // log the move they take
        console.log(`${currentPlayer.name} chose to put their token in row ${row}, column ${col}`)
        // run switch player function
        switchPlayer();
        getCurrentPlayer();
        // check win / lose / tie
            // if win / lose / tie end game
        winConditions();
        // log new round
        displayRound();
    }

    // function to reset the game state
    const resetGame = () => {
        gameStatus = "In progress";
        getGameStatus();

        const newGamePlayer = { name: "New Game", token: "" };
        for (i = 0; i < board.getBoard().length; i++) {
            for (j = 0; j < board.getBoard()[i].length; j++) {
                board.getBoard()[i][j].addToken(newGamePlayer);
            }
        }
    }

    // return displayRound to use to initiate the start of a game
    // return function to play round
    // return get current player for UI use later
    // return get game status to program logic in the UI to stop the game from being playable when the game is over
    // return reset game function
    // return getBoard from inside Gameboard factory so it can be used to populate the UI
    return { displayRound, playRound, getCurrentPlayer, getGameStatus, resetGame, getBoard: board.getBoard }
}

function ScreenController () {
    const game = GameController();

    // create variable to make the createEventListener function run only once
    let hasBeenCalled = false;
    const getHasBeenCalled = () => hasBeenCalled;

    // create function to identify gameboard cells and add event listeners to them
    // function can only be called once to avoid creating an abundance of event listeners
    // event listener should also do nothing when game has finished and board not reset
    const createEventListeners = () => {
        if (!hasBeenCalled) {
            const cellList = document.querySelectorAll('.cell');

            cellList.forEach((cell) => {
                cell.addEventListener('click', (event) => {
                    if (
                        game.getGameStatus() === "Player One Wins" ||
                        game.getGameStatus() === "Player Two Wins" ||
                        game.getGameStatus() === "Tie Game"
                    ) {
                        return;
                    }
                    else {
                        let cellRow = event.target.getAttribute('data-row');
                        let cellCol = event.target.getAttribute('data-col');
                        game.playRound(cellRow, cellCol);
                        event.target.innerHTML = `${game.getBoard()[cellRow][cellCol].getValue()}`
                    }
                })
            });
            
            hasBeenCalled = true;
            getHasBeenCalled();
        }
        else {
            console.log("Event Listeners have already been created.");
        }
    }

    // function to start a new game for use on UI button
    const newGame = () => {
        // reset board state
        game.resetGame();
        
        // if event listeners not yet created, create them
        // else reset UI gameboard cell innerHTMLs
        if (hasBeenCalled) {
            const cellList = document.querySelectorAll('.cell');
            cellList.forEach((cell) => {
                cell.innerHTML = game.getBoard()[cell.getAttribute('data-row')][cell.getAttribute('data-col')].getValue();
            })
        }
        else {
            createEventListeners();
        }

        game.displayRound();
    }

    return { newGame }
}

let screen = ScreenController();

const newGameBtn = document.getElementById("newGame");

newGameBtn.addEventListener('click', screen.newGame);