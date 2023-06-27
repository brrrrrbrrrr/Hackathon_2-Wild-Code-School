const cursor = document.querySelector('.cursor');

const body = document.querySelector('body');
const shot = document.querySelector('.shot');
const soundtrack = document.querySelector('.soundtrack');
const startButton = document.getElementById('start-game-button');
const muteButton = document.getElementById('mute-button');
const muteButtonPicture = document.querySelector('.mute-button-picture');
const unmuteButtonPicture = document.querySelector('.unmute-button-picture');
import { handleMouseMove } from './mouseMove.js';

import { smallBullet } from './elements/smallBullet.js';
import { munitionContainer } from './elements/munitionContainer.js';
import { munitionCounter } from './elements/munitionCounter.js';
import { cursorSaber } from './elements/cursorSaber.js';
import { saberSound } from './elements/saberSound.js';
const saberButton = document.querySelector('.saber-button');
const gunButton = document.querySelector('.gun-button');
import { initializeGame } from './game.js';

initializeGame();

const screenWidth = body.offsetWidth;

let isMuted = false;
unmuteButtonPicture.classList.add('hide');
muteButton.addEventListener('click', function () {
  muteButton.addEventListener('pointerenter', function () {
    cursor.classList.add('hide');
  });
  muteButton.addEventListener('pointerleave', function () {
    cursor.classList.remove('hide');
  });

  isMuted = !isMuted;

  if (isMuted) {
    soundtrack.muted = true;
    muteButtonPicture.classList.add('hide');
    unmuteButtonPicture.classList.remove('hide');
  } else {
    soundtrack.muted = false;
    muteButtonPicture.classList.remove('hide');
    unmuteButtonPicture.classList.add('hide');
  }
});

startButton.addEventListener('click', function () {
  soundtrack.play();

  let isGunButtonClicked = true;
  let isSaberButtonClicked = false;

  gunButton.addEventListener('click', function () {
    window.addEventListener('mousemove', handleMouseMove);
    if (cursorSaber) {
      cursorSaber.style.opacity = '0';
    }
    if (cursor) {
      cursor.style.opacity = '1';
    }
    if (bullet) {
      bullet.style.opacity = '1';
    }
    if (smallBullet) {
      smallBullet.style.opacity = '1';
    }
    if (munitionContainer) {
      munitionContainer.style.opacity = '1';
    }
    if (munitionCounter) {
      munitionCounter.style.opacity = '1';
    }
    isSaberButtonClicked = false;
    isGunButtonClicked = true;
  });

  saberButton.addEventListener('click', function () {
    window.addEventListener('mousemove', function (e) {
      cursorSaber.style.left = e.pageX + 'px';
      cursorSaber.style.top = e.pageY + 'px';
    });
    if (cursorSaber) {
      cursorSaber.style.opacity = '1';
    }
    if (cursor) {
      cursor.style.opacity = '0';
    }

    if (smallBullet) {
      smallBullet.style.opacity = '0';
    }
    if (munitionContainer) {
      munitionContainer.style.opacity = '0';
    }
    if (munitionCounter) {
      munitionCounter.style.opacity = '0';
    }
    isGunButtonClicked = false;
    isSaberButtonClicked = true;
  });

  window.addEventListener('click', function () {
    if (isGunButtonClicked) {
      isSaberButtonClicked = false;
      isGunButtonClicked = true;
      shot.play();
    }
  });
  window.addEventListener('click', function () {
    if (isSaberButtonClicked) {
      isGunButtonClicked = false;
      isSaberButtonClicked = true;
      saberSound.currentTime = 0;
      saberSound.play();
    }
  });

  window.addEventListener('click', function (e) {
    // shot.play();

    if (e.target.classList.contains('zombie')) {
      blood.style.display = 'block';
      blood.style.left = e.pageX + 'px';
      blood.style.top = e.pageY + 'px';
      setTimeout(function () {
        blood.style.display = 'none';
      }, 500);
      if (score < targetScore) {
        score++;
        startButton.innerHTML = 'Level ' + currentLevel + ' Score ' + score;
      } else {
        if (currentLevel < 10) {
          currentLevel++;
          targetScore++;
          score = 0;
          startButton.innerHTML = 'Level ' + currentLevel + ' Score ' + score;
          container.style.backgroundImage = `url(images/level${currentLevel}.png)`;
          body.style.backgroundImage = `url(images/level${currentLevel}.png)`;
          alert(
            "Great ! You've killed all the zombies in this area ! Get ready for the next level !"
          );
        } else {
          startButton.innerHTML =
            "Congratulations! You've completed all levels!";
        }
      }
    }
  });

  startButton.innerHTML = 'Level ' + currentLevel + ' Score ' + score;

  setInterval(function () {
    const randleft = Math.random() * (screenWidth - 150);
    zombie.style.left = randleft + 'px';
  }, 1000);
});
