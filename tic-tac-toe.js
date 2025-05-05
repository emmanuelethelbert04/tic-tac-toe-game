let boxes = document.querySelectorAll('.box');
let reStartBtn = document.querySelector('.js-btn');
let headerEle = document.querySelector('.js-header');
let mainHeader = document.querySelector('.js-main-header')


const Abox = [];
const tickCircle = 'O';
const tickX = 'X';
let currentPlayer = tickCircle;



// Draw Board for our tic-tac-toe game (the borders) 
function drawBoard(){
  boxes.forEach((box, i) => {
    let styleBoxes = '';
    if(i < 3){
      styleBoxes += 'border-bottom: 3px solid var(--text);';
      
      // styleBoxes += 'border-top: 3px solid var(--text);';
    }
    if(i % 3 === 0){
      styleBoxes += 'border-right: 3px solid var(--text);';

      // styleBoxes += 'border-left: 3px solid var(--text);'
    }
    if(i % 3 === 2){
      styleBoxes += 'border-left: 3px solid var(--text);';

      // styleBoxes += 'border-right: 3px solid var(--text);';
    }
    if(i > 5){
      styleBoxes += 'border-top: 3px solid var(--text);';

      // styleBoxes += 'border-bottom: 3px solid var(--text);';
    }
    box.style = styleBoxes

    box.addEventListener('click', boxClicked);
  })
}
// drawBoard();

// when clicked the boxes function()
function boxClicked(event){
  const id = event.target.id; //this target the id in the div
  if(!Abox[id]){
    Abox[id] = currentPlayer;
    event.target.innerHTML = currentPlayer
    
    if(playerWon()){
      mainHeader.innerHTML = `${currentPlayer}  won!`;
      restart();
      return;
    }
    
    currentPlayer = currentPlayer === tickCircle ? tickX : tickCircle;

    // if(currentPlayer === tickCircle){
    //   tickX;
    // }else{
    //   tickCircle
    // }
  }
  if(playDraw()){
    return;
  }
}

// players who won fucntion()
function playerWon(){
  // combination of the index position 0 statement
  if(Abox[0] === currentPlayer){
    if(Abox[1] === currentPlayer && Abox[2] === currentPlayer){
      headerEle.innerHTML = `${currentPlayer} wins up to the top`;
      return true;
    }
    if(Abox[3] === currentPlayer && Abox[6] === currentPlayer){
      headerEle.innerHTML = `${currentPlayer} wins on the left`
      return true;
    }
    if(Abox[4] === currentPlayer && Abox[8] === currentPlayer){
      headerEle.innerHTML = `${currentPlayer} wins diagonally`;
      return true;
    }
  }
   
  // combination of the index position 8 statement 
  if(Abox[8] === currentPlayer){
    if(Abox[2] === currentPlayer && Abox[5] === currentPlayer){
      headerEle.innerHTML = `${currentPlayer} wins on the right`;
    }
    if(Abox[6] === currentPlayer && Abox[7] === currentPlayer){
      headerEle.innerHTML = `${currentPlayer}  wins on the bottom`;
      return true;
    }
  }

  // combination of the index position 4 statement
  if(Abox[4] === currentPlayer){
    if(Abox[1] === currentPlayer && Abox[7] === currentPlayer){
      headerEle.innerHTML = `${currentPlayer}  wins vertically on middle `;
      return true;
    }
    if(Abox[3] === currentPlayer && Abox[5] === currentPlayer){
      headerEle.innerHTML = `${currentPlayer} won form the horizontally on the middle`;
    }
    if(Abox[2] === currentPlayer && Abox[6] === currentPlayer){
      headerEle.innerHTML = `${currentPlayer} wins diagonally`;
    }
  }
}

// player draw function ()
function playDraw(){
  let Draw = 0;

  Abox.forEach((Abox, i) => {
    if (Abox[i] !== null) {
      Draw++;
    }
  })

  if(Draw === 9){
    mainHeader.innerHTML ='Draw'
    restart();
  }
}

// The restart function ()

function restart(){
  setTimeout(() => {
    Abox.forEach((Abox, i) => {
      Abox[i] = false;
    })
    boxes.forEach((box) => {
      box.innerHTML = '';
    })
    mainHeader.innerHTML = 'PLAY';
    // headerEle.innerHTML= '';
    window.location.reload()
  }, 1000)
}

reStartBtn .addEventListener('click', reStart);

function reStart(){
  window.location.reload()
}
drawBoard()