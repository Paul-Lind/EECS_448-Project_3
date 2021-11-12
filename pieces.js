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

  var newPosOnBoard = parseInt(newPosition);

  var pieceImage = document.createElement('img');

  if (board[oldPosition] == 'r')
  {
    if (newPosOnBoard < 8)
    {
      pieceImage.src = 'redKingPiece.png';
      board[newPosition] = 'rk';
    }
    else
    {
      pieceImage.src = 'redPiece.png';
    }
  }
  else if (board[oldPosition] == 'b')
  {
    if (newPosOnBoard > 55)
    {
      pieceImage.src = 'blackKingPiece.png';
      board[newPosition] = 'bk';
    }
    else
    {
      pieceImage.src = 'blackPiece.png';
    }
  }
  else if (board[oldPosition] == 'bk')
  {
    pieceImage.src = 'blackKingPiece.png';
  }
  else if (board[oldPosition] == 'rk')
  {
    pieceImage.src = 'redKingPiece.png';
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
  var selectedTileElement = document.getElementById(newPosition);
  var classNewPos = selectedTileElement.className;
  oldPosition = parseInt(oldPosition);
  newPosition = parseInt(newPosition);

  if (board[oldPosition] == 'r')
  {
    if ((newPosition == oldPosition - 9) || (newPosition == oldPosition - 7))
    {
      if (classNewPos == "sqr-tan")
      {
        return(false);
      }
      return(true);
    }
    else
    {
      return(false);
    }
  }
  else if (board[oldPosition] == 'b')
  {
    if ((newPosition == oldPosition + 9) || (newPosition == oldPosition + 7))
    {
      if (classNewPos == "sqr-tan")
      {
        return(false);
      }
      return(true);
    }
    else
    {
      return(false);
    }
  }
  else if (board[oldPosition] == 'rk' || board[oldPosition] == 'bk')
  {
    if ((newPosition == oldPosition + 9) || (newPosition == oldPosition + 7) || (newPosition == oldPosition - 9) || (newPosition == oldPosition - 7))
    {
      if (classNewPos == "sqr-tan")
      {
        return(false);
      }
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

  if (board[this.id] == 'r' || board[this.id] == 'b' || board[this.id] == 'bk' || board[this.id] == 'rk') // if player clicked piece
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