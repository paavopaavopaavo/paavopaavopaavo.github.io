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
  { name: 'whale', img: './images/whale.png' }
];

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = image.name;

  const img = document.createElement('img');
  img.src = image.img;
  card.appendChild(img);

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
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
      disableCards();
  } else {
      unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  resetBoard();
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

function initGame() {
  const allImages = [...images, ...images];
  shuffle(allImages);
  allImages.forEach(image => {
      const card = createCard(image);
      card.addEventListener('click', handleCardClick);
      gameBoard.appendChild(card);
  });
}

function resetGame() {
  gameBoard.innerHTML = ''; // Clear the game board
}

function restartGame() {
  resetGame();
  initGame();
}

initGame();

window.restartGame = restartGame;