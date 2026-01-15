import { createElement, setAttributes } from "../../core/dom.js";

// Renderiza el tablero y devuelve referencias para actualizarlo.
export const createTicTacToeRenderer = () => {
  const panel = createElement("div", "game-panel");
  const status = createElement("div", "status", "Turno de X");
  const helper = createElement(
    "div",
    null,
    "Atajos: teclas 1-9 (1 arriba-izq, 9 abajo-der)"
  );

  const board = createElement("div", "tictactoe-board");
  const cells = Array.from({ length: 9 }, (_, index) => {
    const cell = createElement("button", "tictactoe-cell");
    cell.type = "button";
    setAttributes(cell, {
      "data-index": index,
      "aria-label": `Casilla ${index + 1}`,
    });
    board.appendChild(cell);
    return cell;
  });

  const restartButton = createElement("button", "button", "Reiniciar");

  panel.append(status, helper, board, restartButton);

  const update = ({ boardState, statusText, winningLine, gameOver }) => {
    status.textContent = statusText;
    cells.forEach((cell, index) => {
      cell.textContent = boardState[index] || "";
      cell.classList.toggle("win", winningLine.includes(index));
      cell.disabled = Boolean(boardState[index]) || gameOver;
    });
  };

  return {
    panel,
    status,
    board,
    cells,
    restartButton,
    update,
  };
};
