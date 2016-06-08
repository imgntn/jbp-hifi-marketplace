(function() {

    var _this;


    Whiteboard = function() {
        _this = this;
    }

    Whiteboard.prototype = {
        preload: function(entityID) {
            this.entityID = entityID;
            this.setup();
        },
        unload: function() {

        },
        setup: function() {

            var props = Entities.getEntityProperties(_this.entityID);
            this.spawnRotation = Quat.safeEulerAngles(props.rotation);
            this.spawnPosition = props.position;
            this.orientation = Quat.fromPitchYawRollDegrees(spawnRotation.x, spawnRotation.y, spawnRotation.z);
            this.markerRotation = Quat.fromVec3Degrees({
                x: spawnRotation.x + 10,
                y: spawnRotation.y - 90,
                z: spawnRotation.z
            });

        },
        createMarkers: function() {
            var modelURLS = [
                "http://hifi-content.s3.amazonaws.com/Examples%20Content/production/whiteboard/marker-blue.fbx",
                "http://hifi-content.s3.amazonaws.com/Examples%20Content/production/whiteboard/marker-red.fbx",
                "http://hifi-content.s3.amazonaws.com/Examples%20Content/production/whiteboard/marker-black.fbx",
            ];

            var markerPosition = Vec3.sum(spawnPosition, Vec3.multiply(Quat.getFront(this.orientation), -0.1));

            createMarker(modelURLS[0], markerPosition, {
                red: 10,
                green: 10,
                blue: 200
            });

            markerPosition = Vec3.sum(markerPosition, Vec3.multiply(-0.2, Quat.getFront(this.orientation)));
            createMarker(modelURLS[1], markerPosition, {
                red: 200,
                green: 10,
                blue: 10
            });

            markerPosition = Vec3.sum(markerPosition, Vec3.multiply(0.4, Quat.getFront(this.orientation)));
            createMarker(modelURLS[2], markerPosition, {
                red: 10,
                green: 10,
                blue: 10
            });
        },
        createMarker:function(modelURL, markerPosition, markerColor) {

            var markerProperties = {
                type: "Model",
                modelURL: modelURL,
                rotation: this.markerRotation,
                shapeType: "box",
                name: "hifi_model_marker",
                dynamic: true,
                gravity: {
                    x: 0,
                    y: -5,
                    z: 0
                },
                velocity: {
                    x: 0,
                    y: -0.1,
                    z: 0
                },
                position: markerPosition,
                dimensions: {
                    x: 0.027,
                    y: 0.027,
                    z: 0.164
                },
                script: MARKER_SCRIPT_URL,
                userData: JSON.stringify({
                    'hifiHomeKey': {
                        'reset': true
                    },
                    originalPosition: markerPosition,
                    originalRotation: this.markerRotation,
                    markerColor: markerColor,
                    wearable: {
                        joints: {
                            RightHand: [{
                                x: 0.001,
                                y: 0.139,
                                z: 0.050
                            }, {
                                x: -0.73,
                                y: -0.043,
                                z: -0.108,
                                w: -0.666
                            }],
                            LeftHand: [{
                                x: 0.007,
                                y: 0.151,
                                z: 0.061
                            }, {
                                x: -0.417,
                                y: 0.631,
                                z: -0.389,
                                w: -0.525
                            }]
                        }
                    }
                })
            }

            var marker = Entities.addEntity(markerProperties);

        },
        createEraser: function() {
            var ERASER_MODEL_URL = "atp:/whiteboard/eraser-2.fbx";

            var eraserPosition = Vec3.sum(spawnPosition, Vec3.multiply(Quat.getFront(whiteboardRotation), -0.1));
            eraserPosition = Vec3.sum(eraserPosition, Vec3.multiply(-0.5, Quat.getRight(whiteboardRotation)));
            var eraserRotation = this.markerRotation;

            var eraserProps = {
                type: "Model",
                name: "home_model_whiteboardEraser",
                modelURL: ERASER_MODEL_URL,
                position: eraserPosition,
                script: ERASER_SCRIPT_URL,
                shapeType: "box",
                dimensions: {
                    x: 0.0858,
                    y: 0.0393,
                    z: 0.2083
                },
                rotation: eraserRotation,
                dynamic: true,
                gravity: {
                    x: 0,
                    y: -10,
                    z: 0
                },
                velocity: {
                    x: 0,
                    y: -0.1,
                    z: 0
                },
                userData: JSON.stringify({
                    'hifiHomeKey': {
                        'reset': true
                    },
                    originalPosition: eraserPosition,
                    originalRotation: eraserRotation,
                    wearable: {
                        joints: {
                            RightHand: [{
                                x: 0.020,
                                y: 0.120,
                                z: 0.049
                            }, {
                                x: 0.1004,
                                y: 0.6424,
                                z: 0.717,
                                w: 0.250
                            }],
                            LeftHand: [{
                                x: -0.005,
                                y: 0.1101,
                                z: 0.053
                            }, {
                                x: 0.723,
                                y: 0.289,
                                z: 0.142,
                                w: 0.610
                            }]
                        }
                    }
                })
            }
        }

    }


    return new Whiteboard();
})