class Shoot extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("/Images/fireball.jpg");
    this.smokeImage = loadImage("/Images/smoke.png");
    this.trajectory =[];
    this.width=100
    this.height = 100
  }

  display() {
    super.display();
    if(this.body.velocity.x > 10 && this.body.position.x > 200){
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }
   
if(gameState!="onSling"){
    for(var i=0; i<this.trajectory.length; i++){
      image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
    }
  }
  }
}
