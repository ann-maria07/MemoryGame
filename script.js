const images = [
    '🐶', '🐶', '🐱', '🐱', '🐻', '🐻', '🐼', '🐼',
    '🦁', '🦁', '🐯', '🐯', '🐵', '🐵', '🦊', '🦊'
  ];
  
  const gameBoard = document.getElementById('gameBoard');
  const restartButton = document.getElementById('restartButton');
  const successMessage = document.getElementById('successMessage');
  const cardCounter = document.getElementById('cardCounter');
  let cardsChosen = [];
  let cardsChosenElements = [];
  let cardsWon = [];
  let cardsTurned = 0;
  
  function createBoard() {
    images.sort(() => 0.5 - Math.random());
  
    for (let i = 0; i < images.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', i);
  
      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');
  
      const cardFront = document.createElement('div');
      cardFront.classList.add('card-front');
  
      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back');
      cardBack.textContent = images[i];
  
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
  
      card.appendChild(cardInner);
  
      card.addEventListener('click', flipCard);
  
      gameBoard.appendChild(card);
    }
  }
  
  function flipCard() {
    if (cardsChosen.length < 2 && !this.classList.contains('flipped')) {
      const cardId = this.getAttribute('data-id');
      cardsChosen.push(images[cardId]);
      cardsChosenElements.push(this);
      this.classList.add('flipped');
      cardsTurned++;
      updateCardCounter();
    }
  
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  
  function checkForMatch() {
    const [optionOne, optionTwo] = cardsChosen;
  
    if (optionOne === optionTwo) {
      cardsChosenElements.forEach(card => {
        card.classList.add('matched');
      });
      cardsWon.push(cardsChosen[0]);
  
      if (cardsWon.length === images.length / 2) {
        showMessage("Congratulations! You've won!");
      }
    } else {
      cardsChosenElements.forEach(card => {
        card.classList.remove('flipped');
      });
    }
  
    cardsChosen = [];
    cardsChosenElements = [];
  }
  
  function showMessage(message) {
    successMessage.textContent = message;
  }
  
  function updateCardCounter() {
    cardCounter.textContent = `Cards Turned: ${cardsTurned}`;
  }
  
  function restartGame() {
    cardsChosen = [];
    cardsChosenElements = [];
    cardsWon = [];
    cardsTurned = 0;
    updateCardCounter();
    gameBoard.innerHTML = '';
    createBoard();
    successMessage.textContent = '';
  }
  
  restartButton.addEventListener('click', restartGame);
  
  createBoard();
  updateCardCounter();
  