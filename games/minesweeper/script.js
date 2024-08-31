let boardSize = 8;
let numMines = 10;
let timerInterval;
let seconds = 0;

function hint() {
    if (!gameOver) {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j].isMine && !board[i][j].isRevealed) {
                    board[i][j].isRevealed = true;
                    renderBoard();
                    return;
                }
            }
        }
    }
}

function setDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
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
    startGame();
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
    document.body.style.backgroundColor = 'white';

    timerInterval = setInterval(function() {
        seconds += 0.1;
        seconds = Math.round(seconds * 10) / 10;
        if (Math.floor(seconds) === seconds) {
            document.getElementById('timer').textContent = seconds + ".0";
        } else {
            document.getElementById('timer').textContent = seconds;
        }
    }, 100);

    document.getElementById('hintbutton').disabled = true;

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
    boardElement.innerHTML = '';
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
                    cell.textContent = board[i][j].neighborMines || '';
                    if (board[i][j].neighborMines > 0) {
                        cell.style.backgroundColor = '#C0C9C9'; // Single color for 1-8 mines
                    } else {
                        cell.style.backgroundColor = '#ddd'; // Default background for revealed cells
                    }
                }
            } else if (board[i][j].isFlagged) {
                cell.innerHTML = '🚩';
                cell.style.backgroundColor = '#fdd';
            } else {
                cell.textContent = ' ';
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

        // Set the explosion emoji for the clicked cell
        const boardElement = document.getElementById('board');
        const cell = boardElement.children[x * boardSize + y];
        cell.innerHTML = '💥';  // Explosion emoji
        cell.style.backgroundColor = '#f00'; // Red background for explosion
        
        revealAllMines();
        renderBoard();  // Render the board after showing the explosion emoji
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
                document.body.style.backgroundColor = '#EF5350';
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
        document.body.style.backgroundColor = '#9CCC65';
        winSound();
        clearInterval(timerInterval);
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
    audio.play();
}

function loseSound() {
    var audio = new Audio('./losesound.mp3');
    audio.play();
}
