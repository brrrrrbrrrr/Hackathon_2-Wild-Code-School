const cursor = document.querySelector('.cursor');
const blood = document.querySelector('.blood');
const zombie = document.querySelector('.zombie');
const body = document.querySelector('body');
const shot = document.querySelector(".shot");
const soundtrack = document.querySelector(".soundtrack");
const startButton = document.getElementById("start-game-button");
const muteButton = document.getElementById('mute-button');
const muteButtonPicture = document.querySelector('.mute-button-picture');
const unmuteButtonPicture = document.querySelector('.unmute-button-picture');
console.log(startButton);
import { initializeGame } from './game.js';

initializeGame();



const container = document.querySelector('.container');

let score = 0;
let currentLevel = 1;
let targetScore = 1;

const screenWidth = body.offsetWidth;


let isMuted = false;
unmuteButtonPicture.classList.add('hide');
muteButton.addEventListener('click', function () {

    muteButton.addEventListener('pointerenter', function () {
        cursor.classList.add('hide');

    })
    muteButton.addEventListener('pointerleave', function () {
        cursor.classList.remove('hide');

    })

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
        cursor.style.left = e.pageX + "px";
        cursor.style.top = e.pageY + "px";
    });

    window.addEventListener('click', function (e) {
        shot.play();

        if (e.target.classList.contains("zombie")) {
            blood.style.display = 'block';
            blood.style.left = e.pageX + "px";
            blood.style.top = e.pageY + "px";
            setTimeout(function () {
                blood.style.display = 'none';
            }, 500);
            if (score < targetScore) {
                score++;
                startButton.innerHTML = "Level " + currentLevel + " Score " + score;
            } else {
                if (currentLevel < 10) {
                    currentLevel++;
                    targetScore++;
                    score = 0;
                    startButton.innerHTML = "Level " + currentLevel + " Score " + score;
                    container.style.backgroundImage = `url(images/level${currentLevel}.png)`;
                    body.style.backgroundImage = `url(images/level${currentLevel}.png)`;
                    alert("Great ! You've killed all the zombies in this area ! Get ready for the next level !")
                } else {
                    startButton.innerHTML = "Congratulations! You've completed all levels!";
                }
            }
        }
    });

    startButton.innerHTML = "Level " + currentLevel + " Score " + score;

    // setInterval(function () {
    //     const randleft = Math.random() * (screenWidth - 150);
    //     zombie.style.left = randleft + "px";
    // }, 1000);
});

