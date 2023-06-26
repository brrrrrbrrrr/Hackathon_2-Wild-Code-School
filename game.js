import { handleMouseMove } from './mouseMove.js';
import { handleClick, zombieMaker } from './click.js';
import { button } from './elements/button.js';
import { zombieLimit } from './click.js';
import { getZombieCount } from './click.js';

let gameOver = false;

let gameInterval;

console.log(zombieLimit);
console.log('zombie count: ', getZombieCount());
export function initializeGame() {
  button.addEventListener('click', function () {
    window.addEventListener('mousemove', handleMouseMove);

    gameInterval = setInterval(() => {
      if (!gameOver && getZombieCount() <= zombieLimit) {
        zombieMaker();
      } else if (getZombieCount() > zombieLimit) {
        handleGameOver();
        console.log('titi');
      }
    }, 1000);
    window.addEventListener('click', (e) => {
      handleClick(e);
    });

    window.addEventListener('load', function () {
      window.confirm = function (message) {
        const originalConfirm = window.confirm;
        if (originalConfirm(message)) {
          console.log('toto');
          handleGameOver();
        }
      };
    });
  });
}

function handleGameOver() {
  console.log('Game Over');
  gameOver = true;
  clearInterval(gameInterval);
  if (confirm('GAME OVER! Do you want to play again?')) {
    location.reload();
  }
}
