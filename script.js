const cursor = document.querySelector('.cursor');
const blood = document.querySelector('.blood');
const duck = document.querySelector('.duck');
const body = document.querySelector('body');
const shot = document.querySelector(".shot");
const soundtrack = document.querySelector(".soundtrack");
const startButton = document.querySelector(".start-game");
const muteButton = document.querySelector('.mute-button');
const muteButtonPicture = document.querySelector('.mute-button-picture');
const unmuteButtonPicture = document.querySelector('.unmute-button-picture');




const level1 = document.querySelector(".level1")
const level2 = document.querySelector(".level2")
const level3 = document.querySelector(".level3")
const level4 = document.querySelector(".level4")
const level5 = document.querySelector(".level5")
const level6 = document.querySelector(".level6")
const level7 = document.querySelector(".level7")
const level8 = document.querySelector(".level8")
const level9 = document.querySelector(".level9")
const level10 = document.querySelector(".level10")
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

        if (e.target.classList.contains("duck")) {
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
                    this.alert("Great ! You've killed all the zombies in this area ! Get ready for the next level !")
                } else {
                    startButton.innerHTML = "Congratulations! You've completed all levels!";
                }
            }
        }
    });

    startButton.innerHTML = "Level " + currentLevel + " Score " + score;

    setInterval(function () {
        const randleft = Math.random() * (screenWidth - 150);
        duck.style.left = randleft + "px";
    }, 1000);
});
