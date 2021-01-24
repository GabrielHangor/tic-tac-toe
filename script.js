// Game Module
const gameModule = (function () {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const cells = document.querySelectorAll(".cell");
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

  function checkWinCondition() {
    winConditions.forEach((condition) => {
      const a = condition[0]; // a, b, c are just indexes of the gameBoard array
      const b = condition[1];
      const c = condition[2];

      if (
        gameBoard[a] === gameBoard[b] &&
        gameBoard[b] === gameBoard[c] &&
        gameBoard[a]
      ) {
        displayModule.displayWinMesage(gameBoard[a]);
      }
    });
  }

  function currentPlayer() {
    const playerName = counter % 2 === 0 ? "Player1" : "Player2";
    const player = playerFactory(playerName);
    counter++;

    return player;
  }

  function updateGameBoardArray(e) {
    const index = e.target.getAttribute("data-num");
    const el = e.target.firstChild.src.includes("cancel.svg") ? "X" : "O";
    gameBoard[index] = el;
  }

  function resetData() {
    counter = 0;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.textContent = ""));
  }

  return {
    currentPlayer,
    updateGameBoardArray,
    checkWinCondition,
    resetData,
  };
})();

// Display module
const displayModule = (function () {
  const gameContainer = document.querySelector(".main-container");
  const winnerMsg = document.querySelector(".winner-message");
  const winContainer = document.querySelector(".win-container");
  const playAgainBtn = document.querySelector(".play-again-btn");

  function render(e) {
    if (!e.target.hasChildNodes() && e.target.className !== "img") {
      e.target.appendChild(createImgEl(e));
      gameModule.updateGameBoardArray(e);
      gameModule.checkWinCondition();
    }
  }

  function createImgEl() {
    const img = document.createElement("img");
    img.src = gameModule.currentPlayer().symbol;
    img.className = "img";

    return img;
  }

  function displayWinMesage(symbol) {
    gameContainer.style.display = "none";
    winContainer.style.display = "flex";
    winnerMsg.textContent =
      symbol === "X" ? "X is the winner." : "O is the winner.";

    setTimeout(() => (playAgainBtn.style.visibility = "visible"), 500);
  }

  function restartGame() {
    gameContainer.style.display = "grid";
    winContainer.style.display = "none";
    winnerMsg.textContent = "";
    playAgainBtn.style.visibility = "hidden";
    gameModule.resetData();
  }

  gameContainer.addEventListener("click", (e) => render(e));
  playAgainBtn.addEventListener("click", restartGame);

  return { displayWinMesage };
})();

// Player Factory function
const playerFactory = function (name) {
  const symbol = name === "Player1" ? "cancel.svg" : "circle.svg";
  return { name, symbol };
};
