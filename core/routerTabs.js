import { createElement } from "./dom.js";

// Renderiza las tabs y controla el estado activo.
export const initTabs = ({ container, games, onSelect }) => {
  const buttons = games.map((game) => {
    const button = createElement("button", "tab-button", game.getName());
    button.type = "button";
    button.addEventListener("click", () => onSelect(game));
    return button;
  });

  buttons.forEach((button) => container.appendChild(button));

  const setActive = (game) => {
    buttons.forEach((button, index) => {
      const isActive = games[index] === game;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  return { setActive };
};
