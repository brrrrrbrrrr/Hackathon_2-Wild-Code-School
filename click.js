import { shot } from './elements/shot.js';
import { blood } from './elements/blood.js';
import { button } from './elements/button.js';
import { zombie } from './elements/zombie.js';

let score = 0;

export function handleClick(e) {
  shot.play();

  if (e.target.classList.contains('zombie')) {
    blood.style.display = 'block';
    blood.style.left = e.pageX + 'px';
    blood.style.top = e.pageY + 'px';
    setTimeout(function () {
      blood.style.display = 'none';
    }, 500);
    score++;
    button.innerHTML = 'Score ' + score;
    shot.play();
    zombie.style.display = 'none';
  }
  let zombieDistance = parseInt(zombie.style.top);
  let zombieWidth = parseInt(zombie.style.width);
  let zombieHeight = parseInt(zombie.style.height);

  if (isNaN(zombieDistance)) {
    //   zombieDistance = 39;
    zombieDistance = 55;
  }

  if (isNaN(zombieWidth)) {
    zombieWidth = 50;
  }

  if (isNaN(zombieHeight)) {
    zombieHeight = 50;
  }

  const updateZombieDistance = () => {
    zombieDistance += 1;
    zombieWidth += 20;
    zombieHeight += 20;
    zombie.style.top = `${zombieDistance}%`;
    zombie.style.width = `${zombieWidth}px`;
    zombie.style.height = `${zombieHeight}px`;
  };
  zombie.classList.add('zombie-walk');
  setInterval(updateZombieDistance, 1000);
}

export function zombieMaker(distance = 55, width = 50, height = 50) {
  console.log('toto');
  let img = document.createElement('img');
  img.src = 'clicker.png';
  document.body.appendChild(img);
  img.classList.add('zombie');
  img.classList.add('zombie-walk');
  img.style.left = 20 + Math.random() * 50 + '%';
  img.style.top = `${distance}%`;
  img.style.width = `${width}px`;
  img.style.height = `${height}px`;
  img.style.zIndex = 20;

  img.addEventListener('click', function (e) {
    blood.style.display = 'block';
    blood.style.left = e.pageX + 'px';
    blood.style.top = e.pageY + 'px';
    setTimeout(function () {
      blood.style.display = 'none';
    }, 500);
    score++;
    button.innerHTML = 'Score ' + score;
    shot.play();
    img.style.display = 'none';
  });

  const updateZombieDistance = () => {
    distance += 1;
    width += 20;
    height += 20;
    img.style.top = `${distance}%`;
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
  };

  setInterval(updateZombieDistance, 1000);
}
