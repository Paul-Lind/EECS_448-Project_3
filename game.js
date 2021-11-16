/**
 * @author James Barnett
 * @return {void}
 * @description Checks after each move if the game is over and alerts the players if so
 * */
function checkWin() {
    let countBlack = 0;
    let countRed = 0;
    // cycles through board and counts number of pieces for each player
    for (let i = 0; i < 63; i++) {
        if (board[i] == 'b' || board[i] == 'bk') {
            countBlack = countBlack + 1;
        } else if (board[i] == 'r' || board[i] == 'rk') {
            countRed = countRed + 1;
        }
    }
    // alerts player of game over if a player reaches zero pieces
    if (countBlack == 0) {
        alert("Game Over! Red wins! Refresh the page to play again.");
    }
    else if (countRed == 0) {
        alert("Game Over! Black wins! Refresh the page to play again.");
    }
}

/**
 * @author Cole Guion
 * @return {void}
 * @description Checks at beginning of turn is no pieces are able to make a valid move resulting in a loss
 * */
function stalemate(pieceColor) {
    //Cannot test this into turn switching function is implemented
    var staleMate = true;

    if(pieceColor == 'b' || pieceColor == 'bk')
    {
        for (let i=0; i<64; i++)
        {
            if (board[i] != 'e')
            {
                for (let j=0; j<64; j++)
                {
                    if(isValidRegMove(i,j) == true)
                    {
                        staleMate = false;
                    }
                    else if (isValidJumpMove(i,j) == true)
                    {
                        staleMate = false;
                    }
                }
            }
        }
        if (staleMate == true)
        {
            alert("Game Over! Red wins! Refresh the page to play again.");
        }
    }
    else if(pieceColor == 'r' || pieceColor == 'rk')
    {
        for (let i=0; i<64; i++)
        {
            if (board[i] != 'e')
            {
                for (let j=0; j<64; j++)
                {
                    if(isValidRegMove(i,j) == true)
                    {
                        staleMate = false;
                    }
                    else if (isValidJumpMove(i,j) == true)
                    {
                        staleMate = false;
                    }
                }
            }
        }
        if (staleMate == true)
        {
            alert("Game Over! Black wins! Refresh the page to play again.");
        }
    }
}