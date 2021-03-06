var isStart = false;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var cursor = new Image();
var audio = document.getElementById('audio');
var musicdir = "./audio/sample.mp3";
cursor.src = "./img/cursor.png";

//bg.src = "./img/bg.jpg";
var timesum, timenow, radius, timenext, datanow, tem, lastOtherDepth;
var beginx, beginy, endx, endy, centerx, centery;
var queue, waveq = [];
var suoquanColor = "#808080";
var pandingColor = "#50A0BE";
var fillColor = "#A7DEF2";
var strokeColor = "#000000";
var waveColor = fillColor;
var outTime = 500;
var beginRadius;// = 200.0;

var player = {
    handList: [],
    render: function() {
        ctx.strokeStyle = strokeColor;
        /* fetch new hand list */
        this.handList = gamepad.handList;
        /* draw each hand */
        for (hand in this.handList) {
            ctx.beginPath();
            ctx.arc(this.handList[hand].x * canvasW, this.handList[hand].z * canvasW, 10, 0, 2*Math.PI);
            otherDepth = Math.floor(255 * (1 - this.handList[hand].s)).toString(16);
            if (otherDepth.length == 1) {
                otherDepth = "0" + otherDepth;
            }
            //ctx.fillStyle = '#' + otherDepth + 'FF' + otherDepth;
            //ctx.fill();
            ctx.stroke();
        }
    }
};

function isPass(num){
    timenext = beatmap.datalist[num][2] - timenow;
    if(beatmap.datalist[beatmap.nextbeat].length == 3 && timenext < -judgeInterval) return false;
    if(beatmap.datalist[beatmap.nextbeat].length >= 5 && timenext < -judgeInterval - beatmap.datalist[beatmap.nextbeat][5]) return false;
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
    queue = [];
    while(tem < beatmap.datalist.length){
        if(isEnd(tem)){
            break;
        }
        if(isPass(tem)){
            queue.push(tem);
        }

        tem++;
    }

    ctx.strokeStyle = waveColor;
    for(var i = waveq.length - 1 ; i >= 0; i--){
        if(timenow - waveq[i][2] > outTime){
            waveq.pop();
        }
        else{
            ctx.globalAlpha = (outTime - timenow + waveq[i][2]) / outTime;
            radius = 250 * (1 - ctx.globalAlpha);
            ctx.beginPath();
            ctx.arc(waveq[i][0], waveq[i][1], radius, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();
        }
    }

    ctx.globalAlpha = 1.0;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = 10;
    for(var i = queue.length - 1; i >= 0 ; i--){
        tem = queue[i];
        datanow = beatmap.datalist[tem];
        timenext = beatmap.datalist[tem][2] - timenow;
        if(datanow.length == 3){
            ctx.strokeStyle = "#000000";
            ctx.beginPath();
            ctx.arc(datanow[0], datanow[1], defaultRadius, 0, 2*Math.PI);
            ctx.stroke();
            //ctx.fill();

            if(timenext > 0){
                radius = (beginRadius - defaultRadius) * timenext / 1000 + defaultRadius;
                ctx.strokeStyle = suoquanColor;
                ctx.beginPath();
                ctx.arc(datanow[0], datanow[1], radius, 0, 2*Math.PI);
                ctx.stroke();
            }

        }
        else{
            if(timenext >= 0){ // sliding not started yet
                ctx.strokeStyle = "#000000";
                ctx.beginPath();
                ctx.arc(datanow[3], datanow[4], defaultRadius, 0, 2*Math.PI);
                ctx.stroke();
                //ctx.fill();

                if( Math.abs(datanow[3] - datanow[6]) > Math.abs(datanow[3] - datanow[8]) + 1 || Math.abs(datanow[4] - datanow[7]) > Math.abs(datanow[4] - datanow[9]) + 1 ){
                    ctx.beginPath();
                    ctx.moveTo(datanow[6], datanow[7]);
                    ctx.lineTo(datanow[8], datanow[9]);
                    ctx.stroke();
                }

                ctx.strokeStyle=pandingColor;
                ctx.beginPath();
                ctx.arc(datanow[0], datanow[1], defaultRadius, 0, 2*Math.PI);
                ctx.stroke();
                //ctx.fill();

                radius = (beginRadius - defaultRadius) * timenext / 1000 + defaultRadius;
                ctx.strokeStyle = suoquanColor;
                ctx.beginPath();
                ctx.arc(datanow[0], datanow[1], radius, 0, 2*Math.PI);
                ctx.stroke();

            }
            else{ // be sliding


                ctx.strokeStyle="#000000";
                centerx = datanow[0] + (datanow[3] - datanow[0]) * (0 - timenext)/ datanow[5];
                centery = datanow[1] + (datanow[4] - datanow[1]) * (0 - timenext)/ datanow[5];

                ctx.beginPath();
                ctx.arc(datanow[3], datanow[4], defaultRadius, 0, 2*Math.PI);
                ctx.stroke();
                //ctx.fill();

                beginx = datanow[6] - datanow[0] + centerx;
                beginy = datanow[7] - datanow[1] + centery;
                if(timenext > 0 - datanow[5]){
                    if( Math.abs(datanow[3] - beginx) > Math.abs(datanow[3] - datanow[8]) + 1 || Math.abs(datanow[4] - beginy) > Math.abs(datanow[4] - datanow[9]) + 1 ){
                        ctx.beginPath();
                        ctx.moveTo(beginx, beginy);
                        ctx.lineTo(datanow[8], datanow[9]);
                        ctx.stroke();
                    }
                }

                ctx.strokeStyle=pandingColor;
                ctx.beginPath();
                ctx.arc(centerx, centery, defaultRadius, 0, 2*Math.PI);
                ctx.stroke();
                //ctx.fill();

                ctx.beginPath();
                ctx.arc(centerx, centery, judgeSlideRadius, 0, 2*Math.PI);
                ctx.stroke();

                judgeSlide(-timenext,centerx,centery);

            }

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
    ctx.fillStyle = waveColor;
    ctx.lineWidth = 3;
    beatmap.render();
    player.render();

}
var fps=60;
var now;
var then=Date.now();
var interval=1000/fps;
var delta;

function mainLoop() {
    if(audio.ended){
        showWelcomePage(player.performance.hp,player.performance.maxCombo);
        return;
    }
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
