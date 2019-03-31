const { prototype } = pc.createScript('OculusTouchInputStateLeftExample');

prototype.xPressStart = function () { console.log('xPressStart'); };
prototype.xPressEnd = function () { console.log('xPressEnd'); };
prototype.yPressStart = function () { console.log('yPressStart'); };
prototype.yPressEnd = function () { console.log('yPressEnd'); };
prototype.stickPressStart = function () { console.log('stickPressStart'); };
prototype.stickPressEnd = function () { console.log('stickPressEnd'); };
prototype.indexPressStart = function () { console.log('indexPressStart'); };
prototype.indexPressEnd = function () { console.log('indexPressEnd'); };
prototype.handPressStart = function () { console.log('handPressStart'); };
prototype.handPressEnd = function () { console.log('handPressEnd'); };

prototype.stickXChanged = function () { console.log('stickXChanged'); };
prototype.stickYChanged = function () { console.log('stickYChanged'); };

prototype.xTouchStart = function () { console.log('xTouchStart'); };
prototype.xTouchEnd = function () { console.log('xTouchEnd'); };
prototype.yTouchStart = function () { console.log('yTouchStart'); };
prototype.yTouchEnd = function () { console.log('yTouchEnd'); };
prototype.stickTouchStart = function () { console.log('stickTouchStart'); };
prototype.stickTouchEnd = function () { console.log('stickTouchEnd'); };
prototype.indexTouchStart = function () { console.log('indexTouchStart'); };
prototype.indexTouchEnd = function () { console.log('indexTouchEnd'); };
prototype.handTouchStart = function () { console.log('handTouchStart'); };
prototype.handTouchEnd = function () { console.log('handTouchEnd'); };
prototype.thumbRestTouchStart = function () { console.log('thumbRestTouchStart'); };
prototype.thumbRestTouchEnd = function () { console.log('thumbRestTouchEnd'); };
