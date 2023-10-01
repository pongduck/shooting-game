//canvas 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//우주선 좌표
let spaceshipX = canvas.width/2-48;
let spaceshipY = canvas.height-96;

//이미지 불러오기
function loadImage(){
  backgroundImage = new Image();
  backgroundImage.src = "img/background.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "img/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "img/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "img/enemy.png";

  gameOverImageImage = new Image();
  gameOverImageImage.src = "img/gameover.png";
};

//좌우 움직이기
let keysDown={};
function setupKeyboardListener(){
  document.addEventListener("keydown", function(event){
    keysDown[event.key]=true;
  })
  document.addEventListener("keyup", function(event){
    delete keysDown[event.key]
  })
};

function update(){
  if('ArrowRight' in keysDown) {
    spaceshipX += 2;
  }//right
  if('ArrowLeft' in keysDown) {
    spaceshipX -= 2;
  }//left
  if(spaceshipX <=0){
    spaceshipX=0
  }
  if(spaceshipX>=canvas.width-96){
    spaceshipX=canvas.width-96
  }

  if('ArrowUp' in keysDown) {
    spaceshipY -= 2;
  }//up
  if('ArrowDown' in keysDown) {
    spaceshipY += 2;
  }//up
  if(spaceshipY <=0){
    spaceshipY=0
  }
  if(spaceshipY>=canvas.height-96){
    spaceshipY=canvas.height-96
  }
}

function render(){
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY)
};

function main(){
  update()
  render()
  requestAnimationFrame(main)
};

loadImage();
setupKeyboardListener();
main();
