let boardSize = 8;
let numMines = 10;
let timerInterval = null;
let seconds = 0;
let hintsLeft = 5;
let audio_volume = 1;
let board = [];
let firstClick = true;
let flagsRemaining = numMines;
let numStartMines = numMines;
let gameOver = false;

// Get URL parameters and initialize the game
getURLParams();
startGame();

function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const sizeParam = params.get('size');
    const minesParam = params.get('mines');
    if (sizeParam) {
        boardSize = parseInt(sizeParam, 10);
    }
    if (minesParam) {
        numMines = parseInt(minesParam, 10);
    }
}

function updateURLParams() {
    const params = new URLSearchParams(window.location.search);
    params.set('size', boardSize);
    params.set('mines', numMines);
    const newUrl = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newUrl);
}

function checkCustomSettings() {
    // If number input's value is more or less than max/min (respectively), set it to max/min
    const sizeInput = document.getElementById('custom-size');
    const minesInput = document.getElementById('custom-mines');
    const maxSize = 20;
    const minSize = 5;
    const maxMines = 99;
    const minMines = 1;
    if (sizeInput.value > maxSize) {
        sizeInput.value = maxSize;
    } else if (sizeInput.value < minSize) {
        sizeInput.value = minSize;
    }
    if (minesInput.value > maxMines) {
        minesInput.value = maxMines;
    } else if (minesInput.value < minMines) {
        minesInput.value = minMines;
    }
    // If number of mines is more than total cells, set it to total cells - 1
    const totalCells = sizeInput.value * sizeInput.value;
    if (minesInput.value >= totalCells) {
        minesInput.value = totalCells - 1;
    }
}

function toggleMute() {
    const volumeButton = document.getElementById('muteButton');
    if (audio_volume) {
        audio_volume = 0;
        volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        audio_volume = 1;
        volumeButton.innerHTML = '<i class="fas fa-volume-high"></i>';
    }
}

function hint() {
    if (!gameOver && hintsLeft > 0) {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (!board[i][j].isMine && !board[i][j].isRevealed) {
                    board[i][j].isRevealed = true;
                    if (board[i][j].neighborMines === 0) {
                        revealAdjacentCells(i, j);
                    }
                    renderBoard();
                    hintsLeft -= 1;
                    console.log('Hints left:', hintsLeft);
                    document.getElementById('hintCounter').innerText = hintsLeft;
                    return;
                }
            }
        }
    }
}

function setDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
    if (difficulty === 'custom') {
        showCustomSettings();
    } else {
        hideCustomSettings();
        switch(difficulty) {
            case 'easy':
                boardSize = 8;
                numMines = 10;
                break;
            case 'medium':
                boardSize = 12;
                numMines = 15;
                break;
            case 'hard':
                boardSize = 15;
                numMines = 20;
                break;
        }
        updateURLParams();
        startGame();
    }
    updateURLParams();
}

function showCustomSettings() {
    document.getElementById('custom-settings').style.display = 'block';
}

function hideCustomSettings() {
    document.getElementById('custom-settings').style.display = 'none';
}

function applyCustomSettings() {
    const sizeInput = document.getElementById('custom-size');
    const minesInput = document.getElementById('custom-mines');
    boardSize = parseInt(sizeInput.value, 10);
    numMines = parseInt(minesInput.value, 10);
    if (numMines >= boardSize * boardSize) {
        alert("Number of mines must be less than total cells.");
        numMines = boardSize * boardSize - 1;
        minesInput.value = numMines;
    }
    updateURLParams();
    startGame();
}

function checkCustomSettings() {
    // If number input's value is more or less than max/min (respectively), set it to max/min
    const sizeInput = document.getElementById('custom-size');
    const minesInput = document.getElementById('custom-mines');
    const maxSize = 15;
    const minSize = 5;
    const maxMines = 20;
    const minMines = 1;
    if (sizeInput.value > maxSize) {
        sizeInput.value = maxSize;
    } else if (sizeInput.value < minSize) {
        sizeInput.value = minSize;
    }
    if (minesInput.value > maxMines) {
        minesInput.value = maxMines;
    } else if (minesInput.value < minMines) {
        minesInput.value = minMines;
    }
    // If number of mines is more than total cells, set it to total cells - 1
    const totalCells = sizeInput.value * sizeInput.value;
    if (minesInput.value >= totalCells) {
        minesInput.value = totalCells - 1;
    }
}

function startGame() {
    clearInterval(timerInterval);
    seconds = 0;
    board = createEmptyBoard(boardSize);
    firstClick = true;
    flagsRemaining = numMines;
    numStartMines = numMines;
    gameOver = false;
    document.getElementById('flagsRemaining').textContent = flagsRemaining;
    document.getElementById('numMines').textContent = numStartMines;
    renderBoard();
    const startButtonElement = document.getElementById('startbutton');
    startButtonElement.textContent = "Restart Game";
    document.body.style.backgroundColor = 'var(--website-background-color)';

    updateDifficultyDropdown();

    timerInterval = setInterval(function() {
        seconds += 0.1;
        seconds = Math.round(seconds * 10) / 10;
    
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = (seconds % 60).toFixed(1);
    
        if (seconds % 60 < 10) {
            remainingSeconds = '0' + remainingSeconds;
        }
    
        document.getElementById('timer').textContent = minutes + ':' + remainingSeconds;
    }, 100);

    document.getElementById('hintbutton').disabled = true;
    hintsLeft = 5;
    document.getElementById('hintCounter').innerText = hintsLeft;
    console.log('Hints left:', hintsLeft);
}

function updateDifficultyDropdown() {
    const difficultyDropdown = document.getElementById('difficulty');
    if (boardSize === 8 && numMines === 10) {
        difficultyDropdown.value = 'easy';
        hideCustomSettings();
    } else if (boardSize === 12 && numMines === 15) {
        difficultyDropdown.value = 'medium';
        hideCustomSettings();
    } else if (boardSize === 15 && numMines === 20) {
        difficultyDropdown.value = 'hard';
        hideCustomSettings();
    } else {
        difficultyDropdown.value = 'custom';
        showCustomSettings();
        document.getElementById('custom-size').value = boardSize;
        document.getElementById('custom-mines').value = numMines;
    }
}

function createEmptyBoard(size) {
    let board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
            };
        }
    }
    return board;
}

function placeMines(board, excludeX, excludeY) {
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        let x = Math.floor(Math.random() * boardSize);
        let y = Math.floor(Math.random() * boardSize);
        if ((x !== excludeX || y !== excludeY) && !board[x][y].isMine) {
            board[x][y].isMine = true;
            minesPlaced++;
        }
    }
    document.getElementById('hintbutton').disabled = false;
}

function calculateNeighborMines(board) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].isMine) {
                continue;
            }
            let mineCount = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    let nx = i + x;
                    let ny = j + y;
                    if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny].isMine) {
                        mineCount++;
                    }
                }
            }
            board[i][j].neighborMines = mineCount;
        }
    }
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ' ';
    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('button');
            cell.className = 'cell';
            if (board[i][j].isRevealed) {
                if (board[i][j].isMine) {
                    cell.innerHTML = '💣';
                    cell.style.backgroundColor = '#f00';
                } else {
                    if (board[i][j].neighborMines > 0) {
                        cell.textContent = board[i][j].neighborMines;
                        cell.style.backgroundColor = '#C0C9C9'; // Single color for 1-8 mines
                    } else {
                        cell.textContent = '0';
                        cell.style.backgroundColor = '#ddd'; // Default background for revealed cells
                        cell.style.color = 'gray'; // Set text color to gray for 0 neighboring mines
                    }
                }
            } else if (board[i][j].isFlagged) {
                cell.innerHTML = '🚩';
                cell.style.backgroundColor = '#fdd';
            } else {
                cell.textContent = ''; 
            }
            if (!gameOver) {
                cell.addEventListener('click', () => revealCell(i, j));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    toggleFlag(i, j);
                });
            }
            boardElement.appendChild(cell);
        }
    }
}


function revealCell(x, y) {
    if (firstClick) {
        placeMines(board, x, y);
        calculateNeighborMines(board);
        while (board[x][y].neighborMines !== 0) {
            board = createEmptyBoard(boardSize);
            placeMines(board, x, y);
            calculateNeighborMines(board);
        }
        firstClick = false;
    }

    if (board[x][y].isFlagged || board[x][y].isRevealed || gameOver) {
        return;
    }

    if (board[x][y].isMine) {
        board[x][y].isRevealed = true;
        gameOver = true;
        document.body.style.backgroundColor = '#EF5350'; // Set red background when losing
        revealAllMines();
        renderBoard();
        loseSound();    
        return;
    }

    board[x][y].isRevealed = true;
    if (board[x][y].neighborMines === 0) {
        revealAdjacentCells(x, y);
    }
    renderBoard();
    checkWinCondition();
}

function revealAllMines() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].isMine) {
                board[i][j].isRevealed = true;
            }
        }
    }
    clearInterval(timerInterval);
}

function revealAdjacentCells(x, y) {
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            let nx = x + dx;
            let ny = y + dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && !board[nx][ny].isRevealed && !board[nx][ny].isMine) {
                board[nx][ny].isRevealed = true;
                if (board[nx][ny].neighborMines === 0) {
                    revealAdjacentCells(nx, ny);
                }
            }
        }
    }
}

function toggleFlag(x, y) {
    if (board[x][y].isRevealed || gameOver) {
        return;
    }
    if (board[x][y].isFlagged) {
        board[x][y].isFlagged = false;
        flagsRemaining++;
    } else if (flagsRemaining > 0) {
        board[x][y].isFlagged = true;
        flagsRemaining--;
    }
    document.getElementById('flagsRemaining').textContent = flagsRemaining;
    renderBoard();
}

function checkWinCondition() {
    let revealedCount = 0;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].isRevealed && !board[i][j].isMine) {
                revealedCount++;
            }
        }
    }
    if (revealedCount === boardSize * boardSize - numMines) {
        gameOver = true;
        revealAllMines();
        renderBoard();
        winSound();
        clearInterval(timerInterval);
        var numberOfConfetti = numMines / 3;
        numberOfConfetti = Math.ceil(numberOfConfetti)
        for (let i = 1; i <= numberOfConfetti; i++) {
            setTimeout(function() {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                confetti({
                    particleCount: 500,
                    startVelocity: 30,
                    spread: 430,
                    ticks: 250,
                    shapes: ['circle', 'triangle', 'star'],
                    gravity: 2,
                    zIndex: Math.random() * 2 - 1,
                    disableForReducedMotion: prefersReducedMotion,
                    origin: {
                        x: Math.random(),
                        // Adjust the y value to control where the confetti originates from
                        y: Math.random() - 0.4
                    }
                });
            }, i * 700);  // Delay increases with each iteration
        }
    }
}

function getTime() {
    var timer = document.getElementById('timer');
    var d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    timer.textContent = hour + ":" + minute + ":" + second; 
}

function winSound() {
    var audio = new Audio('./winsound.mp3');
    audio.volume = audio_volume;
    audio.play();
}

function loseSound() {
    var audio = new Audio('./losesound.mp3');
    audio.volume = audio_volume;
    audio.play();
}

function shareGame() {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this Minesweeper game!',
            text: `Can you beat my Minesweeper game in ${seconds.toFixed(1)} seconds?`,
        })
        .then(() => {
            console.log('Game shared successfully');
        })
        .catch((error) => {
            console.error('Error sharing:', error);
            // Fallback if sharing fails
            copyToClipboard(url);
            alert('Link copied to clipboard! Share it with your friends.');
        });
    } else {
        // Fallback for browsers that do not support the Web Share API
        copyToClipboard(url);
        alert('Link copied to clipboard! Share it with your friends.');
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // navigator.clipboard is available
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    } else {
        // Fallback to older method
        const textarea = document.createElement('textarea');
        textarea.value = text;
        // Move it off-screen
        textarea.style.position = 'fixed';
        textarea.style.left = '-99999px';
        textarea.style.top = '-99999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
        document.body.removeChild(textarea);
    }
}
