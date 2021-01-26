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
    let win = winConditions.find((condition) => {
      const a = condition[0]; // a, b, c are just indexes of the gameBoard array
      const b = condition[1];
      const c = condition[2];

      return (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]);
    });

    if (win) {
      displayModule.displayWinMessage(gameBoard[win[0]]);
    } else if (gameBoard.includes("")) {
      return null;
    } else {
      displayModule.displayWinMessage("It is a tie.");
    }
  }

  function currentPlayer() {
    const playerName = counter % 2 === 0 ? "Player1" : "Player2";
    const player = playerFactory(playerName);
    counter++;

    return player;
  }

  function updateGameBoardArray(e) {
    const index = e.target.getAttribute("data-num");
    const el = e.target.firstChild.src.includes("cancel") ? "X" : "O";
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
  const playAgainBtn = document.querySelector(".play-again-btn");

  function render(e) {
    if (!e.target.hasChildNodes() && e.target.className !== "img") {
      e.target.appendChild(createImgEl(e));
      gameModule.updateGameBoardArray(e);
      gameModule.checkWinCondition(e);
    }
  }

  function createImgEl() {
    const img = document.createElement("img");
    img.src = gameModule.currentPlayer().symbol;
    img.className = "img";

    return img;
  }

  function displayWinMessage(symbol) {
    gameContainer.removeEventListener("click", render);

    winnerMsg.textContent =
      symbol == "X" || symbol == "O" ? `${symbol} is the winner.` : `${symbol}`;
  }

  function restartGame() {
    gameContainer.addEventListener("click", render);
    winnerMsg.textContent = "";
    gameModule.resetData();
  }

  gameContainer.addEventListener("click", render);
  playAgainBtn.addEventListener("click", restartGame);

  return { displayWinMessage, gameContainer };
})();

// Player Factory function
const playerFactory = function (name) {
  const symbol = name === "Player1" ? "cancel.svg" : "circle.svg";
  return { name, symbol };
};
