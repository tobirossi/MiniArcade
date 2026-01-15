import { numberToIndex } from "./tictactoeUtils.js";

// Maneja clicks y teclado, y permite limpiar listeners.
export const createTicTacToeInput = ({ boardEl, onSelect }) => {
  const handleClick = (event) => {
    const cell = event.target.closest("[data-index]");
    if (!cell) {
      return;
    }
    const index = Number(cell.getAttribute("data-index"));
    onSelect(index);
  };

  const handleKeyDown = (event) => {
    const index = numberToIndex(event.key);
    if (index !== null) {
      onSelect(index);
    }
  };

  boardEl.addEventListener("click", handleClick);
  window.addEventListener("keydown", handleKeyDown);

  return {
    destroy: () => {
      boardEl.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    },
  };
};
