// global varaibles 
let reStartBtn = document.querySelector('.js-btn');
let headerEle = document.querySelector('.js-header');
let mainHeader = document.querySelector('.js-main-header')

// initialize the game state 
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]
let currentPlayer = 'X';

// function to make a move 
function makeMove(row, col){
  // check if the seleted cell is empty
  if(board[row][col] === ''){
    board[row][col] = currentPlayer;

    // Render the updated board
    renderBoard()

    // check for a win or draw 
    if(checkWin(currentPlayer)){
      mainHeader.innerHTML = `${currentPlayer} wins!`;
      resetGame();
      // reStart();
      return;
    }else if(checkDraw()){
      mainHeader.innerHTML = `Draw`;
      resetGame();
      // reStart();
      return;
    }
    // switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    // make a computer's moove
    setTimeout(computerMove, 500);
  }
}

// function for renderBoard 
function renderBoard(){
  const cells = document.querySelectorAll('.cell');
  let index = 0;
  for(let i = 0; i < 3; i++){ //row side
    for(let x = 0; x < 3; x++){ //col side
      cells[index].innerHTML = board[i][x];
      index++;
    }
  }
}

// function to check for wins
function checkWin(player){
  // check row 
  for(let row = 0; row < 3; row++){
    if(board[row][0] === player && board[row][1] === player && board[row][2] === player){
      // alert( `${currentPlayer} win in rows`);
      return true;
    }
  }
  // check col 
  for(let col = 0; col < 3; col++){
    if(board[0][col] === player && board[1][col] === player && board[2][col] === player){
      // alert( `${currentPlayer} win in colums`);
      return true;
    }
  }

  // check Diagonals 
  if(board[0][0] === player && board[1][1] === player && board[2][2] === player){
    // alert(`${currentPlayer} win in diagonally`);
    return true;
  }
  if(board[0][2] === player && board[1][1] === player && board[2][0] === player){
    // alert(`${currentPlayer} win in diagonally`);
    return true
  }
  return false
}

// function to check for a draw 
function checkDraw(){
  for(row = 0; row < 3; row++){
    for(col = 0; col < 3; col++){
      if(board[row][col] === ''){
        return false;
      }
    }
  }
  return true;
}
// function to make the comupter's move 

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
  // Randomly select an empty cell 
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let randomCell = emptyCells[randomIndex];
  // update the board with the computer's move 
  board[randomCell.row][randomCell.col] = currentPlayer;

  // Render the updated board
  renderBoard()
  
  // check for a win or draw 
  if(checkWin(currentPlayer)){
    mainHeader.innerHTML = `${currentPlayer} wins!`;
    resetGame();
    // reStart();
    return;
  }else if(checkDraw()){
    mainHeader.innerHTML =`Draw`;
    resetGame();
    // reStart();
    return;
  }

  // switch to the next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  return;
}
reStartBtn.addEventListener('click', restart);
// Function to reset the game
function resetGame() {
  setTimeout(() =>{
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    currentPlayer = 'X';
    mainHeader.innerHTML = 'PLAY';
    renderBoard();
  },1000)
}
function restart(){
  window.location.reload();
}