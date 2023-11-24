function backPage() {
  const playerRest = confirm(
    "Deseja sair do jogo? Você perderá seu progresso!"
  );
  if (playerRest) {
    window.history.back();
  }
}

function createCards() {
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
        `
    })
}

const playerName = document.querySelector(".playerName");
const backButton = document.querySelector(".backButton");
const gridCards = document.querySelector(".gridCards");

const storagePlayerName = localStorage.getItem("@memoryGame:playerName");

playerName.innerHTML = storagePlayerName;

backButton.addEventListener("click", backPage);

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

const sortedCards = [...arrayCardsName, ...arrayCardsName].sort(() => Math.random() - 0.5);

createCards();