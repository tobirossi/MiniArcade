import { createElement } from "../../core/dom.js";
import { createSnakeRenderer } from "./snakeRenderer.js";
import { createSnakeInput } from "./snakeInput.js";
import {
  getRandomGridPosition,
  isOppositeDirection,
  isSamePosition,
} from "./snakeUtils.js";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const TICK_RATE = 120;
const STORAGE_KEY = "miniarcade-snake-best";

export const createSnakeGame = () => {
  let container = null;
  let canvas = null;
  let scoreEl = null;
  let bestScoreEl = null;
  let restartButton = null;
  let intervalId = null;
  let input = null;

  let snake = [];
  let direction = { x: 1, y: 0 };
  let pendingDirection = { x: 1, y: 0 };
  let food = { x: 0, y: 0 };
  let score = 0;
  let bestScore = 0;
  let isGameOver = false;

  const loadBestScore = () => {
    const stored = Number.parseInt(localStorage.getItem(STORAGE_KEY), 10);
    bestScore = Number.isNaN(stored) ? 0 : stored;
  };

  const saveBestScore = () => {
    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem(STORAGE_KEY, String(bestScore));
    }
  };

  const updateScoreUI = () => {
    scoreEl.textContent = `Puntaje: ${score}`;
    bestScoreEl.textContent = `Mejor: ${bestScore}`;
  };

  const resetState = () => {
    snake = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ];
    direction = { x: 1, y: 0 };
    pendingDirection = { x: 1, y: 0 };
    food = getRandomGridPosition(GRID_SIZE, snake);
    score = 0;
    isGameOver = false;
    updateScoreUI();
  };

  const handleRestart = () => {
    resetState();
  };

  const setDirection = (nextDirection) => {
    if (isOppositeDirection(direction, nextDirection)) {
      return;
    }
    pendingDirection = nextDirection;
  };

  const moveSnake = () => {
    direction = pendingDirection;
    const head = snake[0];
    const nextHead = { x: head.x + direction.x, y: head.y + direction.y };

    const hitWall =
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.x >= GRID_SIZE ||
      nextHead.y >= GRID_SIZE;

    const hitSelf = snake.some((segment) => isSamePosition(segment, nextHead));

    if (hitWall || hitSelf) {
      isGameOver = true;
      saveBestScore();
      return;
    }

    snake.unshift(nextHead);

    if (isSamePosition(nextHead, food)) {
      score += 10;
      saveBestScore();
      updateScoreUI();
      food = getRandomGridPosition(GRID_SIZE, snake);
    } else {
      snake.pop();
    }
  };

  const startLoop = () => {
    intervalId = window.setInterval(() => {
      if (!isGameOver) {
        moveSnake();
        renderer.render({ snake, food, gridSize: GRID_SIZE });
      }
    }, TICK_RATE);
  };

  const stopLoop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  let renderer = null;

  const mount = (target) => {
    container = target;

    const panel = createElement("div", "game-panel");
    const header = createElement("div", "panel-header");
    scoreEl = createElement("span", "score", "Puntaje: 0");
    bestScoreEl = createElement("span", "score", "Mejor: 0");

    const hint = createElement(
      "span",
      null,
      "Controles: Flechas / WASD · Reinicio: tecla R"
    );

    header.append(scoreEl, bestScoreEl, hint);

    canvas = createElement("canvas", "snake-canvas");
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    restartButton = createElement("button", "button", "Reiniciar");

    panel.append(header, canvas, restartButton);
    container.appendChild(panel);

    renderer = createSnakeRenderer({ canvas, cellSize: CELL_SIZE });

    loadBestScore();
    resetState();
    renderer.render({ snake, food, gridSize: GRID_SIZE });

    restartButton.addEventListener("click", handleRestart);

    input = createSnakeInput({
      onDirectionChange: setDirection,
      onRestart: handleRestart,
    });

    startLoop();
  };

  const unmount = () => {
    stopLoop();
    if (input) {
      input.destroy();
      input = null;
    }
    if (restartButton) {
      restartButton.removeEventListener("click", handleRestart);
    }
  };

  return {
    mount,
    unmount,
    getName: () => "Viborita",
  };
};
