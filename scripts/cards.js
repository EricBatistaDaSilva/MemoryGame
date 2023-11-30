function backPage() {
  if (gameIsFinish) {
    window.history.back();
  } else {
    const playerRest = confirm(
      "Deseja sair do jogo? Você perderá seu progresso!"
    );
    if (playerRest) {
      window.history.back();
    }
  }
}

function createCards() {
  const cardNames = [
    "CardBakugo",
    "CardChika",
    "CardDrStone",
    "CardEren",
    "CardEscanor",
    "CardFubuki",
    "CardGotenks",
    "CardHanako",
    "CardInosuke",
    "CardKillua",
    "CardNatsu",
    "CardPikachu",
    "CardSailorJupiter",
    "CardSaitama",
    "CardSanji",
    "CardShaka",
    "CardYor",
    "CardYue",
    "CardZoe",
  ];

  const arrayCardsName = cardNames
    .sort(() => Math.random() - 0.5)
    .filter((value, index) => index < 12);

  const sortedCards = [...arrayCardsName, ...arrayCardsName].sort(
    () => Math.random() - 0.5
  );

  gridCards.innerHTML = "";
  sortedCards.forEach((card) => {
    gridCards.innerHTML += `
            <div class="card" name="${card}">
                <div class="front">
                    <img src="../images/${card}.jpg" alt="" />
                </div>
                <div class="back">
                    <img src="../images/yugioh-card-back.png" alt="" />
                </div>
            </div>
        `;
  });
}

function checkGameWin() {
  const disabledCards = document.querySelectorAll(".disabledCard");
  console.log(disabledCards);
  if (disabledCards.length === 24) {
    clearInterval(finishTimerInterval);

    gameIsFinish = true;

    const userData = {
      name: storagePlayerName,
      time: timer.textContent,
    };

    const storageRank = JSON.parse(localStorage.getItem("@memoryGame:rank"));

    if (storageRank) {
      const rankData = [...storageRank, userData];
      localStorage.setItem("@memoryGame:rank", JSON.stringify(rankData));
    } else {
      localStorage.setItem("@memoryGame:rank", JSON.stringify([userData]));
    }

    alert(
      `Parabéns ${storagePlayerName}, você venceu com o tempo de ${timer.innerHTML}!`
    );

    backPage();
  }
}

function checkMatchCards() {
  if (firstCard.getAttribute("name") === secondCard.getAttribute("name")) {
    new Audio("../audios/sci-fi.wav").play();
    setTimeout(() => {
      firstCard.classList.add("disabledCard");
      secondCard.classList.add("disabledCard");
      firstCard = "";
      secondCard = "";

      checkGameWin();
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipCard");
      secondCard.classList.remove("flipCard");
      firstCard = "";
      secondCard = "";
    }, 500);
  }
}

function clickFlipCard() {
  const arrayCards = document.querySelectorAll(".card");
  arrayCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("flipCard")) return;

      new Audio("../audios/flip.wav").play();

      if (firstCard === "") {
        card.classList.add("flipCard");
        firstCard = card;
      } else if (secondCard === "") {
        card.classList.add("flipCard");
        secondCard = card;

        checkMatchCards();
      }
    });
  });
}

function setStartTimer() {
  finishTimerInterval = setInterval(() => {
    const dateNow = new Date();
    const dateDiff = new Date(dateNow - initialDateTimer);
    const minutes = String(dateDiff.getMinutes()).padStart("2", "0");
    const seconds = String(dateDiff.getSeconds()).padStart("2", "0");

    timer.innerHTML = `${minutes}:${seconds}`;
  }, 1000);
}

const playerName = document.querySelector(".playerName");
const backButton = document.querySelector(".backButton");
const gridCards = document.querySelector(".gridCards");
const timer = document.querySelector(".timer");

const storagePlayerName = localStorage.getItem("@memoryGame:playerName");

playerName.innerHTML = storagePlayerName;

backButton.addEventListener("click", backPage);

createCards();

let gameIsFinish = false;
let firstCard = "";
let secondCard = "";
clickFlipCard();

const initialDateTimer = new Date();
let finishTimerInterval;
setStartTimer();
