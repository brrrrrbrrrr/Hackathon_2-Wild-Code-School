cursor = document.querySelector('.cursor');
blood = document.querySelector('.blood');
duck = document.querySelector('.duck');
body = document.querySelector('body');
button = document.querySelector('button');
shot = document.querySelector('.shot');
bullet = document.querySelector('.bullet');

score = 0;
screenWidth = body.offsetWidth;
screenHeight = body.offsetHeight;
let totalMunitions = 10;
let munitionsRestantes = totalMunitions;

const munitionCounter = document.getElementById('munition-counter');
munitionCounter.textContent = 'Munitions: ' + munitionsRestantes;

button.addEventListener('click', function () {
  window.addEventListener('mousemove', function (e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    console.log(e.target.classList);
  });

  window.addEventListener('click', function (e) {
    if (munitionsRestantes > 0) {
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
      }

      munitionsRestantes--;
      munitionCounter.textContent = 'Munitions: ' + munitionsRestantes;
    }
  });

  setInterval(function () {
    // randTop = Math.random() * (screenHeight - 150);
    randleft = Math.random() * (screenWidth - 150);
    duck.style.left = randleft + 'px';
    // duck.style.top = (randTop) + "px"
  }, 1000);
});

function displayBullet() {
  bullet.style.display = 'block'; // Afficher la munition

  setTimeout(function () {
    bullet.style.display = 'none'; // Masquer la munition après 5 secondes

    setTimeout(function () {
      displayBullet(); // Réafficher la munition après 5 secondes
    }, 5000);
  }, 5000);
}

displayBullet(); // Démarre le cycle d'affichage et de masquage de la munition
