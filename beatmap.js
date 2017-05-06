var beatmap = {
	width:0,
	height:0,
	datalist:null,
	nextbeat:0 // next note in datalist to beat
};

function stringArrayToIntArray(stringArray){
	var intArray=new Array(stringArray.length);
	for(var i=0;i<stringArray.length;i++)
		intArray[i]=parseInt(stringArray[i]);
	return intArray;
}

function parseStandardOsuMap(osuData){

}

function parseBeatmap(data,status){
	console.log(status);
	if(data){

		console.log(parseStandardOsuMap(data));
		return;

		beatmap.datalist=new Array();
		var beats=data.split("\n");
		for(var i=0;i<beats.length;i++){
			var beat=beats[i].split(",");

			switch(beat.length){
				case 1: // img width
					if(beat[0].length>0){
						beatmap.width=parseInt(beat[0]);
						beatmap.height=beatmap.width/canvasW*canvasH;
						//console.log(beatmap.width,beatmap.height);
					}
					break;
				case 3: // hit,slide
				case 6:
					beatmap.datalist.push(stringArrayToIntArray(beat));
					break;
			}
		}
		console.log(beatmap);
		//start();
	}
}
