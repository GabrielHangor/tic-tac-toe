// Game Module
const gameModule = (function () {
  const gameContainer = document.querySelector(".main-container");
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  let counter = 0;

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function currentPlayer() {
    const playerName = counter % 2 === 0 ? "Player1" : "Player2";
    const player = playerFactory(playerName);
    counter++;
    console.log(counter);

    return player;
  }

  // function updateGameBoardArray(e) {
  //   const index = e.target.getAttribute("data-num");

  //     // const el = e.target.firstChild.src.includes("cancel.svg")
  //     //   ? "Cross"
  //     //   : "Circle";

  // }

  gameContainer.addEventListener("click", (e) => displayModule.renderEl(e));

  return { currentPlayer };
})();

// Display module
const displayModule = (function () {
  function renderEl(e) {
    if (!e.target.hasChildNodes() && e.target.className !== "img") {
      e.target.appendChild(createImgEl(e));
    }
  }

  function createImgEl(e) {
    const img = document.createElement("img");
    img.src = gameModule.currentPlayer().symbol;
    img.className = "img";
    return img;
  }

  return { renderEl };
})();

// Player Factory function
const playerFactory = function (name) {
  const symbol = name === "Player1" ? "cancel.svg" : "circle.svg";
  return { name, symbol };
};
