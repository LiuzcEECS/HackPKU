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
    x: defaultX,
    y: defaultY,
    grabbed: false,
    updatePosition: function(_x, _y, _grabbed){
        this.x = _x;
        this.y = _y;
        this.grabbed = _grabbed;
    }
}
