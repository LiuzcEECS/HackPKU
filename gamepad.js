function gamepadconnected(e){
    console.log(e);
}
function gamepadgrasp(e){
    console.log("grasp");
}
function gamepadrelease(){
    console.log("release");
}
var defaultX = 200;
var defaultY = 200;
window.addEventListener("GamepadConnected", gamepadconnected);
window.addEventListener("GamepadGrasp", gamepadgrasp);
window.addEventListener("GamepadRelease", gamepadrelease);
var gamepad = {
    isGrab: false,
    x: defaultX,
    y: defaultY,
    updatePosition: function(_x,_y){
        x = _x;
        y = _y;
        console.log(x, y);
    }
}
