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
 * @description Returns true if moving a piece from oldPosition to newPosition is a valid regular move, returns false if it is not a valid regular move
 * */
function isValidRegMove(oldPosition, newPosition)
{
  oldPosition = parseInt(oldPosition);
  newPosition = parseInt(newPosition);

  if (document.getElementById(newPosition).className == "sqr-brown") // if a brown square was clicked
  {
    if (board[oldPosition] == 'r')
    {
      if ((newPosition == oldPosition - 9) || (newPosition == oldPosition - 7)) // if new pos is up 1 left 1 or up 1 right 1
      {
        return(true);
      }
      else
      {
        return(false);
      }
    }
    else if (board[oldPosition] == 'b')
    {
      if ((newPosition == oldPosition + 9) || (newPosition == oldPosition + 7)) // if new pos is down 1 right 1 or down 1 left 1
      {
        return(true);
      }
      else
      {
        return(false);
      }
    }
    else if (board[oldPosition] == 'rk' || board[oldPosition] == 'bk')
    {
      if ((newPosition == oldPosition + 9) || (newPosition == oldPosition + 7) || (newPosition == oldPosition - 9) || (newPosition == oldPosition - 7)) // if new pos is vertical to old pos and 1 space away
      {
        return(true);
      }
      else
      {
        return(false);
      }
    }
  }
  else
  {
    return(false);
  }
}

/**
 * @author Konrad Kahnert
 * @return {bool}
 * @description Returns true and deletes taken piece if moving a piece from oldPosition to newPosition is a valid jump move, returns false if it is not a valid jump move
 * */
function isValidJumpMove(oldPosition, newPosition)
{
  oldPosition = parseInt(oldPosition);
  newPosition = parseInt(newPosition);

  if (document.getElementById(newPosition).className == "sqr-brown") // if a brown square was clicked
  {
    if (board[oldPosition] == 'r')
    {
      if (newPosition == oldPosition - 18) // if new pos is up 2 left 2
      {
        if ((board[oldPosition - 9] == 'b') || (board[oldPosition - 9] == 'bk')) // if there is a black piece up 1 left 1
        {
            removePiece(oldPosition - 9);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else if (newPosition == oldPosition - 14) // if new pos is up 2 right 2
      {
        if ((board[oldPosition - 7] == 'b') || (board[oldPosition - 7] == 'bk')) // if there is a black piece up 1 right 1
        {
            removePiece(oldPosition - 7);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else
      {
        return(false);
      }
    }
    else if (board[oldPosition] == 'b')
    {
      if (newPosition == oldPosition + 18) // if new pos is down 2 right 2
      {
        if ((board[oldPosition + 9] == 'r') || (board[oldPosition + 9] == 'rk')) // if there is a red piece down 1 right 1
        {
            removePiece(oldPosition + 9);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else if (newPosition == oldPosition + 14) // if new pos is down 2 left 2
      {
        if ((board[oldPosition + 7] == 'r') || (board[oldPosition + 7] == 'rk')) // if there is a red piece down 1 left 1
        {
            removePiece(oldPosition + 7);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else
      {
        return(false);
      }
    }
    else if (board[oldPosition] == 'rk')
    {
      if (newPosition == oldPosition - 18) // if new pos is up 2 left 2
      {
        if ((board[oldPosition - 9] == 'b') || (board[oldPosition - 9] == 'bk')) // if there is a black piece up 1 left 1
        {
            removePiece(oldPosition - 9);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else if (newPosition == oldPosition - 14) // if new pos is up 2 right 2
      {
        if ((board[oldPosition - 7] == 'b') || (board[oldPosition - 7] == 'bk')) // if there is a black piece up 1 right 1
        {
            removePiece(oldPosition - 7);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      if (newPosition == oldPosition + 18) // if new pos is down 2 right 2
      {
        if ((board[oldPosition + 9] == 'b') || (board[oldPosition + 9] == 'bk')) // if there is a black piece down 1 right 1
        {
            removePiece(oldPosition + 9);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else if (newPosition == oldPosition + 14) // if new pos is down 2 left 2
      {
        if ((board[oldPosition + 7] == 'b') || (board[oldPosition + 7] == 'bk')) // if there is a black piece down 1 left 1
        {
            removePiece(oldPosition + 7);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else
      {
        return(false);
      }
    }
    else if (board[oldPosition] == 'bk')
    {
      if (newPosition == oldPosition - 18) // if new pos is up 2 left 2
      {
        if ((board[oldPosition - 9] == 'r') || (board[oldPosition - 9] == 'rk')) // if there is a red piece up 1 left 1
        {
            removePiece(oldPosition - 9);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else if (newPosition == oldPosition - 14) // if new pos is up 2 right 2
      {
        if ((board[oldPosition - 7] == 'r') || (board[oldPosition - 7] == 'rk')) // if there is a red piece up 1 right 1
        {
            removePiece(oldPosition - 7);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      if (newPosition == oldPosition + 18) // if new pos is down 2 right 2
      {
        if ((board[oldPosition + 9] == 'r') || (board[oldPosition + 9] == 'rk')) // if there is a red piece down 1 right 1
        {
            removePiece(oldPosition + 9);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else if (newPosition == oldPosition + 14) // if new pos is down 2 left 2
      {
        if ((board[oldPosition + 7] == 'r') || (board[oldPosition + 7] == 'rk')) // if there is a red piece down 1 left 1
        {
            removePiece(oldPosition + 7);
          return(true);
        }
        else
        {
          return(false);
        }
      }
      else
      {
        return(false);
      }
    }
  }
  else
  {
    return(false);
  }
}

/**
 * @author Konrad Kahnert
 * @return {void}
 * @description removes piece at selected position from the board
 * */
function removePiece(position)
{
    var tile = document.getElementById(position);
    tile.removeChild(tile.firstChild);
    board[position] = 'e';
    checkWin();
}

/**
 * @author Konrad Kahnert
 * @return {void}
 * @description If a piece is clicked, selects the piece. If a piece is already selected and a valid empty tile piece is clicked, moves selected piece to that tile.
 * */
function tileClicked()
{
  if (board[this.id] == 'r' || board[this.id] == 'b' || board[this.id] == 'bk' || board[this.id] == 'rk') // if player clicked piece
  {
    // select clicked piece
    isPieceSelected = true;
    selectedPiecePosition = this.id;
  }
  else if (isPieceSelected == true) // if player clicked empty tile and a piece is selected
  {
    // move selected piece to empty tile
    if ((isValidRegMove(selectedPiecePosition, this.id) == true) || (isValidJumpMove(selectedPiecePosition, this.id) == true))
    {
      movePiece(selectedPiecePosition, this.id);
    }
  }
}



/**
 * @author Cole Guion
 * @return {void}
 * @description Test suite to check basic functionalities of program
 * */
 function test() {
  //alert("TEST");

  //Test 1 -- Regular pieces can only make valid regular moves
  {
    var passFail = "Passed";
    //clear board and set one black piece on the third row in the fourth(19th) square
    for (let i=0; i<64; i++)
    {
      board[i] = 'e';
    }
    board[19] = 'b';

    //Check every space on board for valid moves
    for (let i=0; i<64; i++)
    {
      if (i == 26 || i == 28)
      {
        if(isValidRegMove(19, i) == false)
        {
          passFail = "Failed";
        }
      }
      else {
        if(isValidRegMove(19, i) == true)
        {
          passFail = "Failed";
        }
      }
    }
    alert("Test 1: Normal Pieces only make valid moves = " + passFail)
  }

  //Test-2 -- King pieces can only make valid regular moves
  {
    var passFail = "Passed";
    //clear board and set one red king piece on the third row in the fourth(19th) square
    for (let i=0; i<64; i++)
    {
      board[i] = 'e';
    }
    board[19] = 'rk';

    //Check every space on board for valid moves
    for (let i=0; i<64; i++)
    {
      if (i == 26 || i == 28 || i == 10 || i == 12)
      {
        if(isValidRegMove(19, i) == false)
        {
          passFail = "Failed";
        }
      }
      else {
        if(isValidRegMove(19, i) == true)
        {
          passFail = "Failed";
        }
      }
    }
    alert("Test 2: King pieces only make valid moves = " + passFail)
  }

  //Test 3 -- If there is a valid move selected then piece is moved to that position
  {
    var passFail = "Passed";
    //clear board and set one black king piece on the third row in the fourth(19th) square
    for (let i=0; i<64; i++)
    {
      board[i] = 'e';
    }
    board[19] = 'bk';

    //Check bottom right corner move
    movePiece(19, 28);
    if (board[28] == 'e')
    {
      passFail = "Failed";
    }

    //Check top left corner move
    movePiece(28, 19);
    if (board[19] == 'e')
    {
      passFail = "Failed";
    }

    //Check bottom left corner move
    movePiece(19, 26);
    if (board[26] == 'e')
    {
      passFail = "Failed";
    }

    //Check top right corner move
    movePiece(26, 19);
    if (board[19] == 'e')
    {
      passFail = "Failed";
    }    

    alert("Test 3: movePiece function actually moves pieces to desired square = " + passFail);

  }

  //Clears board for game setup after test
  //DONT KNOW HOW TO CLEAR PIECES FROM TEST
  /**for (let i=0; i<64; i++)
  {
    board[i] = 'e';
  }
  placePieces();
  */
}
