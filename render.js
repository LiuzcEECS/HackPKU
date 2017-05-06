var isStart = false;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
//var bgcanvas = document.getElementById("bg");
//var bgctx = canvas.getContext("2d");
var cursor = new Image();
//var bg = newImage();
var audio = document.getElementById('audio');
var musicdir = "./src/sample.mp3";
cursor.src = "./img/cursor.svg";
//bg.src = "./img/bg.jpg";

var player = {
    x: defaultX,
    y: defaultY,
    render: function() {
        this.x = gamepad.x;
        this.y = gamepad.y;
        ctx.drawImage(cursor,this.x,this.y);
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

function start(){
    isStart = true;
    //bgctx.drawImage(bg,0,0);
    audio.src = musicdir;
    audio.play();
}

function end(){
    isStart = false;
}
