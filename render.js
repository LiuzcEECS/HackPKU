var isStart = false;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var cursor = new Image();
var audio = document.getElementById('audio');
var musicdir = "./audio/sample.mp3";
cursor.src = "./img/cursor.png";

var player = {
    handList: [],
    render: function() {
        /* fetch new hand list */
        this.handList = gamepad.handList;
        /* clear canvas */
        canvas.width = canvas.width;
        /* draw each hand */
        for (hand in this.handList) {
            ctx.beginPath();
            ctx.arc(this.handList[hand].x * canvas.width, this.handList[hand].z * canvas.height, 10, 0, 2*Math.PI);
            if (this.handList[hand].isGrabbed) {
                ctx.fillStyle = 'green';
                ctx.fill();
            }
            ctx.stroke();
        }
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
