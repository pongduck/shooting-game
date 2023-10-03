//canvas 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width = 800;
canvas.height = 690;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false; //true면 게임이 끝남, false면 게임이 끝나지않음
let score = 0; //점수판

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

  gameOverImage = new Image();
  gameOverImage.src = "img/gameOver.png";
};


//우주선 좌표
let spaceshipX = canvas.width/2-48;
let spaceshipY = canvas.height-96;

//총알 만들기
let bulletList = [] //총알들을 저장하는 리스트
function Bullet(){
  this.x = 0;
  this.y = 0;
  this.init = function(){
    this.x = spaceshipX +  41; //중앙에 오기를 바래서 41을 더함
    this.y = spaceshipY;
    this.alive = true; //true면 살아있는 총알, false면 죽은 총알
    bulletList.push(this)
  }

  this.update = function(){
    this.y -= 7; //총알이 앞으로 나가야 하니까 
  }

  this.checkHit = function(){
    //총알.y <= 적군.y And
    //총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
    for(let i=0; i<enemyList.length; i++){
      if(
        this.y <= enemyList[i].y && 
        this.x >= enemyList[i].x && 
        this.x <= enemyList[i].x + 48){
        score ++; //총알이 죽게됨. 적군의 우주선이 없어짐 -> 점수 획득
        this.alive = false; //죽은 총알
        enemyList.splice(i,1)
      }
    }
  }
};

//적군 만들기
function generateRandomValue(min,max){ //적군 떨어지는 랜덤값
  let randomNum = Math.floor(Math.random()*(max-min+1))+min
  return randomNum
}

function createEnemy(){ //적군생성함수
  const interval = setInterval(function(){
    let e = new Enemy()
    e.init()
  }, 1000) //(호출하고싶은함수, 시간)
}

let enemyList = []

function Enemy(){
  this.x = 0;
  this.y = 0;
  this.init = function(){
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width-48) //canvas 넓이에서 적 이미지 넓이 빼기
    enemyList.push(this)
  }
  this.update = function(){
    this.y += 2  //적군이 떨어지는 속도

    if(this.y >= canvas.height-48){
      gameOver = true;
      console.log("gg")
    }
  }
};

//좌우 움직이기
let keysDown={};
function setupKeyboardListener(){
  document.addEventListener("keydown", function(event){
    keysDown[event.key]=true;
  })
  document.addEventListener("keyup", function(event){
    delete keysDown[event.key]

    if(event.keyCode == 32){
      createBullet()  //총알생성함수
    }
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
  }//down
  if(spaceshipY <=0){
    spaceshipY=0
  }
  if(spaceshipY>=canvas.height-96){
    spaceshipY=canvas.height-96
  }

  //총알의 y좌표 업데이트 하는 함수 호출
  for(let i=0; i<bulletList.length; i++){
    if(bulletList[i].alive){
      bulletList[i].update() //총알을 쓰면서
      bulletList[i].checkHit() //총알이 적군을 치느냐
    }
  }

  //적군의 y좌표 업데이트 하는 함수 호출
  for(let i=0; i<enemyList.length; i++){
    enemyList[i].update()
  }
};

function createBullet(){
  console.log("총알나오나")
  let b = new Bullet() //총알 하나생성
  b.init()
  console.log("new", bulletList)
};

function render(){
  //배경이미지
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score:${score}`, 20, 30); //score
  ctx.fillStyle = "white";  //score
  ctx.font = "20px Arial"  //score

  //총알이미지
  for(let i=0; i<bulletList.length; i++){
    if(bulletList[i].alive){ //총알이 살아있을 때만 보여주라는 조건 설정
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
    }
  }

  //적군이미지
  for(let i=0; i<enemyList.length; i++){
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
  }
};

function main(){
  if(!gameOver){ //gameOver안되면 밑에 함수가 계속 진행됨
    update()
    render()
    requestAnimationFrame(main)
  }else{
    ctx.drawImage(gameOverImage, 230, 100, 380, 380)
  }
};

loadImage();
setupKeyboardListener();
createEnemy();
main();