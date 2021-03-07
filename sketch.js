var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg, stoneImg;
var Foodgroup;
var score = 0;
var Stonegroup;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  Foodgroup = new Group();
  Stonegroup = new Group();
  
}

function draw() { 
  background(0);
  drawSprites();
  if(gameState===PLAY){
    spawnFood();
    spawnObstacles();
    if(Foodgroup.isTouching(player)){
      Foodgroup.destroyEach();
      score = score + 2;
      player.scale += 0.1;
    }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(Stonegroup.isTouching(player)){
      gameState = END;
    } 
  } else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;    

    Foodgroup.destroyEach();
    Stonegroup.destroyEach();

    textSize(30);
    fill(255);
    text("GAME OVER!!!", 300, 220);
  }
    

  textSize(20);
  noStroke();
  fill ("white");
  text('Score: ' + score, 600, 80);
}

function spawnFood(){
  if (frameCount % 80 === 0){
    var banana = createSprite(600, 250, 40, 10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    Foodgroup.add(banana);


  }

}

function spawnObstacles(){
  if(frameCount % 80 === 0){
    var stone = createSprite(600,350,50,50);
    stone.x = Math.round(random(70,250));
    stone.addImage(stoneImg);
    stone.velocityX = -4;
    stone.scale = 0.3;

    stone.lifetime = 300;
    player.depth = stone.depth + 1;
    Stonegroup.add(stone);
  }
}