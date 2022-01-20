

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    let count = 0;

    const updateSquare = (marker, index) => {
        board[index] = marker;
        const display = document.getElementById(index);
        display.textContent = marker;

    }

    const isClear = (index) => {
        if (board[index] == "") {
            return true;
        }
    }

    const clearBoard = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.getElementById(i);
            board[i] = '';
            square.textContent = "";
            gameFlow.resetFlow();
        }
    }

    const resetBoard = () => {
        clearBoard();
        squares.forEach(square => square.addEventListener('click', clickBox));
        count = 0;
        const playAgainButton = document.getElementById('play-again-button');
        if (playAgainButton != null) {
            playAgainButton.remove();
            const messageContainer = document.querySelector('.end-game');
            messageContainer.textContent = "";
        }
    }

    const checkWinner = (marker) => {
        if ((board[0] == marker && board[1] == marker && board[2] == marker)
            || (board[3] == marker && board[4] == marker && board[5] == marker)
            || (board[6] == marker && board[7] == marker && board[8] == marker)
            || (board[0] == marker && board[3] == marker && board[6] == marker)
            || (board[1] == marker && board[4] == marker && board[7] == marker)
            || (board[2] == marker && board[5] == marker && board[8] == marker)
            || (board[0] == marker && board[4] == marker && board[8] == marker)
            || (board[2] == marker && board[4] == marker && board[6] == marker)) {
            squares.forEach(square => square.removeEventListener('click', clickBox));
            winnerMessage(marker);
            const replay = document.querySelector('.play-again');
            const playAgainButton = document.createElement('button');
            playAgainButton.id = "play-again-button"
            playAgainButton.textContent = "PLAY AGAIN?";
            replay.appendChild(playAgainButton);
            
            const playAgain = function () {
                resetBoard();
            }
            playAgainButton.addEventListener('click', playAgain);
        }
    }

    const winnerMessage = (winner) => {
        const messageContainer = document.querySelector('.end-game');
        messageContainer.textContent = winner + " is the winner!";
    }

    const playGame = (index) => {
        if (isClear(index)) {
            const z = gameFlow.getTurn(count);
            updateSquare(z, index);
            checkWinner(z);
            count++;
        }
    }

    return {playGame, resetBoard};
})();

const gameFlow = (() => {

    const flow = ['', '', '', '', '', '', '', '', ''];

    const resetFlow = () => {
        for (let i = 0; i < 9; i++) {
            flow[i] = '';
        }
    }

    const addTurn = (marker, turn) => {
        flow[turn] = marker;
    }

    const getTurn = (num) => {
        if (flow[num - 1] == null || flow[num - 1] == 'O') {
            addTurn('X', num);
            return "X";
        }
        else {
            addTurn('O', num);
            return "O";
        }
    }
    return { getTurn, resetFlow };
})();


const player = (playerName) => {
    const getName = () => playerName;
    return {getName};
}


const player1 = player("a");
const player2 = player("b");



const clickBox = function () {
    const id = this.getAttribute('id');
    gameBoard.playGame(id);
}

const squares = document.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('click', clickBox));

const restart = document.querySelector('.restart');
restart.addEventListener('click', function () {
    gameBoard.resetBoard();
});





    //check if square is empty - if it is, proceed
    //check who's turn it is - which player and if they are X or O
    //if X, fill box with X -- if O, fill box with O
    //checkWInner





//     if (square.textContent=="") {
//         if(flow[count-1] == "X") {
//             game[id] = "O";
//             flow[count] = "O";
//         }
//         else if(flow[count-1] == "O") {
//             game[id] = "X";
//             flow[count] = "X";
//         }
//         else {
//             game[id] = "X";
//             flow[count] = "X";
//         }
//         square.textContent=game[id];
//         count++;

//         if ((game[0]=="X" && game[1]=="X" && game[1]=="X")
//         ||(game[3]=="X" && game[4]=="X" && game[5]=="X")
//         ||(game[6]=="X" && game[7]=="X" && game[8]=="X")
//         ||(game[0]=="X" && game[3]=="X" && game[6]=="X")
//         ||(game[1]=="X" && game[4]=="X" && game[7]=="X")
//         ||(game[2]=="X" && game[5]=="X" && game[8]=="X")
//         ||(game[0]=="X" && game[4]=="X" && game[8]=="X")
//         ||(game[2]=="X" && game[4]=="X" && game[6]=="X")
//         ||(game[0]=="O" && game[1]=="O" && game[1]=="O")
//         ||(game[3]=="O" && game[4]=="O" && game[5]=="O")
//         ||(game[6]=="O" && game[7]=="O" && game[8]=="O")
//         ||(game[0]=="O" && game[3]=="O" && game[6]=="O")
//         ||(game[1]=="O" && game[4]=="O" && game[7]=="O")
//         ||(game[2]=="O" && game[5]=="O" && game[8]=="O")
//         ||(game[0]=="O" && game[4]=="O" && game[8]=="O")
//         ||(game[2]=="O" && game[4]=="O" && game[6]=="O")){
//             const winner = document.createElement('div');
//             winner.className = "winner";
//             const player = player.getName;
//             winner.textContent = player + " is the winner";
//             const board = document.querySelector('.board');
//             board.appendChild(winner);
//         }
//     }
// }));


/*

game flow = who's turn it is?

winner: gameboard has all Xs or all Os in
0,1,2
3,4,5
6,7,8
0,3,6
1,4,7
2,5,8
0,4,8
2,4,6



let count = 0;
const squares = document.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('click', function() {
    const id = this.getAttribute('id');
    const game = gameBoard.game1;
    const flow = gameFlow.flow1;

    if (square.textContent=="") {
        if(flow[count-1] == "X") {
            game[id] = "O";
            flow[count] = "O";
        }
        else if(flow[count-1] == "O") {
            game[id] = "X";
            flow[count] = "X";
        }
        else {
            game[id] = "X";
            flow[count] = "X";
        }
        square.textContent=game[id];
        count++;

        if ((game[0]=="X" && game[1]=="X" && game[1]=="X")
        ||(game[3]=="X" && game[4]=="X" && game[5]=="X")
        ||(game[6]=="X" && game[7]=="X" && game[8]=="X")
        ||(game[0]=="X" && game[3]=="X" && game[6]=="X")
        ||(game[1]=="X" && game[4]=="X" && game[7]=="X")
        ||(game[2]=="X" && game[5]=="X" && game[8]=="X")
        ||(game[0]=="X" && game[4]=="X" && game[8]=="X")
        ||(game[2]=="X" && game[4]=="X" && game[6]=="X")
        ||(game[0]=="O" && game[1]=="O" && game[1]=="O")
        ||(game[3]=="O" && game[4]=="O" && game[5]=="O")
        ||(game[6]=="O" && game[7]=="O" && game[8]=="O")
        ||(game[0]=="O" && game[3]=="O" && game[6]=="O")
        ||(game[1]=="O" && game[4]=="O" && game[7]=="O")
        ||(game[2]=="O" && game[5]=="O" && game[8]=="O")
        ||(game[0]=="O" && game[4]=="O" && game[8]=="O")
        ||(game[2]=="O" && game[4]=="O" && game[6]=="O")){
            const winner = document.createElement('div');
            winner.className = "winner";
            const player = player.getName;
            winner.textContent = player + " is the winner";
            const board = document.querySelector('.board');
            board.appendChild(winner);
        }
    }
}));

*/


// if (gameBoard.isClear(id)) {
//     const z = gameFlow.getTurn();
//     if (xTurn){
//         gameBoard.updateSquare("X",id);
//         square.textContent = "X";
//         xTurn = false;
//         const message = gameBoard.checkWinner("X");
//         if (message != null){
//             console.log(message);
//         }
//     }
//     else {
//         gameBoard.updateSquare("O",id);
//         square.textContent = "O";
//         xTurn = true;
//         gameBoard.checkWinner("O");
//         const message = gameBoard.checkWinner("O");
//         if (message != null){
//             console.log(message);
//         }
//     }
// }
// }));

// if (gameBoard.isClear(id)) {
    //     const z = gameFlow.getTurn(count);
    //         gameBoard.updateSquare(z,id);
    //         const winner = gameBoard.checkWinner(z);
    //         if (winner){
    //             squares.forEach(square => square.removeEventListener('click', clickBox));
    //             gameBoard.winnerMessage(z);
    //             const replay = document.querySelector('.play-again');
    //             const playAgainButton = document.createElement('button');
    //             playAgainButton.id = "play-again-button"
    //             playAgainButton.textContent = "PLAY AGAIN?";
    //             replay.appendChild(playAgainButton);
    //             playAgainButton.addEventListener('click', playAgain);
    //         }
    //         count++;
    //     }