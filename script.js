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

      return (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      );
    });

    if (win) {
      displayModule.displayWinMessage(gameBoard[win[0]]);
    } else if (gameBoard.includes("")) {
      return null;
    } else {
      displayModule.displayWinMessage("It is a tie.");
    }
  }

  function makeTurn(e) {
    if (!e.target.hasChildNodes() && e.target.className !== "img") {
      const index = e.target.getAttribute("data-num");
      const symbol = counter % 2 === 0 ? "X" : "O";
      gameBoard[index] = symbol;
      displayModule.render(e);
      checkWinCondition();
      counter++;

      // if (AImode) {
      //   do smth;
      // }
    }
  }

  function resetData() {
    counter = 0;
    gameBoard.fill("");
    cells.forEach((cell) => (cell.textContent = ""));
  }

  return {
    makeTurn,
    resetData,
    gameBoard,
  };
})();

// Display module
const displayModule = (function () {
  const gameContainer = document.querySelector(".main-container");
  const winnerMsg = document.querySelector(".winner-message");
  const playAgainBtn = document.querySelector(".play-again-btn");

  function render(e, gameBoardIndex) {
    e.target.appendChild(createImgEl(e));
  }

  function createImgEl(e, gameBoardIndex) {
    const img = document.createElement("img");
    const index = e.target.getAttribute("data-num");
    img.src = gameModule.gameBoard[index] === "X" ? "cancel.svg" : "circle.svg";
    img.className = "img";

    return img;
  }

  function displayWinMessage(symbol) {
    gameContainer.removeEventListener("click", gameModule.makeTurn);

    winnerMsg.textContent =
      symbol == "X" || symbol == "O" ? `${symbol} is the winner.` : `${symbol}`;
  }

  function restartGame() {
    winnerMsg.textContent = "";
    gameModule.resetData();
    gameContainer.addEventListener("click", gameModule.makeTurn);
  }

  gameContainer.addEventListener("click", gameModule.makeTurn);
  playAgainBtn.addEventListener("click", restartGame);

  return { displayWinMessage, gameContainer, render };
})();
