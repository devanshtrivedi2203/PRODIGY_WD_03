let currentPlayer = 'X';  // 'X' starts the game
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Track board state
let gameOver = false;

const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');

// Create the 3x3 board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
}

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameBoard[index] !== '' || gameOver) return;  // Ignore if cell is taken or game over

  // Mark the cell with the current player's symbol
  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  // Check if the current player has won
  if (checkWinner()) {
    gameOver = true;
    alert(`${currentPlayer} wins!`);
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];

  for (let combination of winningCombination) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;  // We have a winner
    }
  }

  // Check for a draw (if all cells are filled)
  if (!gameBoard.includes('')) {
    gameOver = true;
    alert("It's a draw!");
  }

  return false;
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.textContent = '');  // Clear the board
}
