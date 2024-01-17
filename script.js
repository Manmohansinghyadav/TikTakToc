const inputForm = document.getElementById('input-form');
const gameContainer = document.getElementById('game-container');
const board = document.getElementById('board');
const result = document.getElementById('result');
const turnDisplay = document.getElementById('turn-display');
const endGameMessage = document.getElementById('end-game-message');
const winnerMessage = document.getElementById('winner-message');
const currentPlayerDisplay = document.getElementById('current-player');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function startGame() {
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    if (!player1Name || !player2Name) {
        alert('Please enter names for both players.');
        return;
    }

    currentPlayer = 'X';
    gameActive = true;

    inputForm.style.display = 'none';
    gameContainer.style.display = 'block';

    currentPlayerDisplay.textContent = currentPlayer;
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            endGame(`${currentPlayer} wins!`);
        } else if (gameBoard.every(cell => cell !== '')) {
            endGame('It\'s a tie!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.textContent = currentPlayer;
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function endGame(message) {
    gameActive = false;
    result.textContent = message;
    endGameMessage.style.display = 'block';
    winnerMessage.textContent = message;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    result.textContent = '';
    gameActive = true;
    turnDisplay.textContent = currentPlayer;
    endGameMessage.style.display = 'none';

    // Clear the board
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Initialize the game
createBoard();
