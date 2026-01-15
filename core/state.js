// Estado global simple para saber qué juego está activo.
const state = {
  currentGame: null,
};

export const getCurrentGame = () => state.currentGame;

export const setCurrentGame = (game) => {
  state.currentGame = game;
};
