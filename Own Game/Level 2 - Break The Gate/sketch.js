const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Events = Matter.Events;
var bg;
var gameState = "onSling";


function preload(){
  bg = loadImage("/Images/bg.jpg")
}

function setup(){
  var canvas = createCanvas(displayWidth-4,displayHeight-151)
  engine = Engine.create();
  world = engine.world;



  shoot = new Shoot(displayWidth/8,displayHeight/3);
  slingshot = new SlingShot(shoot.body,{x:displayWidth/8, y:displayHeight/3});


}

function draw(){
  background(bg)
  Engine.update(engine);

  shoot.display()
  slingshot.display()
}

function mouseDragged(){
  if (gameState!="launched"){
      Matter.Body.setPosition(shoot.body, {x: mouseX , y: mouseY});
  }
}


function mouseReleased(){
  slingshot.fly();
  gameState = "launched";
}

function keyPressed(){
  if(keyCode === 32){
     gameState = "onSling";
     shoot.trajectory= [];
     Matter.Body.setPosition(shoot.body, {x:displayWidth/8 , y:displayHeight/3});
  // Matter.body.rotate(bird.body, 0)
     slingshot.attach(shoot.body);
  }
}