var isStart = false;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var cursor = new Image();
var audio = document.getElementById('audio');
var musicdir = "./audio/sample.mp3";
cursor.src = "./img/cursor.png";

//bg.src = "./img/bg.jpg";
var timesum, timenow, radius, timenext, datanow, tem;
var beginx, beginy, endx, endy, centerx, centery;
var beginRadius = 200.0;

var player = {
    handList: [],
    render: function() {
        /* fetch new hand list */
        this.handList = gamepad.handList;
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

function isPass(num){
    timenext = beatmap.datalist[num][2] - timenow;
    if(beatmap.datalist[beatmap.nextbeat].length == 3 && timenext < -judgeInterval) return false;
    if(beatmap.datalist[beatmap.nextbeat].length >= 5 && timenext < 0 - beatmap.datalist[beatmap.nextbeat][5]) return false;
    return true;
}

function isEnd(num){
    if(beatmap.datalist[num].length == 3 && beatmap.datalist[num][2] - timenow <  -judgeInterval) return true;
    if(beatmap.datalist[num][2] - timenow > 1000) return true;
    return false;
}

beatmap.render = function(){
    timenow = audio.currentTime * 1000;
    if(beatmap.nextbeat == beatmap.datalist.length) return;
    timenext = beatmap.datalist[beatmap.nextbeat][2] - timenow;
    while( (beatmap.nextbeat < beatmap.datalist.length) && !(isPass(beatmap.nextbeat)) ){
	    //beatmap.nextbeat += 1;
        beatMissed();
    }
    tem = beatmap.nextbeat;

    while(tem < beatmap.datalist.length){
        if(isEnd(tem)){
            break;
        }
        if(isPass(tem)){
            datanow = beatmap.datalist[tem];
            if(datanow.length == 3){
                if(timenext > 0){
                    radius = (beginRadius - defaultRadius) * timenext / 1000 + defaultRadius;
                    ctx.beginPath();
                    ctx.arc(datanow[0], datanow[1], radius, 0, 2*Math.PI);
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(datanow[0], datanow[1], defaultRadius, 0, 2*Math.PI);
                ctx.stroke();
            }
            else{

                datanow = beatmap.datalist[tem];

                if(timenext >= 0){
                    radius = (beginRadius - defaultRadius) * timenext / 1000 + defaultRadius;
                    ctx.beginPath();
                    ctx.arc(datanow[0], datanow[1], radius, 0, 2*Math.PI);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(datanow[0], datanow[1], defaultRadius, 0, 2*Math.PI);
                    if( Math.abs(datanow[3] - datanow[6]) >= Math.abs(datanow[3] - datanow[8]) && Math.abs(datanow[4] - datanow[7]) >= Math.abs(datanow[4] - datanow[9]) ){
                        ctx.moveTo(datanow[6], datanow[7]);
                        ctx.lineTo(datanow[8], datanow[9]);
                    }
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(datanow[3], datanow[4], defaultRadius, 0, 2*Math.PI);
                    ctx.stroke();
                }
                else{
                    ctx.beginPath();
                    centerx = datanow[0] + (datanow[3] - datanow[0]) * (0 - timenext)/ datanow[5];
                    centery = datanow[1] + (datanow[4] - datanow[1]) * (0 - timenext)/ datanow[5];
                    ctx.arc(centerx, centery, defaultRadius, 0, 2*Math.PI);
                    ctx.stroke();

                    beginx = datanow[6] - datanow[0] + centerx;
                    beginy = datanow[7] - datanow[1] + centery;
                    if( Math.abs(datanow[3] - beginx) >= Math.abs(datanow[3] - datanow[8]) && Math.abs(datanow[4] - beginy) >= Math.abs(datanow[4] - datanow[9]) ){
                        ctx.beginPath();
                        ctx.moveTo(beginx, beginy);
                        ctx.lineTo(datanow[8], datanow[9]);
                        ctx.stroke();
                    }

                    ctx.beginPath();
                    ctx.arc(datanow[3], datanow[4], defaultRadius, 0, 2*Math.PI);
                    ctx.stroke();

                }
            }
        }

        tem++;
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
