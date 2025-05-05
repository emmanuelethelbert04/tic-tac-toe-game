
function computerMove(){
  // find a empty cell for the computer to make a move 
  let emptyCells = [];
  for(row = 0; row < 3; row++){
    for(col = 0; col < 3; col++){
      if(board[row][col] === ''){
        emptyCells.push({row, col})
      }
    }
  }
  // check if there are any empty cell 
  if(emptyCells.length === 0){
    return;
  }
  let bestMove = minimax(board, currentPlayer);

  // update the board with the computer's move 
  board[bestMove.row],[bestMove.col] = currentPlayer;

  // Render the updated board
  renderBoard()
  
  // check for a win or draw 
  if(checkWin(currentPlayer)){
    alert(`${currentPlayer} wins!`);
    resetGame()
    // reStart()
    return;
  }else if(checkDraw()){
    alert(`It's a dram game`);
    resetGame()
    // reStart()
    return;
  }

  // switch to the next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  return;
}

function minimax(board, player){
  // base cases: check for terminal states (win, lose, draw
  if(checkWin('X')){
    return{score: -1};
  }else if (checkWin('O')){
    return{score: 1};
  }else if (checkDraw()){
    return{score: 0};
  }
  
  // initialize best move object 
  let bestMove = {};

  // maximize for the computer player (O)
  if(player === 'O'){
    bestMove.score = -Infinity;
    for(row = 0;  row < 3; row++){
      for(col = 0; col < 3; col++){
        if(board[row][col] === ''){
          board[row][col] = 'O';
          let moveScore = minimax(board, 'X').score;
          board[row][col] = '';
          if(moveScore > bestMove.score){
            bestMove.score = moveScore;
            bestMove.row = row;
            bestMove.col = col;
          }
        }
      }
    }
  }
  // minmize for the human player (X)
  else{
    bestMove.score = Infinity;
    for(let row = 0; row < 3; row++){
      for(col = 0; col < 3; col++){
        if(board[row][col] === ''){
          board[row][col] = 'X';
          let moveScore = minimax(board, 'O').score;
          // board[row][col] = '';
          if(moveScore < bestMove.score){
            bestMove.score = moveScore;
            bestMove.row = row;
            bestMove.col = col;
          }
        }
      }
    }
  }
  return bestMove
}


