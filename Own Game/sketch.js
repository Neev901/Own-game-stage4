var bg, player_img, button, state = "start";
var more_btn, btn_2, level_1_sprite, lvl_1_logo;
var SpaceShip, SpaceShip_img;
var fb1, fb2, fb3, fb4;
var fbr1, fbr2, fbr3, fbr4;
var fireballs_right, fireballs_left;
var bg, game_over_img, game_over;
var you_win, you_win_img
var gameState = "play"


function preload(){
  bg = loadImage("./Images/Starter - Copy.jpg")
  bg1_st2 = loadImage("./Images/Main bg - st 2.jpg")
  bg2 = loadImage("./Images/bg2.jpg")
  player_img = loadImage("/Images/hero.png")
  more_btn = loadImage("/Images/more.png")
  fight_btn = loadImage("./Images/Fight.png")
  lvl_1_logo = loadImage("./Images/image.jpg")
  SpaceShip_img = loadImage("/Level 1 - Space Racer/Images/Spaceship.jpg")
  fb1 = loadImage("/Level 1 - Space Racer/Images/fireball(1).png")
  fb2 = loadImage("/Level 1 - Space Racer/Images/fireball(2).png")
  fb3 = loadImage("/Level 1 - Space Racer/Images/fireball(3).png")
  fb4 = loadImage("/Level 1 - Space Racer/Images/fireball(4).png")
  fbr1 = loadImage("/Level 1 - Space Racer/Images/fireball(1) - right.png")
  fbr2 = loadImage("/Level 1 - Space Racer/Images/fireball(2) - right.png")
  fbr3 = loadImage("/Level 1 - Space Racer/Images/fireball(3) - right.png")
  fbr4 = loadImage("/Level 1 - Space Racer/Images/fireball(4) - right.png")
  bg_lv1 = loadImage("/Level 1 - Space Racer/Images/bg.jpg")
  game_over_img = loadImage("/Level 1 - Space Racer/Images/go-bg.jpg")
  you_win_img = loadImage("/Level 1 - Space Racer/Images/you-win.jpg")
}

function setup(){
  var canvas = createCanvas(displayWidth-4,displayHeight-151)
  // button = createElement("button")
  // button.html("next")
  // button.position(10*displayWidth/12,9.75*displayHeight/12)
  button = createSprite(10*displayWidth/12,9.75*displayHeight/12)
  button.addImage("btn", more_btn)
  lvl_1_ins = createElement("h1")
  lvl_1_ins.position(displayWidth/3, (displayHeight/12))
  lvl_1_ins.html("Use up and down keys to move")
  lvl_1_ins.style("font-size", "50px")
  lvl_1_ins.style("color", "white")
  lvl_1_ins.hide()
  btn_2 = createSprite(10*displayWidth/2,9.75*displayHeight/12)
  btn_2.addImage("fight", fight_btn)
  btn_2.visible = false
  level_1_sprite = createSprite(displayWidth/5, displayHeight/4)
  level_1_sprite.addImage("logo", lvl_1_logo)
  level_1_sprite.scale = 0.3
  level_1_sprite.visible = false
  state = "start"

  SpaceShip = createSprite(displayWidth/2, 0.8 * displayHeight)
  SpaceShip.addImage("img", SpaceShip_img)
  SpaceShip.scale = 0.075
  SpaceShip.visible = false
  SpaceShip.setCollider("rectangle",0,0,500,500)
  fireballs_left = new Group()
  fireballs_right = new Group()
  game_over = createSprite(displayWidth/2, displayHeight/2)
  game_over.addImage("bg", game_over_img)
  game_over.visible = false
  you_win = createSprite(displayWidth/2, displayHeight/2.5)
  you_win.addImage("bg", you_win_img)
  you_win.scale=2
  you_win.visible = false
  text_ins = createElement("h1")
  text_ins.html("Phase 2")
  text_ins.style("color", "black")
  text_ins.style("font-size", "200px")
  text_ins.position(displayWidth/3, (displayHeight/4))
  text_ins.hide()
}

function draw(){
  background(bg)
  image(player_img, displayWidth/200, displayHeight/12, displayWidth/3, displayHeight/2.5)
  if(state==="start" && mousePressedOver(button)){
    state = "start_1"
  }
  if(state=="start_1"){
    background(bg1_st2)
    image(player_img, displayWidth/200, displayHeight/12, displayWidth/3, displayHeight/2.5)
    button.visible = false
    if(mousePressedOver(btn_2)){
      state="Level"
    }
    btn_2.visible = true
    btn_2.x = 9*displayWidth/12
    btn_2.y = 9*displayHeight/12
    btn_2.scale = 1.5
  }
  if(state === "Level"){
    background(bg2)
    btn_2.visible = false
    level_1_sprite.visible = true
    if(mousePressedOver(level_1_sprite)){
      state="Level1"
      frameCount = 0
    }
  }
  if(state == "Level1"){
    SpaceShip.visible = true
    level_1_sprite.visible = false
    background(bg_lv1)
    if(frameCount>50){
      if(keyDown(UP_ARROW)){
        SpaceShip.y = SpaceShip.y - displayHeight/200
      }
      else if(keyDown(DOWN_ARROW)){
        SpaceShip.y = SpaceShip.y + displayHeight/200
      }
    }
    if(fireballs_right.isTouching(SpaceShip) || fireballs_left.isTouching(SpaceShip)){
      gameState = "over"
      lvl_1_ins.hide()
      game_over.scale = 1
      game_over.visible = true
      fireballs_right.destroyEach()
      fireballs_left.destroyEach()
    }
  
    if(SpaceShip.y < 0 && gameState=="play"){
      setTimeout(function () {
        text_ins.show()
      }, 2000)
      setTimeout(function () {
        text_ins.hide()
        SpaceShip.x = displayWidth/2
        SpaceShip.y = 0.8 * displayHeight
        fireballs_right.destroyEach()
        fireballs_left.destroyEach()
        gameState = "P2"
      }, 4000)
    }
  
    if(SpaceShip.y < 0 && gameState=="P2"){
      lvl_1_ins.hide()
      gameState = "won"
      you_win.scale = 2
      you_win.visible = true
      fireballs_right.destroyEach()
      fireballs_left.destroyEach()
    }
  
    if(gameState == "play"){
      CreateFireball_left(6.5)
      CreateFireball_right(-6.5)
      if(SpaceShip.y<displayHeight/2 && SpaceShip.y>displayHeight/3){
        fireballs_left.setVelocityXEach(7.5)
        fireballs_right.setVelocityXEach(-7.5)
      }
      else if(SpaceShip.y<displayHeight/3 && SpaceShip.y>displayHeight/4){
        fireballs_left.setVelocityXEach(8.5)
        fireballs_right.setVelocityXEach(-8.5)
      }
      else if(SpaceShip.y<displayHeight/4){
        fireballs_left.setVelocityXEach(10.5)
        fireballs_right.setVelocityXEach(-10.5)
      }
      lvl_1_ins.show()
    }
    if(gameState == "P2"){
      lvl_1_ins.show()
      CreateFireball_left(8.5)
      CreateFireball_right(-8.5)
      if(SpaceShip.y<displayHeight/2 && SpaceShip.y>displayHeight/3){
        fireballs_left.setVelocityXEach(9.5)
        fireballs_right.setVelocityXEach(-9.5)
      }
      else if(SpaceShip.y<displayHeight/3 && SpaceShip.y>displayHeight/4){
        fireballs_left.setVelocityXEach(10.5)
        fireballs_right.setVelocityXEach(-10.5)
      }
      else if(SpaceShip.y<displayHeight/4){
        fireballs_left.setVelocityXEach(12.5)
        fireballs_right.setVelocityXEach(-12.5)
      }
    } 
   }
  drawSprites()
}

function CreateFireball_left(vel) {
  if (frameCount % 25 == 0) {
    var fireball = createSprite(displayWidth/2 - (displayWidth / 2 + 10),(Math.ceil(Math.random()*1000)))
    fireball.addAnimation("fb_anime", fb1, fb2, fb3, fb4);
    fireball.velocityX = vel
    fireball.scale = 0.4;
    fireball.lifetime = 380
    fireballs_left.add(fireball)
  }
}
function CreateFireball_right(vel) {
  if (frameCount % 50 == 0) {
    var fireball = createSprite(displayWidth/2 + (displayWidth / 2 + 10), (Math.ceil(Math.random()*1000)))
    fireball.addAnimation("fb_anime", fbr1, fbr2, fbr3, fbr4);
    fireball.velocityX = vel
    fireball.scale = 0.4;
    fireball.lifetime = 380
    fireballs_right.add(fireball)
  }
}