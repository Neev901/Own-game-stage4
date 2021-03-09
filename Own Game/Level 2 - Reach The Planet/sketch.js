var bg

function preload() {
  bg = loadImage("/Images/bg.jpg")
  planet_img = loadImage("/Images/planet.png")
  astroid_img = loadImage("/Images/asteroid.png")
  obs_1_img = loadImage("/Images/hole.png")
  obs_2_img = loadImage("/Images/wormHole.png")
}

function setup(){
  var canvas = createCanvas(displayWidth-4,displayHeight-151)
  planet = createSprite(displayWidth/2.05, displayHeight/2.25)
  planet.addImage(planet_img)
  planet.scale = 0.5
  astroid = createSprite(displayWidth/2.05, displayHeight/4)
  astroid.addImage(astroid_img)
  astroid.scale = 0.1
  obs_1 = createSprite(displayWidth/2.05,displayHeight/5)
  obs_1.addImage(obs_1_img)
  obs_1.scale = 0.2
  obs_2 = createSprite(displayWidth/2.05,displayHeight/6.5)
  obs_2.addImage(obs_2_img)
  obs_2.scale = 0.1
}

function draw(){
  background(bg)
  astroid.setSpeed(5,astroid.getDirection() + 1.3)
  obs_1.setSpeed(4,obs_1.getDirection() + 0.9)
  drawSprites()
}