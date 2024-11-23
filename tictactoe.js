let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let isTwoPlayer = true;
let isComputerTurn = false;

const boardElement = document.getElementById('board');
const resetButton = document.getElementById('reset');
const statusElement = document.getElementById('status');
const gameContainer = document.querySelector('.game-container');
const menu = document.querySelector('.menu');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
const onePlayerBtn = document.getElementById('onePlayerBtn');
const changeModeBtn = document.getElementById('changeMode');

twoPlayerBtn.addEventListener('click', function() {
    isTwoPlayer = true;
    startGame();
  });
  
  onePlayerBtn.addEventListener('click', function() {
    isTwoPlayer = false;
    startGame();
  });
  
  changeModeBtn.addEventListener('click', function() {
    menu.style.display = 'block';
    gameContainer.style.display = 'none';
    resetGame();
  });  

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => makeMove(index));
    boardElement.appendChild(cellElement);
  });
}

function makeMove(index) {
  if (board[index] === '' && !gameOver && (!isComputerTurn || isTwoPlayer)) {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateBoard();
    checkWinner();
    if (!gameOver && !isTwoPlayer && currentPlayer === 'O') {
      setTimeout(computerMove, 500);
    }
  }
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    if (board[index] !== '') {
      cell.classList.add('taken');
    }
  });
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      statusElement.textContent = `${board[a]} játékos nyert!`;
      gameOver = true;
      return;
    }
  }

  if (!board.includes('')) {
    statusElement.textContent = 'A játék döntetlen!';
    gameOver = true;
  }
}

function computerMove() {
  isComputerTurn = true;

  let move = findBestMove('O');
  if (move !== null) {
    board[move] = 'O';
  } else {
    move = findBestMove('X');
    if (move !== null) {
      board[move] = 'O';
    } else {
      const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
      move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      board[move] = 'O';
    }
  }

  currentPlayer = 'X';
  updateBoard();
  checkWinner();
  isComputerTurn = false;
}

function findBestMove(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const cells = [board[a], board[b], board[c]];

    const emptyIndex = cells.indexOf('');
    if (cells.filter(cell => cell === player).length === 2 && emptyIndex !== -1) {
      return [a, b, c][emptyIndex];
    }
  }

  return null;
}

resetButton.addEventListener('click', () => {
  resetGame();
  createBoard();
});

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  statusElement.textContent = '';
  createBoard();
}

function startGame() {
  menu.style.display = 'none';
  gameContainer.style.display = 'block';
  createBoard();
}

createBoard();
