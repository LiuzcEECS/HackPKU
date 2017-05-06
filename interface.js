class Hand {
    constructor(_x, _y, _z, _isGrabbed) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.isGrabbed = _isGrabbed;
    }
}

function setupController(callback) {
    /* set up controller and event loop */
    var controller = new Leap.Controller();
    controller.on("frame", function(frame) {
        if (frame.hands.length > 0) {
            /* there is hand in current frame */
            var interactionBox = frame.interactionBox;
            var results = [];
            /* iterate all hands in current frame */
            for (hand in frame.hands) {
                /* normalize palm position */
                var normalizedPosition = interactionBox.normalizePoint(frame.hands[hand].palmPosition, true);
                /* determine grabbed or not */
                var isGrabbed = (frame.hands[hand].grabStrength === 1.0);
                /* append to hand list */
                results.push(new Hand(normalizedPosition[0], normalizedPosition[1], normalizedPosition[2], isGrabbed));
            }
            callback(results);
        }
    });
    controller.connect();
}
