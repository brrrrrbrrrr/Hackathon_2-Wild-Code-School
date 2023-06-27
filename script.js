const cursor = document.querySelector('.cursor');

const body = document.querySelector('body');
const soundtrack = document.querySelector('.soundtrack');
const startButton = document.getElementById('start-game-button');
const muteButton = document.getElementById('mute-button');
const muteButtonPicture = document.querySelector('.mute-button-picture');
const unmuteButtonPicture = document.querySelector('.unmute-button-picture');

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

    window.addEventListener('mousemove', function (e) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    // startButton.innerHTML = 'Level ' + currentLevel + ' Score ' + score;

    // setInterval(function () {
    //   const randleft = Math.random() * (screenWidth - 150);
    //   zombie.style.left = randleft + 'px';
    // }, 1000);
});
