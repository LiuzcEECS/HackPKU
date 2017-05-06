var beatmap = {
	width:0,
	height:0,
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

function parseBeatmap(data,status){
	console.log(status);
	if(data){
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
				case 3: // hit
					beatmap.datalist.push(stringArrayToIntArray(beat));
					break;
				case 6: // slide
					beatmap.datalist.push(stringArrayToIntArray(beat));
                    beatInt = stringArrayToIntArray(beat);
                    var length = Math.sqrt(Math.pow(beatInt[0] - beatInt[3], 2.0) + Math.pow(beatInt[1] - beatInt[4], 2.0));
                    beginx = beatInt[0] + (beatInt[3] - beatInt[0]) * defaultRadius / length;
                    beginy = beatInt[1] + (beatInt[4] - beatInt[1]) * defaultRadius / length;
                    endx = beatInt[0] + (beatInt[3] - beatInt[0]) * (length - defaultRadius) / length;
                    endy = beatInt[1] + (beatInt[4] - beatInt[1]) * (length - defaultRadius) / length;
                    beatmap.datalist[beatmap.datalist.length - 1].push(beginx, beginy, endx, endy);
					break;
			}
		}
		console.log(beatmap);
		start();
	}
}
