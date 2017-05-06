var judgeInterval=200;
player.performance={
	score:0,
	combo:0,
	maxCombo:0,
	hp:10
};

function onHandGrasp(x,y){
	var timenow=audio.currentTime*1000;
	if(beatmap.nextbeat==beatmap.datalist.length)return;
	var datanow=beatmap.datalist[beatmap.nextbeat];
	var deltaT=datanow[2]-timenow;

	console.log("deltaT="+deltaT);
	if(deltaT>=200)return; // not considered as clicking this yet
	if(deltaT<=-200)return; // handled by render timer

	var sqrDist=(x-datanow[0])*(x-datanow[0])+(y-datanow[1])*(y-datanow[1]);
	if(sqrDist>defaultRadius*defaultRadius)return; // out of boundary

	beatmap.nextbeat += 1;
	player.performance.combo++;
	if(player.performance.maxCombo<player.performance.combo)
		player.performance.maxCombo=player.performance.combo;
	console.log("HP="+player.performance.hp+" Combo="+player.performance.combo);
}

function onHandRelease(x,y){

}

function beatMissed(){
	console.log("Missed");
	player.performance.hp--;
	beatmap.nextbeat+=1;
	player.performance.combo=0;
}

//================================= Caller =============================
function onMouseDown(event){
	onHandGrasp(event.clientX,event.clientY);
}

function onMouseUp(event){
	onHandRelease(event.clientX,event.clientY);
}
