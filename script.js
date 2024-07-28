const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🍋', '🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🍋'];
let shuffledSymbols;
let selectedCells = [];
let matchedCells = [];
let gameActive = true;

function startGame() {
    shuffledSymbols = shuffleArray([...symbols]);
    selectedCells = [];
    matchedCells = [];
    gameActive = true;
    document.getElementById('message').textContent = '';
    renderBoard();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < shuffledSymbols.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(event) {
    if (!gameActive) return;
    const cell = event.target;
    const index = parseInt(cell.dataset.index, 10);
    if (selectedCells.length < 2 && !cell.classList.contains('matched') && !selectedCells.includes(index)) {
        cell.textContent = shuffledSymbols[index];
        selectedCells.push(index);
        if (selectedCells.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstIndex, secondIndex] = selectedCells;
    if (shuffledSymbols[firstIndex] === shuffledSymbols[secondIndex]) {
        document.querySelector(`.cell[data-index="${firstIndex}"]`).classList.add('matched');
        document.querySelector(`.cell[data-index="${secondIndex}"]`).classList.add('matched');
        matchedCells.push(firstIndex, secondIndex);
        if (matchedCells.length === shuffledSymbols.length) {
            document.getElementById('message').textContent = 'You win! Happy Birthday, Birthday Boy!';
            gameActive = false;
        }
    } else {
        setTimeout(() => {
            document.querySelector(`.cell[data-index="${firstIndex}"]`).textContent = '';
            document.querySelector(`.cell[data-index="${secondIndex}"]`).textContent = '';
        }, 1000);
    }
    selectedCells = [];
}

document.addEventListener('DOMContentLoaded', startGame);
