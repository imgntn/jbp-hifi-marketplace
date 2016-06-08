(function() {

    var _this;

    Swiper = function() {
        _this = this;
    }

    Swiper.prototype = {
        busy: false,
        preload: function(entityID) {
            this.entityID = entityID;
        },
        unload: function() {

        },
        clickReleaseOnEntity: function() {
            this.createSupplies();
        },
        update: function() {

            if (_this.busy === true) {
                return;
            }

            var position = Entities.getEntityProperties(_this.entityID).position;
            var TRIGGER_THRESHOLD = 0.075;

            var leftHandPosition = MyAvatar.getLeftPalmPosition();
            var rightHandPosition = MyAvatar.getRightPalmPosition();

            var rightDistance = Vec3.distance(leftHandPosition, position)
            var leftDistance = Vec3.distance(rightHandPosition, position)

            if (rightDistance < TRIGGER_THRESHOLD || leftDistance < TRIGGER_THRESHOLD) {
                _this.createSupplies();
                _this.busy = true;
                Script.setTimeout(function() {
                    _this.busy = false;
                }, 2000)
            }
        },
        createSupplies: function() {
            var myProperties = Entities.getEntityProperties(this.entityID);

            Entities.callEntityMethod(myProperties.parentID, "createMarkers");
            Entities.callEntityMethod(myProperties.parentID, "createEraser");

        },

    }
    return new Swiper
})