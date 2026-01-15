import { createTicTacToeRenderer } from "./tictactoeRenderer.js";
import { createTicTacToeInput } from "./tictactoeInput.js";
import { checkWinner, isBoardFull } from "./tictactoeUtils.js";

export const createTicTacToeGame = () => {
  let container = null;
  let renderer = null;
  let input = null;
  let restartButton = null;

  let board = [];
  let currentPlayer = "X";
  let gameOver = false;
  let winningLine = [];

  const resetGame = () => {
    board = Array.from({ length: 9 }, () => "");
    currentPlayer = "X";
    gameOver = false;
    winningLine = [];
    updateUI();
  };

  const updateUI = () => {
    let statusText = `Turno de ${currentPlayer}`;
    if (gameOver) {
      statusText = winningLine.length
        ? `Ganó ${board[winningLine[0]]}`
        : "Empate";
    }

    renderer.update({
      boardState: board,
      statusText,
      winningLine,
      gameOver,
    });
  };

  const handleMove = (index) => {
    if (gameOver || board[index]) {
      return;
    }

    board[index] = currentPlayer;

    const { winner, line } = checkWinner(board);
    if (winner) {
      gameOver = true;
      winningLine = line;
    } else if (isBoardFull(board)) {
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    updateUI();
  };

  const mount = (target) => {
    container = target;
    renderer = createTicTacToeRenderer();

    container.appendChild(renderer.panel);
    restartButton = renderer.restartButton;

    restartButton.addEventListener("click", resetGame);

    input = createTicTacToeInput({
      boardEl: renderer.board,
      onSelect: handleMove,
    });

    resetGame();
  };

  const unmount = () => {
    if (input) {
      input.destroy();
      input = null;
    }
    if (restartButton) {
      restartButton.removeEventListener("click", resetGame);
    }
  };

  return {
    mount,
    unmount,
    getName: () => "Ta-Te-Ti",
  };
};
