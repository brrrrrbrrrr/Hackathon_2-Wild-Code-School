import { handleMouseMove } from './mouseMove.js';
import { handleClick, zombieMaker } from './click.js';
import { button } from './elements/button.js';


export function initializeGame() {
  button.addEventListener('click', function () {
    window.addEventListener('mousemove', handleMouseMove);
    setInterval(() => {
      zombieMaker();
    }, 1000);
    window.addEventListener('click', (e) => {
      handleClick(e);
    });
  });
}
