function startGame() {
    document.getElementById("score").style.display = ""
    document.getElementById("combo").style.display = ""
    document.getElementById("startButton").style.visibility = 'hidden'
    setupController(gamepad.updatePosition);
    init();
}
