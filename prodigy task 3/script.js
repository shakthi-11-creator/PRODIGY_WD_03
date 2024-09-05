const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const modeSelect = document.getElementById('mode');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let againstAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }
    if (!gameState.includes('')) {
        alert("It's a draw!");
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (againstAI && currentPlayer === 'O') {
        aiMove();
    }
}
function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}
function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    gameActive = true;
}
function aiMove() {
    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    if (checkWin()) {
        alert(`O wins!`);
        gameActive = false;
        return;
    }
    if (!gameState.includes('')) {
        alert("It's a draw!");
        gameActive = false;
        return;
    }
    currentPlayer = 'X';
}
function handleModeChange() {
    againstAI = modeSelect.value === 'AI';
    restartGame();
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
modeSelect.addEventListener('change', handleModeChange);