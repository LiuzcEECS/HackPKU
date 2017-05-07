
var canvasW;
var canvasH;
var wavesDiv;

//initialization
function init(){
	resize();
	getBeatmap("seleP - Scarlet Rose -feat.Lily- (smallboat) [Lily Rose].osu");
}

function anime(x,y,t){
	console.log("Animate called");
    waveq.push([x,y,t]);
	wavesDiv = $('.waves-effect');
	wavesDiv[0].className = 'waves-effect';
    var wH = 500;
    var iX = x;
    var iY = y;
    var nX = iX - wH/2;
    var nY = iY - wH/2;

    $("body").offset();
    wavesDiv
	.css({
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
	$("#wave").attr({"width":canvasW,"height":canvasH});
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
