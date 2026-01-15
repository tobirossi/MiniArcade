import { clearElement } from "./core/dom.js";
import { getCurrentGame, setCurrentGame } from "./core/state.js";
import { initTabs } from "./core/routerTabs.js";
import { createSnakeGame } from "./games/snake/snake.js";
import { createTicTacToeGame } from "./games/tictactoe/tictactoe.js";

const tabsContainer = document.querySelector("#tabs");
const gameContainer = document.querySelector("#game-container");

const games = [createSnakeGame(), createTicTacToeGame()];

const switchGame = (nextGame) => {
  const currentGame = getCurrentGame();

  if (currentGame && currentGame === nextGame) {
    return;
  }

  gameContainer.classList.add("is-fading");

  setTimeout(() => {
    if (currentGame) {
      currentGame.unmount();
    }

    clearElement(gameContainer);
    setCurrentGame(nextGame);
    nextGame.mount(gameContainer);
    tabs.setActive(nextGame);

    gameContainer.classList.remove("is-fading");
  }, 180);
};

const tabs = initTabs({
  container: tabsContainer,
  games,
  onSelect: switchGame,
});

switchGame(games[0]);
