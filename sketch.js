var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime = 0;
var score;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkeyImage = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);

}
var stop_banana=0;
var stop_obstacle=0;

function draw() {
  background("white");

  if (ground.x = ground.width / 2) {
    ground = createSprite(400, 350, 900, 10);
    ground.velocityX = -4;
  }

  if (obstacleGroup.isTouching(monkey)) {
   stop_banana=1;
   stop_obstacle=1;
  }

  if (stop_banana==0) {
     bananas();
  }
 
   if (stop_obstacle==0) {
    obstacles();
   }

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  

  if (obstacleGroup.isTouching(monkey)) {
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.visible=false;
    monkey1=createSprite(80, 315, 20, 20);
    monkey1.addImage(monkeyImage);
    monkey1.scale=.1;
    monkey1.collide(ground);

  }

  stroke("black");
  textSize(20);
  fill("black");
  if (stop_banana==0) {
  survivalTime = Math.ceil(frameCount / frameRate())
  }
  text("Survival Time: " + survivalTime, 100, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("score :" + survivalTime, 200, 100);

  drawSprites();
}

function bananas() {
  if (World.frameCount % 100 == 0) {
    banana = createSprite(Math.round(random(300, 400)), Math.round(random(120, 200)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.lifetime = 150;

    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(300, 305);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -7;
    obstacle.lifetime = 300;
    obstacle.scale = 0.1;

    obstacleGroup.add(obstacle);
  }
}