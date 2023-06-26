import { shot } from './elements/shot.js';
import { blood } from './elements/blood.js';
import { button } from './elements/button.js';
import { duck } from './elements/duck.js';

let score = 0;

export function handleClick(e) {
  shot.play();

  if (e.target.classList.contains('duck')) {
    blood.style.display = 'block';
    blood.style.left = e.pageX + 'px';
    blood.style.top = e.pageY + 'px';
    setTimeout(function () {
      blood.style.display = 'none';
    }, 500);
    score++;
    button.innerHTML = 'Score ' + score;
    shot.play();
    duck.style.display = 'none';
    setTimeout(function () {
      duck.style.display = 'block';
    }, 1000);
  }
}
