
var canvasW;
var canvasH;
var canvas;

//initialization
function init(){
	canvasW=document.documentElement.clientWidth;
	canvasH=document.documentElement.clientHeight;
	/*canvas=$("<canvas></canvas>") // create a cover canvas
		.attr({
			"id":"gamingCanvas",
			"width":canvasW,
			"height":canvasH
		})
		.addClass("canvas")
		.appendTo("body")
		.get(0); // get canvas DOM*/

	getBeatmap("Faded_test.mosu");
}

function resize(){
	canvasW=document.documentElement.clientWidth;
	canvasH=document.documentElement.clientHeight;
}

function getBeatmap(filename){
	console.log("ask for "+filename);
	$.get(
		"https://raw.githubusercontent.com/LiuzcEECS/HackPKU/master/src/"+filename,
		parseBeatmap
	);
}
