const { prototype } = pc.createScript('OculusTouchInputStateLeftExample');

prototype.xPressed = function () { console.log('xPressed'); };
prototype.xReleased = function () { console.log('xReleased'); };
prototype.yPressed = function () { console.log('yPressed'); };
prototype.yReleased = function () { console.log('yReleased'); };

prototype.stickPressed = function () { console.log('stickPressed'); };
prototype.stickReleased = function () { console.log('stickReleased'); };
prototype.indexPressed = function () { console.log('indexPressed'); };
prototype.indexReleased = function () { console.log('indexReleased'); };
prototype.handPressed = function () { console.log('handPressed'); };
prototype.handReleased = function () { console.log('handReleased'); };
prototype.thumbRestTouchStart = function () { console.log('thumbRestTouchStart'); };
prototype.thumbRestTouchEnd = function () { console.log('thumbRestTouchEnd'); };

prototype.stickXChanged = function () { console.log('stickXChanged'); };
prototype.stickYChanged = function () { console.log('stickYChanged'); };