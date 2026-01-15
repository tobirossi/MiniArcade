// Maneja teclado y permite desmontar listeners cuando cambia el juego.
export const createSnakeInput = ({ onDirectionChange, onRestart }) => {
  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();

    if (key === "arrowup" || key === "w") {
      onDirectionChange({ x: 0, y: -1 });
    } else if (key === "arrowdown" || key === "s") {
      onDirectionChange({ x: 0, y: 1 });
    } else if (key === "arrowleft" || key === "a") {
      onDirectionChange({ x: -1, y: 0 });
    } else if (key === "arrowright" || key === "d") {
      onDirectionChange({ x: 1, y: 0 });
    } else if (key === "r") {
      onRestart();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return {
    destroy: () => window.removeEventListener("keydown", handleKeyDown),
  };
};
