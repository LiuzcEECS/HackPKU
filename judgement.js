var judgeInterval=200;
var judgeSlideRadius=300;
player.performance={
	score:0,
	combo:0,
	maxCombo:0,
	hp:10
};

function onHandGrasp(x_,y_){

	
	x=x_*canvasW;
	y=y_*canvasW;

	/*if(player.handList.length==0)return;

	var playerX=player.handList[0].x*canvasW;
	var playerY=player.handList[0].z*canvasW;

	//console.log(x,y,playerX,playerY);

	ctx.strokeStyle="#ff0000";
    ctx.beginPath();
    ctx.arc(playerX, playerY, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.strokeStyle="#000000";*/

	var timenow=audio.currentTime*1000;
	if(beatmap.nextbeat==beatmap.datalist.length)return;
	var datanow=beatmap.datalist[beatmap.nextbeat];
	var deltaT=datanow[2]-timenow;

	//console.log(x,y,datanow[0],datanow[1]);

	//console.log("deltaT="+deltaT);
	if(deltaT>=judgeInterval)return; // not considered as clicking this yet
	if(deltaT<=-judgeInterval)return; // handled by render timer

	var sqrDist=(x-datanow[0])*(x-datanow[0])+(y-datanow[1])*(y-datanow[1]);
	if(sqrDist>defaultRadius*defaultRadius)return; // out of boundary

	if(datanow.length==3) // is a single hit
		beatHit(); // already hit
}

function onHandRelease(x,y){

}

function beatMissed(){
	console.log("Missed");
	player.performance.hp--;
	beatmap.nextbeat+=1;
	player.performance.combo=0;
}

function beatHit(){
	console.log("Hit");
	console.log("HP="+player.performance.hp+" Combo="+player.performance.combo);
	beatmap.nextbeat+=1;
	player.performance.combo++;
	if(player.performance.maxCombo<player.performance.combo)
		player.performance.maxCombo=player.performance.combo;
}

function judgeSlide(time,prX,prY){

	var datanow=beatmap.datalist[beatmap.nextbeat];
	if(datanow.length==3)return;

	if(player.handList.length==0){
		beatMissed();
		return;
	}

	var playerX=player.handList[0].x*canvasW;
	var playerY=player.handList[0].z*canvasW;

	//console.log(prX,prY,playerX,playerY);

	if(time>datanow[6]){ // no error to the end
		beatHit();
	}
	else{ // still sliding
		var sqrDist=(prX-playerX)*(prX-playerX)+(prY-playerY)*(prY-playerY);
		if(sqrDist<=judgeSlideRadius*judgeSlideRadius){ // in safe range
			return; // continue;
		}
		else{ // out of slide range
			beatMissed();
		}
	}
}

//================================= Caller =============================
function onMouseDown(event){
	player.grabbed=true;
	onHandGrasp(event.clientX/canvasW,event.clientY/canvasH);
}

function onMouseUp(event){
	player.grabbed=false;
	onHandRelease(event.clientX/canvasW,event.clientY/canvasH);
}

function onMouseMove(event){
	player.x=event.clientX;
	player.y=event.clientY;
}
