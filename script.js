cursor = document.querySelector('.cursor');
blood = document.querySelector('.blood');
zombie = document.querySelector('.zombie');
body = document.querySelector('body');
button = document.querySelector('button');
shot = document.querySelector('.shot');

score = 0;
screenWidth = body.offsetWidth;
// screenHeight = body.offsetHeight;

button.addEventListener('click', function () {
  window.addEventListener('mousemove', function (e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    console.log(e.target.classList);
  });

  window.addEventListener('click', function (e) {
    shot.play();

    if (e.target.classList.contains('zombie')) {
      blood.style.display = 'block';
      blood.style.left = e.pageX + 'px';
      blood.style.top = e.pageY + 'px';
      this.setTimeout(function () {
        blood.style.display = 'none';
      }, 500);
      score++;
      button.innerHTML = 'Score ' + score;
      shot.play();
    }
  });

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

  setInterval(updateZombieDistance, 1000);

  zombie.classList.add('zombie-walk');


    
    const zombieMaker = (distance = 55, width = 50, height = 50) => {
      let img = document.createElement('img');
      img.src = 'clicker.png';
      document.body.appendChild(img);
      img.classList.add('zombie');
      img.classList.add('zombie-walk');
      img.style.left = 20 + Math.random() * 50 + '%';
      img.style.top = `${distance}%`;
      img.style.width = `${width}px`;
      img.style.height = `${height}px`;
      img.style.zIndex = 1;

      const updateZombieDistance = () => {
        distance += 1;
        width += 20;
        height += 20;
        img.style.top = `${distance}%`;
        img.style.width = `${width}px`;
        img.style.height = `${height}px`;
      };

      setInterval(updateZombieDistance, 1000);
    };

    setInterval(() => {
      zombieMaker();
    }, 1000);
});
