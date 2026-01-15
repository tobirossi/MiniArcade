// Utilidades para el juego de la viborita.
export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const isSamePosition = (a, b) => a.x === b.x && a.y === b.y;

export const getRandomGridPosition = (gridSize, snakeBody) => {
  let position = null;

  while (!position) {
    const candidate = {
      x: randomInt(0, gridSize - 1),
      y: randomInt(0, gridSize - 1),
    };

    const isOccupied = snakeBody.some((segment) =>
      isSamePosition(segment, candidate)
    );

    if (!isOccupied) {
      position = candidate;
    }
  }

  return position;
};

export const isOppositeDirection = (current, next) =>
  current.x + next.x === 0 && current.y + next.y === 0;
