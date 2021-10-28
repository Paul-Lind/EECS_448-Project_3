let isPieceSelected = false;
let selectedPiecePosition;

let board = [];
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 64; i++) {
        board.push('e');
        document.getElementById(i).addEventListener("click", tileClicked);
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
    console.log(document);
}

/**
 * @author Konrad Kahnert
 * @return {void}
 * @description to be written
 * */
function tileClicked()
{
  if (board[this.id] == 'r' || board[this.id] == 'b') // if player clicked piece
  {
    // select clicked piece
    isPieceSelected = true;
    selectedPiecePosition = this.id;

    console.log("Selected Piece " + this.id);
  }
  else if (isPieceSelected == true) // if player clicked empty tile and a piece is selected
  {
    // move piece to empty tile
    board[this.id] = board[selectedPiecePosition]

    var selectedTileElement = document.getElementById(selectedPiecePosition);
    selectedTileElement.removeChild(selectedTileElement.firstChild);

    var pieceImage = document.createElement('img');

    if (board[selectedPiecePosition] == 'r')
    {
      pieceImage.src = 'redPiece.png';
    }
    else if (board[selectedPiecePosition] == 'b')
    {
      pieceImage.src = 'blackPiece.png';
    }

    this.appendChild(pieceImage);

    console.log("Placed " + board[selectedPiecePosition] + " piece at " + this.id);
    board[selectedPiecePosition] = 'e';
    isPieceSelected = false;
  }
}