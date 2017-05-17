function startGame(mapID) {
    console.log(mapID);
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
            musicdir="src/01/Faded - Alan Walker_ Iselin Solheim [MP3 128kbps].mp3";
            init("01/Alan Walker - Faded (Astarte) [Turtle's Standard].osu");
            break;
        case 2:
            musicdir="src/02/Neru - Terror (D. Mindbreak) mp3.mp3";
            init("02/Neru - Terror (luxoDeh) [Milan-'s Normal].osu");
            break;
        case 3:
            musicdir="src/03/Taketori Hishou.mp3";
            init("03/Dark PHOENiX - Taketori Hishou (KanbeKotori) [Extra].osu");
            break;
        case 4:
            musicdir="src/04/nekoneko.mp3";
            init("04/Nekomura Iroha - Neko Neko Super Fever Night (Suzully) [banvi's Hard].osu");
            break;
        case 5:
            musicdir="src/05/cutverserenadeoflove.mp3";
            init("05/Hotaru - Serenade of Love (- t e n n y a -) [Normal].osu");
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

function showWelcomePage(score,combo){
    $("#score").fadeOut(1000);
    $("#combo").fadeOut(1000);
    $("#title").fadeIn(1000);
    $("#infop").fadeIn(1000);
    $("#link").fadeIn(1000);
    player.performance={
        score:0,
        combo:0,
        maxCombo:0,
        hp:0
    };
    startwithBG('src/defaultBG.jpg');
    ShowInfo("Score:&nbsp;"+score+"<br/>MaxCombo:&nbsp;"+combo);
}
