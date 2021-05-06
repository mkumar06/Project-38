var monkey, jungle, bananaGroup, obsacleGroup, survivalTime;
var monkeyImage, bananaImage, jungleImage, stoneImage;
var gameState = "play";

function preload() {
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  jungleImage = loadImage("jungle.jpg");

  stoneImage = loadImage("stone.png");

  bananaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(400, 400);

  jungle = createSprite(400, 350, 800, 10);
  //jungle.velocityX = -4;
  jungle.addImage("grass", jungleImage);
  jungle.scale = 2.3;

  monkey = createSprite(100, 300, 20, 50);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.1;

  bananaGroup = new Group();
  obstacleGroup = createGroup();
  
  invisibleGround = createSprite(200, 420, 410, 30);
  invisibleGround.visible = false;

  survivalTime = 0;

  stroke = ("black");
  textSize(20);
}

function draw() {
  background(255);

  if (gameState === "play") {

  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  monkey.velocityX = 4;
  
  camera.position.x = monkey.x;
  camera.position.y = height/2;

  invisibleGround.x = monkey.x;
  

  if (monkey.x % 400 === 0) {
    jungle.x = monkey.x;
  } 
  monkey.collide(invisibleGround);

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  food();
  obstacles();

  drawSprites()
  text("Survival Time: " + survivalTime, monkey.x, 50);
  if(survivalTime == 20) {
    gameState = "end";
  }
}else if(gameState) {
  monkey.velocityX = 0;
  monkey.velocityY = 0;
  bananaGroup.setVelocityXEach(0);
}


function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(monkey.x + 500, 120, 20, 20);
    banana.addImage("Banana", bananaImage);
    banana.scale = 0.05;

    banana.y = random(120, 200);

    //banana.velocityX = -7;
    banana.setLifetime = 100;

    bananaGroup.add(banana);
  }
}
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(monkey.x + 250, 380, 20, 20);
    obstacle.addImage("Stone", stoneImage);
    obstacle.scale = 0.1;

    //obstacle.velocityX = -7;
    obstacle.setLifetime = 50;

    obstacleGroup.add(obstacle);
  }
}