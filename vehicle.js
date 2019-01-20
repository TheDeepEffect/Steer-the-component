
function getRandomColor() {
   var color=Math.floor(Math.random() * 255) + 0     //randomm number between 0-255
    return color;
}
function vehicle(x,y){
    this.pos = createVector(random(width),random(height));           //starting position
    // this.pos = createVector(x,y);
    this.target = createVector(x,y);        //targeted position
    this.vel = p5.Vector.random2D()         //ramdom velocity is assigned
    this.acc = createVector()
    // this.r=0
    this.maxSpeed=5
    this.maxForce=50
    this.minForce=10

}


//Prototype is efficient,better and more correct way to assign function to an object

/*----------------------------------------------------------------------------------------- */

//behavior of each and every point,it has multiple behaviors
vehicle.prototype.behavior = function(){
    var arrive= this.arrive(this.target);
    this.applyForce(arrive);                  //adds the force of seek into acceleration (Sterring funda.)


    var mouse=createVector(mouseX,mouseY);
    var flee=this.flee(mouse);
    this.applyForce(flee);
}

//multiple forces added to acceleration
vehicle.prototype.applyForce=function (f)
{
    this.acc.add(f);
}

//desired speed will be mapped according to target
vehicle.prototype.arrive = function(target){
    var desired=p5.Vector.sub(target,this.pos)
    
    var dist=desired.mag();
    var speed=this.maxSpeed;
    if(dist<100)
    {
        speed=map(dist,0,100,0,this.maxSpeed)
    }
    desired.setMag(speed)

    var steer=p5.Vector.sub(desired,this.vel);      //steering velocity formula
    steer.limit(this.maxForce);
    
    return steer;
}

//Flee function can make points afraid of mouse so points will go away as we hover the mouse
vehicle.prototype.flee = function(target){
    
    var desired=p5.Vector.sub(target,this.pos)
    var d=desired.mag();
    if(d<50){

        desired.setMag(this.maxSpeed)
        desired.mult(-1)
        var steer=p5.Vector.sub(desired,this.vel);      //steering velocity formula
        steer.limit(this.maxForce);
        
        return steer;
    }
}


/*//In order to get the steering velocity in order to reach target point from current position

vehicle.prototype.seek = function(target){
    var desired=p5.Vector.sub(target,this.pos)
    desired.setMag(this.maxSpeed)
    var steer=p5.Vector.sub(desired,this.vel);      //steering velocity formula
    steer.limit(this.maxForce);
    return steer;
}
*/







/*----------------------------------------------------------------------------------------- */

//updates position of a point
vehicle.prototype.update = function () {    
    this.pos.add(this.vel)                  //Adding the value of postion to velocity which will change the velocity of the point
    this.vel.add(this.acc)                  //adding the value of acceleration to the velocity
    this.acc.mult(0)                        //Clear the acceleration so that every frame of animation starts from 0
} 


vehicle.prototype.show = function(){
    stroke(getRandomColor(),getRandomColor(),getRandomColor());         //getting random colors everytime 😎
    strokeWeight(6)
    point(this.pos.x,this.pos.y)
}