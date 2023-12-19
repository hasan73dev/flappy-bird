let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
const birdImg = new Image()
const topPipe = new Image()
const bottomPipe = new Image();
const board = {
    width:560,
    height:640
}
birdImg.src = "assets/flappybird.png"
topPipe.src = "assets/toppipe.png"
bottomPipe.src = "assets/bottompipe.png"
let score = 0;
let bird = {
    x:50,
    y:300,
    width:34,
    height:24,
    gravity:0.4
}
let birdVelocityY = 0;
let pipesArray = []
let gameOver = false
setInterval(() => {
    if(gameOver) return

    let random = Math.floor(Math.random() * -300);

    const pipe = {
        top:{
        x:560,
        y:random,
        width:70,
        height:400
        },
        bottom:{
            x:560,
            y:540 + random, //500 onceki 500
            width:70,
            height:500 //500
        }
    }

   pipesArray.push(pipe)
  //  console.log(pipesArray)
}, 2000);

document.addEventListener("keydown",jump);

birdImg.onload = () => {

    ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)
    
}

requestAnimationFrame(update)


function update(){
    ctx.clearRect(0,0,board.width,board.height);
    ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)
 
     pipesArray =  pipesArray.filter(pipe => pipe.top.x > -70)
    if(!gameOver){
        birdVelocityY -= bird.gravity
        bird.y -= birdVelocityY
    }
   if(bird.y > 640){
        gameOver = true
   }
    
     pipesArray.forEach(pipe =>{
       ctx.drawImage(topPipe,pipe.top.x,pipe.top.y,pipe.top.width,pipe.top.height);    
       ctx.drawImage(bottomPipe,pipe.bottom.x,pipe.bottom.y,pipe.bottom.width,pipe.bottom.height);
      
       if((bird.x < pipe.top.x + pipe.top.width && bird.x + bird.width > pipe.top.x && bird.y < pipe.top.y + pipe.top.height && bird.y + bird.height > pipe.top.y) || bird.x < pipe.bottom.x + pipe.bottom.width && bird.x + bird.width > pipe.bottom.x && bird.y < pipe.bottom.y + pipe.bottom.height && bird.y + bird.height > pipe.bottom.y){
        gameOver = true

       }
       if(!gameOver){
        pipe.top.x -= 3
        pipe.bottom.x -= 3
       }
       if(pipe.top.x === bird.x && !gameOver){
        score += 10
       }
       

   })
     ctx.font = "30px Arial";
     ctx.fillText(`Score : ${score}`,10, 30);


    requestAnimationFrame(update)
}

function jump(e){
    if(!gameOver && !(bird.y < 0)){
    if(e.code === "Space"){
    
      birdVelocityY = 5
  
    }
    }
    else if(gameOver && e.code === "Space"){
      pipesArray = [];
      bird.x = 50
      bird.y = 300;
      birdVelocityY = 0
      score = 0
      gameOver = false
    }
   
}