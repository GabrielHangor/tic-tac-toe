// Game Module
const gameModule = (function () {
  const selectBtnContainer = document.querySelector(".select-buttons");
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let counter = 0;
  let computerMode = false;

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

      if (computerMode) {
        const computerSymbol = counter % 2 === 0 ? "X" : "O";
        const computerIndex = getComputerIndex();
        gameBoard[computerIndex] = computerSymbol;
        displayModule.renderComputer(computerIndex);
        checkWinCondition();
        counter++;
      }
    }
  }

  function getComputerIndex() {
    let randomIndex;

    for (let i = 0; i < gameBoard.length; i++) {
      randomIndex = Math.floor(Math.random() * gameBoard.length);
      if (gameBoard[randomIndex] == "") {
        return randomIndex;
      }
    }
  }

  function resetData() {
    counter = 0;
    gameBoard.fill("");
  }

  function selectMode(e) {
    e.target.id === "computer" ? (computerMode = true) : (computerMode = false);
    displayModule.colorSelectBtn(e);
    console.log(computerMode);
  }

  selectBtnContainer.addEventListener("click", selectMode);

  return {
    makeTurn,
    resetData,
    gameBoard,
    computerMode,
  };
})();

// Display module
const displayModule = (function () {
  const mainContainer = document.querySelector(".main-container");
  const winnerMsg = document.querySelector(".winner-message");
  const playAgainBtn = document.querySelector(".play-again-btn");
  const selectBtns = document.querySelectorAll(".select-btn");
  const startBtn = document.querySelector(".start-game");
  const startContainer = document.querySelector(".start-game-container");
  const winContainer = document.querySelector(".win-container");
  const cells = document.querySelectorAll(".cell");

  function render(e) {
    e.target.appendChild(createImgEl(e));
  }

  function renderComputer(computerIndex) {
    cells[computerIndex].appendChild(createComputerImgEl(computerIndex));
  }

  function createImgEl(e) {
    const img = document.createElement("img");
    index = e.target.getAttribute("data-num");
    img.src = gameModule.gameBoard[index] === "X" ? "cancel.svg" : "circle.svg";
    img.className = "img";

    return img;
  }

  function createComputerImgEl(computerIndex) {
    const img = document.createElement("img");
    index = computerIndex;
    img.src = gameModule.gameBoard[index] === "X" ? "cancel.svg" : "circle.svg";
    img.className = "img";

    return img;
  }

  function displayWinMessage(symbol) {
    mainContainer.removeEventListener("click", gameModule.makeTurn);

    winnerMsg.textContent =
      symbol == "X" || symbol == "O" ? `${symbol} is the winner.` : `${symbol}`;
  }

  function restartGame() {
    winnerMsg.textContent = "";
    gameModule.resetData();
    cells.forEach((cell) => (cell.textContent = ""));
    mainContainer.addEventListener("click", gameModule.makeTurn);
  }

  function colorSelectBtn(e) {
    selectBtns.forEach((btn) => btn.classList.remove("selected"));
    e.target.classList.toggle("selected");
  }

  function startGame() {
    startContainer.style.display = "none";
    winContainer.style.display = "flex";
    mainContainer.style.display = "grid";
  }

  mainContainer.addEventListener("click", gameModule.makeTurn);
  playAgainBtn.addEventListener("click", restartGame);
  startBtn.addEventListener("click", startGame);

  return { displayWinMessage, render, colorSelectBtn, renderComputer };
})();
