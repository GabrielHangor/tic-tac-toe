const gameModule = (function () {
  const gameContainer = document.querySelector(".main-container");
  const gameBoard = [...document.querySelectorAll(".cell")];
  let counter = 0;

  function currentPlayer() {
    const playerName = counter % 2 === 0 ? "Player1" : "Player2";
    const player = playerFactory(playerName);
    counter++;

    return player;
  }

  gameContainer.addEventListener("click", (e) => displayModule.render(e));

  return { currentPlayer };
})();

const displayModule = (function () {

  function render(e) {
    if (!e.target.textContent) {
      createImg
    }
  }

  return { render };
})();

const playerFactory = function (name) {
  const symbol = name === "Player1" ? "cancel.svg" : "circle.svg";
  return { name, symbol };
};
