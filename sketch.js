var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var bananaGroup, obstacleGroup;

var score=0;
var survivalTime=0;

function preload(){
monkey_running =             loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
}

function setup() {
  
  createCanvas(400,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
}


function draw() {
  background("white");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:",300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime:"+survivalTime,100,50);
  
  if(gameState===PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    spawnBananas();
    spawnObstacles();
}
  else if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    obstacleGroup.destroyEach();
    
  }
  drawSprites();
}

function spawnBananas(){
  if(frameCount%80===0){
    var banana=createSprite(600,165,10,40);
    banana.velocityX=-3;
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=175;
    
    bananaGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount%100===0){
    var obstacle=createSprite(600,330,10,40);
    obstacle.velocityX=-7;
    //obstacle.y=Math.round(random(120,200));
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime=150;
    
    obstacleGroup.add(obstacle);
    }
}




