/**
 * @author James Barnett
 * @return {void}
 * @description Checks after each move if the game is over and alerts the players if so
 * */
function checkWin() {
    let countBlack = 0;
    let countRed = 0;
    for (let i = 0; i < 63; i++) {
        if (board[i] == 'b' || board[i] == 'bk') {
            countBlack = countBlack + 1;
        } else if (board[i] == 'r' || board[i] == 'rk') {
            countRed = countRed + 1;
        }
    }
    if (countBlack == 0) {
        alert("Game Over! Red wins! Refresh the page to play again.");
    }
    else if (countRed == 0) {
        alert("Game Over! Black wins! Refresh the page to play again.");
    }
}