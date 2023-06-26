import { handleMouseMove } from './mouseMove.js';
import { handleClick } from './click.js';
import { startDuckMovement } from './duckMovement.js';
import { button } from './elements/button.js';

export function initializeGame() {
  button.addEventListener('click', function () {
    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('click', handleClick);

    startDuckMovement();
  });
}
