cursor = document.querySelector('.cursor')
blood = document.querySelector('.blood')
duck = document.querySelector('.duck')
body = document.querySelector('body')
button = document.querySelector('button')
 shot = document.querySelector(".shot");
 

score = 0;
screenWidth = body.offsetWidth;
screenHeight = body.offsetHeight;
 


button.addEventListener('click',function(){

    window.addEventListener('mousemove',function(e){
        cursor.style.left = e.pageX + "px";
        cursor.style.top = e.pageY + "px"; 
        console.log(e.target.classList)
      
    })

    window.addEventListener('click',function(e){
        
        shot.play();
     
        if(e.target.classList.contains("duck")){
            blood.style.display = 'block'
            blood.style.left = e.pageX + "px";
            blood.style.top = e.pageY + "px";
            this.setTimeout(function(){
                blood.style.display = 'none'
            },500)
            score++
            button.innerHTML = "Score "+score
            shot.play();
            
        }
    }) 

    setInterval(function(){
        randTop = Math.random() * (screenHeight - 150);
        randleft = Math.random() * (screenWidth - 150);
        duck.style.left = randleft + "px"
        duck.style.top = (randTop) + "px" 

        },1000)
})






