
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
    }

    return {
        updateBoard,
        changeBoard
    }
})();


const Player = (marker) => {
    return {marker};
}


const Gameflow = (() => {
    let playersTurn = 0;
    let game = true;
    const players = [Player("X"), Player("O")];

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
        const boardSquares = document.querySelectorAll(".board button");
            boardSquares.forEach(square => {
                square.addEventListener('click', placeMarker);
            });
    }

    const displayWinner = (player) => {
        let winner = player == players[0].marker ? "Player 1" : "Player 2";
        const winnerDisplay = document.querySelector(".winner");
        winnerDisplay.textContent = winner;
        game = false;
    }

    return {
        boardSensors,
        displayWinner
    }

})();

Gameflow.boardSensors();
