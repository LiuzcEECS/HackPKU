var defaultX = 200;
var defaultY = 200;
var isStart = False;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
//var bgcanvas = document.getElementById("bg");
//var bgctx = canvas.getContext("2d");
var cursor = newImage();
//var bg = newImage();
var audio = document.getElementById('audio");
var musicdir = "./src/sample.mp3";
cursor.src = "./img/cursor.svg";
//bg.src = "./img/bg.jpg";

var player = {
	x: defaultX;
	y: defaultY;
	render: function() {
		this.x, this.y = gamepad.updatePosition();
		ctx.drawImage(cursor,this.x,this.y);
		//this.updatePosition();
	};
};

function renderGame(){
	if(!isStart){	
		isStart = True;
		//bgctx.drawImage(bg,0,0);
	}
	player.render();

}


function start(){
	isStart = True;
	//bgctx.drawImage(bg,0,0);
	audio.src = musicdir;
	audio.start();
}

function end(){
	isStart = False;
}
