const images = [
  { name: 'beaver', img: './images/beaver.png' },
  { name: 'cactus', img: './images/cactus.png' },
  { name: 'crocodile', img: './images/crocodile.png' },
  { name: 'dinosaur', img: './images/dinosaur.png' },
  { name: 'flower', img: './images/flower.png' },
  { name: 'hedgehog', img: './images/hedgehog.png' },
  { name: 'lizard', img: './images/lizard.png' },
  { name: 'mushroom', img: './images/mushroom.png' },
  { name: 'sheep', img: './images/sheep.png' },
  { name: 'sunflower', img: './images/sunflower.png' },
  { name: 'tiger', img: './images/tiger.png' },
  { name: 'whale', img: './images/whale.png' },
  { name: 'lemon', img: './images/lemon.png' },
  { name: 'apple', img: './images/apple.png' },
  { name: 'watermelon', img: './images/watermelon.png' }
];

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let gameWon = false;

// Initialize the Map to store card associations
const cardToNameMap = new Map();

function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = image.img;
  card.appendChild(img);

  // Store the mapping from the card element to the image name
  cardToNameMap.set(card, image.name);

  return card;
}

function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;
  card.classList.add('flipped');
  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const firstCardName = cardToNameMap.get(firstCard);
  const secondCardName = cardToNameMap.get(secondCard);

  const isMatch = firstCardName === secondCardName;

  if (isMatch) {
    disableCards();
    if (document.querySelectorAll('.card:not(.flipped)').length === 0) {
      gameWon = true;
      for (let i = 1; i <= 3; i++) {
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
  } else {
    unflipCards();
  }
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffle(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function handleCardClick(event) {
  const card = event.target.closest('.card');
  if (card) {
    flipCard(card);
  }
}

function initGame(addEventListeners = true) {
  const allImages = [...images, ...images];
  shuffle(allImages);
  allImages.forEach(image => {
    const card = createCard(image);
    if (addEventListeners) {
      card.addEventListener('click', handleCardClick);
    }
    gameBoard.appendChild(card);
  });
}

function resetGame() {
  gameBoard.innerHTML = ''; // Clear the game board
  cardToNameMap.clear(); // Clear the Map
}

// Modify disableCards function
function disableCards() {
  // Add 'matched' class to the cards
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  resetBoard();
}

// Modify restartGame function to remove 'matched' class
function restartGame() {
  gameWon = false;

  const cards = document.querySelectorAll('.card');

  if (cards.length === 0) {
    resetGame();
    initGame();
    return;
  }

  cards.forEach(card => {
    card.classList.remove('flipped', 'matched'); // Also remove 'matched' class
    card.removeEventListener('click', handleCardClick);
  });

  const flipDuration = 300;

  setTimeout(() => {
    resetGame();

    requestAnimationFrame(() => {
      initGame();
    });
  }, flipDuration + 100);
}

initGame();

window.restartGame = restartGame;