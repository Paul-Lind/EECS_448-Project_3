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
 * @description Moves the piece in the tile specified by the old position to the tile specified by the new position
 * */
function movePiece(oldPosition, newPosition)
{
  board[newPosition] = board[oldPosition];

  var selectedTileElement = document.getElementById(oldPosition);
  selectedTileElement.removeChild(selectedTileElement.firstChild);

  var pieceImage = document.createElement('img');

  if (board[oldPosition] == 'r')
  {
    pieceImage.src = 'redPiece.png';
  }
  else if (board[oldPosition] == 'b')
  {
    pieceImage.src = 'blackPiece.png';
  }

  document.getElementById(newPosition).appendChild(pieceImage);
  board[oldPosition] = 'e';
  isPieceSelected = false;
}

/**
 * @author Konrad Kahnert
 * @return {bool}
 * @description Returns true if moving a piece from oldPosition to newPosition is a valid move, returns false if it is not a valid move
 * */
function isMoveValid(oldPosition, newPosition)
{
  oldPosition = parseInt(oldPosition);
  newPosition = parseInt(newPosition);

  if (board[oldPosition] == 'r')
  {
    if ((newPosition == oldPosition - 9) || (newPosition == oldPosition - 7))
    {
      return(true);
    }
    else
    {
      return(false);
    }
  }
  else
  {
    if ((newPosition == oldPosition + 9) || (newPosition == oldPosition + 7))
    {
      return(true);
    }
    else
    {
      return(false);
    }
  }
}

/**
 * @author Konrad Kahnert
 * @return {void}
 * @description If a piece is clicked, selects the piece. If a piece is already selected and a valid empty tile piece is clicked, moves selected piece to that tile.
 * */
function tileClicked()
{
  console.log("Clicked tile " + this.id);

  if (board[this.id] == 'r' || board[this.id] == 'b') // if player clicked piece
  {
    // select clicked piece
    isPieceSelected = true;
    selectedPiecePosition = this.id;
  }
  else if (isPieceSelected == true) // if player clicked empty tile and a piece is selected
  {
    // move selected piece to empty tile
    if (isMoveValid(selectedPiecePosition, this.id) == true)
    {
      movePiece(selectedPiecePosition, this.id);
    }
  }
}
