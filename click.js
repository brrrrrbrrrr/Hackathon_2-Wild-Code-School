import { shot } from './elements/shot.js';
import { blood } from './elements/blood.js';
import { button } from './elements/button.js';
import { zombie } from './elements/zombie.js';
import { bullet } from './elements/bullet.js';
import { reload } from './elements/reload.js';
const startButton = document.getElementById('start-game-button');
const container = document.querySelector('.container');
const body = document.querySelector('body');

let score = 0;
let totalMunitions = 20;
let targetScore = 10;
let currentLevel = 1;
let munitionsRestantes = totalMunitions;
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
      if (score < targetScore) {
        console.log('pwet');
        score++;
        addMunitionIcons();
        e.target.style.display = 'none';
        startButton.innerHTML = 'Level ' + currentLevel + ' Score ' + score;
      } else {
        if (currentLevel < 10) {
          currentLevel++;
          targetScore += 5;
          score = 0;
          startButton.innerHTML = 'Level ' + currentLevel + ' Score ' + score;
          container.style.backgroundImage = `url(images/level${currentLevel}.png)`;
          body.style.backgroundImage = `url(images/level${currentLevel}.png)`;
          alert(
            "Great! You've killed all the zombies in this area! Get ready for the next level!"
          );
        } else {
          startButton.innerHTML =
            "Congratulations! You've completed all levels!";
        }
      }
    }
    startButton.innerHTML = 'Level ' + currentLevel + ' Score ' + score;

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
