import { shot } from './elements/shot.js';
import { blood } from './elements/blood.js';
import { button } from './elements/button.js';
import { zombie } from './elements/zombie.js';
import { bullet } from './elements/bullet.js';
import { reload } from './elements/reload.js';

export function getZombieCount() {
  return zombieCount;
}

let score = 0;
let totalMunitions = 20;
let munitionsRestantes = totalMunitions;
export let zombieLimit = 5;
let zombieCount = 0;
const munitionCounter = document.getElementById('munition-counter');
munitionCounter.textContent = munitionsRestantes;
function addMunitionIcons() {
  const munitionContainer = document.querySelector('.munition-container');

  // Supprimer toutes les balles existantes
  while (munitionContainer.firstChild) {
    munitionContainer.removeChild(munitionContainer.firstChild);
  }

  for (let i = 0; i < munitionsRestantes; i++) {
    const smallBulletIcon = document.createElement('div');
    smallBulletIcon.classList.add('small-bullet');
    munitionContainer.appendChild(smallBulletIcon);
  }
}

export function handleClick(e) {
  if (munitionsRestantes > 0) {
    munitionsRestantes--;
    munitionCounter.textContent = munitionsRestantes;

    if (e.target.classList.contains('zombie')) {
      blood.style.display = 'block';
      blood.style.left = e.pageX + 'px';
      blood.style.top = e.pageY + 'px';
      setTimeout(function () {
        blood.style.display = 'none';
      }, 500);
      score++;
      button.innerHTML = 'Score ' + score;
      zombieCount--;

      e.target.style.display = 'none'; // Utiliser e.target.style.display
      addMunitionIcons();
    }

    if (munitionsRestantes > 0) {
      shot.play();
      addMunitionIcons();
    }
  }

  let zombieDistance = parseInt(zombie.style.top);
  let zombieWidth = parseInt(zombie.style.width);
  let zombieHeight = parseInt(zombie.style.height);

  if (isNaN(zombieDistance)) {
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

export function incrementZombieCount() {
  zombieCount++;
  console.log(zombieCount);
}

export function zombieMaker(distance = 55, width = 50, height = 50) {
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
  if (munitionsRestantes > 0) {
    img.addEventListener('click', function (e) {
      blood.style.display = 'block';
      blood.style.left = e.pageX + 'px';
      blood.style.top = e.pageY + 'px';
      setTimeout(function () {
        blood.style.display = 'none';
      }, 500);
      score++;
      button.innerHTML = 'Score ' + score;
      zombieCount--;
      shot.play();
      img.style.display = 'none';
    });
  }

  const updateZombieDistance = () => {
    distance += 1;
    width += 20;
    height += 20;
    img.style.top = `${distance}%`;
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
  };

  setInterval(updateZombieDistance, 1000);

  incrementZombieCount();
}

// Fonction pour afficher la grosse munition et gérer les interactions
function displayBullet() {
  bullet.style.display = 'block';

  setTimeout(function () {
    bullet.style.display = 'none';

    setTimeout(function () {
      displayBullet();
    }, 5000);
  }, 5000);
}

// Gestion du tir sur la grosse munition
bullet.addEventListener('click', function () {
  munitionsRestantes += 10;
  munitionCounter.textContent = munitionsRestantes;
  bullet.style.display = 'none';
  reload.play();
  addMunitionIcons();
});

displayBullet();
addMunitionIcons();
