let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d");
let width=canvas.width;
let height=canvas.height;
let speed=5;
let rad=3;
var circle = function (x, y, radius, fillCircle) {
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2, false);
if (fillCircle) {
ctx.fill();
} else {
ctx.stroke();
}
};
let Ball=function()
{
   this.x=width/2;
   this.y=height/2;
   this.speed=speed;
   this.rad=rad;
   this.xSpeed=5;
   this.ySpeed=0;
}
Ball.prototype.move=function(){
   this.x+=this.xSpeed;
   this.y+=this.ySpeed;
   if (this.x<0) {
       this.xSpeed*=(-1);
   } else if(this.x>width){
       this.xSpeed*=(-1);
   }
   if (this.y<0) {
       this.ySpeed*=(-1);
   } else if(this.y>height){
       this.ySpeed*=(-1);
   }
};
Ball.prototype.draw=function(){
   circle(this.x,this.y,this.rad,true);
};

Ball.prototype.setDirection=function(direction){
   if (direction==="up") {
       this.xSpeed=0;
       this.ySpeed=-this.speed;
   }else if (direction === "down") {
this.xSpeed = 0;
this.ySpeed = this.speed;
} else if (direction === "left") {
this.xSpeed = -this.speed;
this.ySpeed = 0;
} else if (direction === "right") {
this.xSpeed = this.speed;
this.ySpeed = 0;
} else if (direction === "stop") {
this.xSpeed = 0;
this.ySpeed = 0;
}
}
let ball=new Ball;
let keyActions={
   32:"stop",
   37:"left",
   38:"up",
   39:"right",
   40:"down"
};
let speeds={
   49:1,
   50:2,
   51:3,
   52:4,
   53:5,
   54:6,
   55:7,
   56:8,
   57:9
};
$("body").keydown(
function(ev){
   let speed=speeds[ev.keyCode];
   if (speed!==undefined) {
       ball.speed=speed;
   }
   if(ev.keyCode===90)
   {
       ball.speed--;
       if (ball.speed<0) {
           ball.speed=1;
       }
   }
   if(ev.keyCode===88)
   {
       ball.speed++;
   }
   if (ev.keyCode===86) {
       ball.rad++;
   }
   if (ev.keyCode===67) {
       ball.rad--;
       if (ball.rad<1) {
           ball.rad=1;
       }
   }
   let direction=keyActions[ev.keyCode];
   ball.setDirection(direction);
}
);
setInterval(
function()
{
ctx.clearRect(0,0,width,height);
ball.draw();
ball.move();
ctx.strokeRect(0,0,width,height);
}
,30  )