
const Gameboard = (() => {
    const board = document.querySelector('.board');
    let boardVal = [];

    const changeBoard = (marker, place) => {
        boardVal[place] = marker;
    }
    
    const updateBoard = () => {
            const boardSquares = document.querySelectorAll(".board button");
            let count = 0;
            boardSquares.forEach(square => {
                square.textContent = boardVal[count];
                count++;
            }); 
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
    const players = [Player("X"), Player("O")];

    const placeMarker = (box) => {
        place = box.target.className;
        Gameboard.changeBoard(players[playersTurn].marker, place)
        Gameboard.updateBoard();
        playersTurn == 0 ? playersTurn = 1: playersTurn = 0; 
    }

    const boardSensors = () => {
        const boardSquares = document.querySelectorAll(".board button");
            boardSquares.forEach(square => {
                square.addEventListener('click', placeMarker);
            });
    }

    return {
        boardSensors
    }

})();

Gameflow.boardSensors();
