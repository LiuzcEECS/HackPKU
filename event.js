
var canvasW;
var canvasH;

//initialization
function init(){
	resize();
	getBeatmap("Faded_test.mosu");
}

function resize(){
	canvasW=document.documentElement.clientWidth;
	canvasH=document.documentElement.clientHeight;
	$("#game").attr({"width":canvasW,"height":canvasH});
	beginRadius = canvasW/6;
	defaultRadius = canvasW/30;
}

function getBeatmap(filename){
	console.log("ask for "+filename);
	$.get(
		"https://raw.githubusercontent.com/LiuzcEECS/HackPKU/master/src/"+filename,
		parseBeatmap
	);
}
