const Gameboard = (() => {
    const board = document.querySelector('.board');
    let boardVal = [];

    const changeBoard = (marker, place) => {
        if(boardVal[place] == null){
            boardVal[place] = marker;
            return true;
        }
        return false;
    }
    
    const clearBoard = () => {
        boardVal = [];
        updateBoard();
    }

    const updateBoard = () => {
            const boardSquares = document.querySelectorAll(".board button");
            let count = 0;
            boardSquares.forEach(square => {
                square.textContent = boardVal[count];
                count++;
            }); 
            checkWinner();
    } 

    const checkWinner = () => {
        //Checks Rows
        if(boardVal[0] == boardVal[1] && boardVal[1] == boardVal[2] && boardVal[2] != null){
            Gameflow.displayWinner(boardVal[0]);
        }
        if(boardVal[3] == boardVal[4] && boardVal[4] == boardVal[5] && boardVal[5] != null){
            Gameflow.displayWinner(boardVal[3]);
        }
        if(boardVal[6] == boardVal[7] && boardVal[7] == boardVal[8] && boardVal[8] != null){
            Gameflow.displayWinner(boardVal[6]);
        }
        
        //Checks Collumns
        if(boardVal[0] == boardVal[3] && boardVal[3] == boardVal[6] && boardVal[6] != null){
            Gameflow.displayWinner(boardVal[0]);
        }
        if(boardVal[1] == boardVal[4] && boardVal[4] == boardVal[7] && boardVal[7] != null){
            Gameflow.displayWinner(boardVal[1]);
        }
        if(boardVal[2] == boardVal[5] && boardVal[5] == boardVal[8] && boardVal[8] != null){
            Gameflow.displayWinner(boardVal[2]);
        }

        //Checks Diagonals
        if(boardVal[0] == boardVal[4] && boardVal[4] == boardVal[8] && boardVal[8] != null){
            Gameflow.displayWinner(boardVal[0]);
        }
        if(boardVal[2] == boardVal[4] && boardVal[4] == boardVal[6] && boardVal[6] != null){
            Gameflow.displayWinner(boardVal[2]);
        }

        //Checks for a tie
        if(boardVal.filter(val => val != null).length >= 9){
            Gameflow.displayWinner('Tie')
        }
    }

    return {
        updateBoard,
        changeBoard,
        clearBoard
    }
})();


const Player = (marker, name) => {
    return {marker, name};
}


const Gameflow = (() => {
    let playersTurn = 0;

    const players = [Player("X", 'player1'), Player("O", 'player2')];

    const startGame = () => {
        game = true
        const player1Name = document.querySelector('#player1');
        const player2Name = document.querySelector('#player2');

        players[0].name = player1Name.value ? player1Name.value : 'Player 1';
        players[1].name = player2Name.value ? player2Name.value : 'Player 2';
        boardSensors();
    }

    const restart = () => {
        game = false
        playersTurn = 0;
        displayWinner('');
        Gameboard.clearBoard();
    }

    const placeMarker = (box) => {
        if(game){
            place = box.target.className;
            if(Gameboard.changeBoard(players[playersTurn].marker, place)) {
                Gameboard.updateBoard();
                playersTurn == 0 ? playersTurn = 1: playersTurn = 0; 
            }
        }
    }

    const boardSensors = () => {
        if(game){
            const boardSquares = document.querySelectorAll(".board button");
            boardSquares.forEach(square => {
                square.addEventListener('click', placeMarker);
            });
        }
    }

    const displayWinner = (player) => {
        let winner = player == '' ? '' : player == 'Tie' ? 'Tie' : player == players[0].marker ? `${players[0].name}` : `${players[1].name}`;
        const winnerDisplay = document.querySelector(".winner");
        winnerDisplay.textContent = winner;
        game = false;
    }

    return {
        boardSensors,
        displayWinner,
        startGame,
        restart
    }

})();

const startBtn = document.querySelector(".start");
startBtn.addEventListener('click', Gameflow.startGame)

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener('click', Gameflow.restart)