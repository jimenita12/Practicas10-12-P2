import { CarGame } from "./carGame.js";

let game = null;
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    resetButton.style.display = 'inline';

    if (game) {
        game.startGame();
    } else {
        game = new CarGame();
    }
});

resetButton.addEventListener('click', () => {
    game.resetGame();
    startButton.style.display = 'inline';
    resetButton.style.display = 'none';
    game.resetButtons();
});
