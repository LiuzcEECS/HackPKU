class Hand {
    constructor(_x, _y, _z, _s) {
        /* x, y, z and grabbing strength */
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.s = _s;
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
            var lastFrame = controller.frame(1);
            /* iterate all hands in current frame */
            for (hand in frame.hands) {
                /* normalize palm position */
                var normalizedPosition = interactionBox.normalizePoint(frame.hands[hand].palmPosition, true);
                /* determine grab */
                var oldHand = lastFrame.hand(frame.hands[hand].id);
                var oldIsGrabbed = (oldHand.pinchStrength >= 0.3);
                var currentIsGrabbed = (frame.hands[hand].pinchStrength >= 0.3);
                if (oldHand.valid) {
                    if (oldIsGrabbed && !currentIsGrabbed) {
                        /* grabbed => not grabbed */
                        onHandRelease(normalizedPosition[0], normalizedPosition[2]);
                    }
                    else if (!oldIsGrabbed && currentIsGrabbed) {
                        /* not grabbed => grabbed */
                        /* TODO: don't use hard coded */
                        onHandGrasp(normalizedPosition[0], normalizedPosition[2]);
                    }
                }
                /* append to hand list */
                results.push(new Hand(normalizedPosition[0], normalizedPosition[1], normalizedPosition[2], frame.hands[hand].grabStrength));
            }
            callback(results);
        }
    });
    controller.connect();
}
