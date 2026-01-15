// Encargado de dibujar la grilla, la serpiente y la comida.
export const createSnakeRenderer = ({ canvas, cellSize }) => {
  const ctx = canvas.getContext("2d");

  const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawGrid = (gridSize) => {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;

    for (let i = 0; i <= gridSize; i += 1) {
      const pos = i * cellSize;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(canvas.width, pos);
      ctx.stroke();
    }
  };

  const drawSnake = (snake) => {
    ctx.fillStyle = "#41f2ff";
    snake.forEach((segment, index) => {
      const padding = index === 0 ? 2 : 4;
      ctx.fillRect(
        segment.x * cellSize + padding,
        segment.y * cellSize + padding,
        cellSize - padding * 2,
        cellSize - padding * 2
      );
    });
  };

  const drawFood = (food) => {
    ctx.fillStyle = "#ff7af2";
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  const render = ({ snake, food, gridSize }) => {
    clear();
    drawGrid(gridSize);
    drawFood(food);
    drawSnake(snake);
  };

  return { render };
};
