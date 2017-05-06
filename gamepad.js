function gamepadconnected(e){
	console.log(e);
}
function gamepadgrasp(e){
	console.log("grasp");
}
function gamepadrelease(){
	console.log("release");
}
windows.addEventListener("GamepadConnected", gamepadconnected);
windows.addEventListener("GamepadGrasp", gamepadgrasp);
windows.addEventListener("GamepadRelease", gamepadrelease);
var gamepad = {
	isGrab = False;
	x = defaultX;
	y = defaultY;
	updatePosition = function(_x,_y){
		x = _x;
		y = _y;
	}
}
