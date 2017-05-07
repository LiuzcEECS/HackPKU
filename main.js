function startGame(mapID) {
    $("#score").fadeIn(1000);
    $("#combo").fadeIn(1000);
    $("#title").fadeOut(1000);
    $("#infop").fadeOut(1000);
    $("#link").fadeOut(1000);
    document.body.style.backgroundImage=null;
    //document.getElementById("score").style.display = ""
    //document.getElementById("combo").style.display = ""
    //document.getElementById("startButton").style.visibility = 'hidden'
    setupController(gamepad.updatePosition);
    switch(mapID){
        case 1:
            document.getElementById("myAudio").src="396077 Alan Walker - Faded/Faded - Alan Walker_ Iselin Solheim [MP3 128kbps].mp3";
            init();
            break;
        case 2:
            break;
        case 3:
            break;
    }
}

function ShowInfo(Info){
	var stinfo=document.getElementById("info");
	stinfo.innerHTML=Info;
	stinfo.style.opacity="0.5";
}

function CloseInfo(){
	var stinfo=document.getElementById("info");
	stinfo.style.opacity="0";
}

function SetTitleSize(){
	$("#title").css("font-size",document.body.clientWidth/30);
	$("#infop").css("font-size",document.body.clientWidth/30+0.65);
	$("p.link1").css("font-size",Math.min(document.body.clientWidth/50+5,20));
}
setInterval(SetTitleSize,100);

function startwithBG(imgsrc){
	document.body.style.backgroundImage="url('"+imgsrc+"')";
	var cover=$("<div class='cover' id='cover'></div>");
	$(cover).css("position","absolute");
	$(cover).css("top","0px");
	$(cover).css("left","0px");
	$(cover).css("z-index","9999");
	$(cover).css("width","100%");
	$(cover).css("height","100%");
	$(cover).css("background-color","#ffffff");
	$("body").append(cover);
	$(cover).fadeOut(1000);
}
