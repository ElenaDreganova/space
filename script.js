
    

   score = document.querySelector("#score span");

 
   audioPlayer = document.querySelector("audio");

   source = document.querySelector("audio source");

   startBlock = document.querySelector("#start");
   gameBlock = document.querySelector("#game");
   startBtn = document.querySelector("#startBtn");
   gamerSkin = "skin_1";

   countLifes = 5;






   startBtn.onclick = function() {
      startGame();
     }
 
sound = "off"; //"on"
  soundBtn = document.querySelector("#sound img");

   soundBtn.onclick = function() {

   if(sound == "on") {
     soundBtn.src = "images/mute_sound.png";
     sound = "off";
     audioPlayer.pause(); 

  }    else {
      soundBtn.src = "images/sound_on.png";
      sound = "on";
      audioPlayer.play();
   }

}
  function startGame() {
      startBlock.style.display = "none";
      gameBlock.style.display = "block";
      gamer = document.querySelector("#player");
      gamer.className = gamerSkin;

      createLifes();
      createEnemy();
 } 
    
   function createEnemy() {
      let enemy = document.createElement("div");
          enemy.className = "enemy " + typeEnemy();

         
          enemy.style.top = random(100, document.querySelector("#app").clientHeight - 250)  + "px";
            //
            

      gameBlock.appendChild(enemy);
      moveEnemy(enemy);
       }

    function typeEnemy() {
        if(random(1, 2) == 1) {
            return "type-1";
        } else {
            return " type-2";
        }
   }



    function moveEnemy(enemy) {
      let timerID = setInterval(function() {
         enemy.style.left = enemy.offsetLeft - 10 + "px";
         if(enemy.offsetLeft < -100) {
         enemy.remove();
           createEnemy();
           clearInterval(timerID);
           die();
         }
       }, 100)


 document.onkeydown = function(event) {
    if(event.keyCode == 87 && gamer.offsetTop > 60) {          
     gamer.style.top  = gamer.offsetTop - 40 + "px";
         }

    if(event.keyCode == 83 && gamer.offsetTop < document.querySelector("#app").clientHeight - 250) {                                     
        gamer.style.top  = gamer.offsetTop + 40 + "px";
         }

    if(event.keyCode == 32) {
      createBullet();
   }
 
}   
    function createBullet() {
      let bullet = document.createElement("div");
          bullet.className = "bullet";
          bullet.style.top = gamer.offsetTop + 140 + "px";

      gameBlock.appendChild(bullet);
      moveBullet(bullet);

   function  moveBullet(bullet) {
      let timerID = setInterval(function() {  
         bullet.style.left = bullet.offsetLeft + 10 + "px";
        
         if(bullet.offsetLeft > document.querySelector("body").clientWidth) {
           bullet.remove();
           clearInterval(timerID);
        }

        isBoom(bullet); 
       }, 10)
}
}
}

function isBoom(bullet) {
   let enemy = document.querySelector(".enemy");

   if(bullet.offsetTop > enemy.offsetTop && bullet.offsetTop < enemy.offsetTop + enemy.clientHeight
      && bullet.offsetLeft > enemy.offsetLeft) {
      createBoom(bullet.offsetTop, bullet.offsetLeft);
      score.innerText = Number(score.innerText) + 1;
      bullet.remove();
      enemy.remove();
      createEnemy();
   }

}
    

     
function die() {
   countLifes = countLifes - 1;
   if(countLifes <= 0) {
      endGame();
   }
   createLifes();
}

function createLifes() {
   let lifesBlock = document.querySelector("#lifes");
       lifesBlock.innerHTML = "";
   let count = 0;
   while (count < countLifes) {
      let span = document.createElement("span");
      lifesBlock.appendChild(span);

      count = count + 1;
   }
}

function createBoom(top, left) {
    let boom = document.createElement("div");
        boom.className = "boom";
        boom.style.top = top - 100 + "px";
        boom.style.left = left - 100 + "px";

    gameBlock.appendChild(boom);
    setTimeout(function() {
        boom.remove();
    }, 1000);
} 

function endGame() {
    let scoreBlock = document.querySelector("#end h3 span");
    scoreBlock.innerText = score.innerText;
    gameBlock.innerHTML = "";
    let endBlock = document.querySelector("#end");
    endBlock.style.display = "block";

    let restartBtn = document.querySelector("#end button");
    restartBtn.onclick = restart;
} 

function restart() {
    location.reload(); 
}
function random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand); 
}

selectSkin1 = document.querySelector("#skin_1");
selectSkin1.onclick = function() {
    selectSkin1.className = "selected";
    selectSkin2.className = "";
    gamerSkin = "skin_1";
}
selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function() {
    selectSkin2.className = "selected";
    selectSkin1.className = "";
    gamerSkin = "skin_2";
} 