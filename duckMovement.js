import { duck } from './elements/duck.js';

export function startDuckMovement() {
  setInterval(function () {
    console.log(duck);
    if (duck.style.display !== 'none') {
      let randleft = Math.random() * (window.innerWidth + 150);
      let randTop = Math.random() * (window.innerHeight - 150);
      duck.style.left = randleft + 'px';
      duck.style.top = randTop + 'px';
    }
  }, 1000);
}
