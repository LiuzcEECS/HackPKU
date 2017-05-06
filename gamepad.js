function gamepadconnected(e){
    console.log(e);
}
function gamepadgrasp(e){
    console.log("grasp");
}
function gamepadrelease(){
    console.log("release");
}
window.addEventListener("GamepadConnected", gamepadconnected);
window.addEventListener("GamepadGrasp", gamepadgrasp);
window.addEventListener("GamepadRelease", gamepadrelease);

var gamepad = {
    handList: [],
    updatePosition: function(_newHands){
        gamepad.handList = _newHands;
    }
}
