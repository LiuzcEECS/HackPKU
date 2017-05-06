
var canvasW;
var canvasH;
var wavesDiv = document.getElementById('waves-effect');

//initialization
function init(){
	resize();
	getBeatmap("Alan Walker - Faded (Astarte) [Turtle's Standard].osu");
}

function anime(){
	wavesDiv.className = 'waves-effect';
    var wH = 500;
    var iX = e.pageX - box.offset().left;
    var iY = e.pageY - box.offset().top;
    var nX = iX - wH/2;
    var nY = iY - wH/2;

    wavesDiv.css({
        width: wH,
        height: wH,
        left: nX,
        top: nY
    }).addClass("waves-effect-animation");
}

function resize(){
	canvasW=document.documentElement.clientWidth;
	canvasH=document.documentElement.clientHeight;
	$("#game").attr({"width":canvasW,"height":canvasH});
	beginRadius = canvasW/6;
	defaultRadius = canvasW/30;
	judgeSlideRadius = defaultRadius*2;
}

function getBeatmap(filename){
	console.log("ask for "+filename);
	$.get(
		"https://raw.githubusercontent.com/LiuzcEECS/HackPKU/render/src/"+filename,
		parseBeatmap
	);
}
