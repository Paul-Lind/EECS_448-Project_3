let board = [];
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 64; i++) {
        board.push(i);
    }
    placePieces();
})

/**
 * @author James Barnett
 * @return {void}
 * @description function that places the game pieces on the board
 * */
function placePieces() {

    // black piece placement
    for (let i = 0; i <= 23; i++) {
        var blackPiece = document.createElement('img');
        blackPiece.src = 'blackPiece.png';

        if (i < 8 && i % 2 == 1) {
            document.getElementById(i).appendChild(blackPiece);
            board[i] = 'b';
        }
        else if (i >= 8 && i < 16 && i % 2 == 0) {
            document.getElementById(i).appendChild(blackPiece);
            board[i] = 'b';
        }
        else if (i >= 16 && i % 2 == 1) {
            document.getElementById(i).appendChild(blackPiece);
            board[i] = 'b';
        }
    }

    // red piece placement
    for (let i = 40; i < 64; i++) {
        var redPiece = document.createElement('img');
        redPiece.src = 'redPiece.png';

        if (i < 48 && i % 2 == 0) {
            document.getElementById(i).appendChild(redPiece);
            board[i] = 'r'
        }
        else if (i >= 48 && i < 56 && i % 2 == 1) {
            document.getElementById(i).appendChild(redPiece);
            board[i] = 'r'
        }
        else if (i >= 56 && i % 2 == 0) {
            document.getElementById(i).appendChild(redPiece);
            board[i] = 'r'
        }
    }
    console.log(board);
}