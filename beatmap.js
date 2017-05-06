var beatmap = {
	width:512, // osu! ref.
	height:384,
	datalist:null,
	nextbeat:0 // next note in datalist to beat
};
var defaultRadius = 10.0;
function stringArrayToIntArray(stringArray){
	var intArray=new Array(stringArray.length);
	for(var i=0;i<stringArray.length;i++)
		intArray[i]=parseInt(stringArray[i]);
	return intArray;
}

function parseStandardOsuMap(osuData){
	beatmap.datalist=new Array();
	var mapInfo=osuData.split("\n");
	//console.log(mapInfo);

	// get BPM, naive method
	var BPM=100;
	for(var i=0;i<mapInfo.length;i++){
		if(mapInfo[i]=="[TimingPoints]"){
			BPM=60000/parseFloat(mapInfo[i+1].split(",")[1]);
			break;
		}
	}

	// get Slider Multiplier
	var sliderMultiplier=1;
	for(var i=0;i<mapInfo.length;i++){
		if(mapInfo[i].slice(0,17)=="SliderMultiplier:"){
			sliderMultiplier=parseFloat(mapInfo[i].split(":")[1]);
			break;
		}
	}

	// get items
	var startPos; // where item data starts
	for(startPos=0;startPos<mapInfo.length;startPos++){
		if(mapInfo[startPos]=="[HitObjects]"){
			break;
		}
	}

	var ratioW=canvasW/beatmap.width;
	var ratioH=canvasH/beatmap.height;
	var isWidthFit=ratioW<ratioH;
	var ratioB=isWidthFit?ratioW:ratioH;

	for(var i=startPos+1;i<mapInfo.length;i++){
		var hitItem=mapInfo[i];
		if(hitItem.length==0)break;

		//console.log(hitItem);
		var itemParams=hitItem.split(",");
		var startParams=[
		parseInt(itemParams[0])*ratioB,
		parseInt(itemParams[1])*ratioB,
		parseInt(itemParams[2])];

		if(itemParams.length>7){ // slide
			// get ending point
			var coords=itemParams[5].split("|");
			var lastCoordStr=coords[coords.length-1].split(":");
			var lastCoordX=parseInt(lastCoordStr[0])*ratioB;
			var lastCoordY=parseInt(lastCoordStr[1])*ratioB;

			// get duration
			var slideLength=parseFloat(itemParams[7]);
			var slideTime=slideLength*(600/BPM)/sliderMultiplier;

			startParams.push(lastCoordX,lastCoordY,slideTime);
            beatInt = startParams;
            var length = Math.sqrt(Math.pow(beatInt[0] - beatInt[3], 2.0) + Math.pow(beatInt[1] - beatInt[4], 2.0));
            beginx = beatInt[0] + (beatInt[3] - beatInt[0]) * defaultRadius / length;
            beginy = beatInt[1] + (beatInt[4] - beatInt[1]) * defaultRadius / length;
            endx = beatInt[0] + (beatInt[3] - beatInt[0]) * (length - defaultRadius) / length;
            endy = beatInt[1] + (beatInt[4] - beatInt[1]) * (length - defaultRadius) / length;
            startParams.push(beginx, beginy, endx, endy);
		}

		beatmap.datalist.push(startParams);
	}
}

function parseBeatmap(data,status){
	console.log(status);
	if(data){
		parseStandardOsuMap(data);
		start();
	}
}
