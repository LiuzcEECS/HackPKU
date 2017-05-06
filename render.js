var isStart = false;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
//var bgcanvas = document.getElementById("bg");
//var bgctx = canvas.getContext("2d");
var cursor = new Image();
//var bg = newImage();
var audio = document.getElementById('audio');
var musicdir = "./src/sample.mp3";
cursor.src = "./img/cursor.png";
//bg.src = "./img/bg.jpg";

var player = {
    x: defaultX,
    y: defaultY,
    render: function() {
        this.x = gamepad.x;
        this.y = gamepad.y;
        console.log("called", this.x, this.y);
        canvas.width = canvas.width;
        ctx.beginPath();
        ctx.arc(this.x + 200, this.y + 200, 10, 0, 2*Math.PI);
        ctx.stroke();
        //ctx.drawImage(cursor, this.x, this.y);
        //this.updatePosition();
    }
};

function renderGame(){
    if(!isStart){	
        isStart = true;
        //bgctx.drawImage(bg,0,0);
    }
    player.render();

}
var fps=60;
var now;
var then=Date.now();
var interval=1000/fps;
var delta;

function mainLoop() {
    requestAnimationFrame(mainLoop);
    now=Date.now();
    delta=now-then;
    if(delta>interval){
        then=now-(delta%interval);
        renderGame();
    }
}

function start(){
    isStart = true;
    //bgctx.drawImage(bg,0,0);
    audio.src = musicdir;
    audio.play();
    mainLoop();
}

function end(){
    isStart = false;
}
