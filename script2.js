const cursor = document.querySelector('.cursor');
const blood = document.querySelector('.blood');
const duck = document.querySelector('.duck');
const body = document.querySelector('body');
const button = document.querySelector('button');
const shot = document.querySelector('.shot');
const bullet = document.querySelector('.bullet');
const reload = document.querySelector('.reload');

let score = 0;
const screenWidth = body.offsetWidth;
const screenHeight = body.offsetHeight;
// let totalMunitions = 10;
// let munitionsRestantes = totalMunitions;

// const munitionCounter = document.getElementById('munition-counter');
// munitionCounter.textContent = munitionsRestantes;

function addMunitionIcons() {
  const munitionContainer = document.querySelector('.munition-container');
  munitionContainer.innerHTML = '';

  for (let i = 0; i < munitionsRestantes; i++) {
    const smallBulletIcon = document.createElement('div');
    smallBulletIcon.classList.add('small-bullet');
    munitionContainer.appendChild(smallBulletIcon);
  }
}

button.addEventListener('click', function () {
  window.addEventListener('mousemove', function (e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    console.log(e.target.classList);
  });

  window.addEventListener('click', function (e) {
    if (munitionsRestantes > 0) {
      if (e.target.classList.contains('duck')) {
        blood.style.display = 'block';
        blood.style.left = e.pageX + 'px';
        blood.style.top = e.pageY + 'px';

        setTimeout(function () {
          blood.style.display = 'none';
        }, 500);
        score++;
        button.innerHTML = 'Score ' + score;
        if (munitionsRestantes > 0) {
          shot.play();
          duck.style.display = 'none';
          this.setTimeout(function () {
            duck.style.display = 'block';
          }, 1000);
        }
      }

      munitionsRestantes--;
      munitionCounter.textContent = munitionsRestantes;
      addMunitionIcons(); // Mettre à jour les icônes de small-bullet
    }

    if (
      e.target.classList.contains('bullet') &&
      bullet.style.display === 'block'
    ) {
      munitionsRestantes += 5;
      munitionCounter.textContent = munitionsRestantes;
      bullet.style.display = 'none';
      reload.play();
      addMunitionIcons(); // Mettre à jour les icônes de small-bullet
    } else if (munitionsRestantes > 0) {
      shot.play();
    }
  });

  setInterval(function () {
    const randLeft = Math.random() * (screenWidth - 150);
    duck.style.left = randLeft + 'px';
  }, 1000);
});

function displayBullet() {
  bullet.style.display = 'block';

  setTimeout(function () {
    bullet.style.display = 'none';

    setTimeout(function () {
      displayBullet();
    }, 5000);
  }, 5000);
}

displayBullet();
addMunitionIcons(); // Ajouter les icônes de small-bullet initiales
