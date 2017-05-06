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
var timesum, timenow, radius, timenext, datanow, tem;
var beginRadius = 200.0;
var defaultRadius = 10.0;

var player = {
    x: defaultX,
    y: defaultY,
    render: function() {
        this.x = gamepad.x;
        this.y = gamepad.y;
        //console.log("called", this.x, this.y);
        this.grabbed = gamepad.grabbed;
        ctx.beginPath();
        ctx.arc(this.x + 200, this.y + 200, 10, 0, 2*Math.PI);
        if (this.grabbed) {
            ctx.fillStyle = 'green';
            ctx.fill();
        }
        ctx.stroke();
        //ctx.drawImage(cursor, this.x, this.y);
        //this.updatePosition();
    }
};

beatmap.render = function(){
    timenow = audio.currentTime * 1000;
    if(beatmap.nextbeat == beatmap.datalist.length) return;
    timenext = beatmap.datalist[beatmap.nextbeat][2] - timenow;
    /*while(timenext < 0){
	    beatmap.nextbeat += 1;
        timenext = beatmap.datalist[beatmap.nextbeat][2] - timenow;
    }*/
    tem = beatmap.nextbeat;
    while(tem < beatmap.datalist.length){
        timenext = beatmap.datalist[tem][2] - timenow;
        if(timenext <= 1000){
            if(timenext >=0){
    	        radius = (beginRadius - defaultRadius) * timenext / 1000 + defaultRadius;
    	        ctx.beginPath();
    	        datanow = beatmap.datalist[tem];
    	        //console.log(datanow[0], datanow[1], radius);
    	        ctx.arc(datanow[0], datanow[1], radius, 0, 2*Math.PI);
                ctx.stroke();

    	        if(datanow.length == 3){
    	            ctx.beginPath();
    	            ctx.arc(datanow[0], datanow[1], defaultRadius, 0, 2*Math.PI);
    	        }
          	    else{
    	        }
                ctx.stroke();
            }
            else{ // late
                if(timenext<=-200){ // over 200 ms not clicked, missed this note
                    // do sth here
                    beatMissed();
                }
            }
            tem++;
        }
	    else{
	        break;
    	}
    }

}

//Main function
function renderGame(){
    if(!isStart){
        isStart = true;
        //bgctx.drawImage(bg,0,0);
    }
    canvas.width = canvas.width;
    beatmap.render();
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
    resize();
    //bgctx.drawImage(bg,0,0);
    audio.src = musicdir;
    timesum = audio.duration;
    audio.play();
    mainLoop();
}

function end(){
    isStart = false;
}
