const { prototype } = pc.createScript('OculusTouchInputStateRightExample');

prototype.aPressStart = function () { console.log('aPressStart'); };
prototype.aPressEnd = function () { console.log('aPressEnd'); };
prototype.bPressStart = function () { console.log('bPressStart'); };
prototype.bPressEnd = function () { console.log('bPressEnd'); };
prototype.stickPressStart = function () { console.log('stickPressStart'); };
prototype.stickPressEnd = function () { console.log('stickPressEnd'); };
prototype.indexPressStart = function () { console.log('indexPressStart'); };
prototype.indexPressEnd = function () { console.log('indexPressEnd'); };
prototype.handPressStart = function () { console.log('handPressStart'); };
prototype.handPressEnd = function () { console.log('handPressEnd'); };

prototype.stickXChanged = function () { console.log('stickXChanged'); };
prototype.stickYChanged = function () { console.log('stickYChanged'); };

prototype.aTouchStart = function () { console.log('aTouchStart'); };
prototype.aTouchEnd = function () { console.log('aTouchEnd'); };
prototype.bTouchStart = function () { console.log('bTouchStart'); };
prototype.bTouchEnd = function () { console.log('bTouchEnd'); };
prototype.stickTouchStart = function () { console.log('stickTouchStart'); };
prototype.stickTouchEnd = function () { console.log('stickTouchEnd'); };
prototype.indexTouchStart = function () { console.log('indexTouchStart'); };
prototype.indexTouchEnd = function () { console.log('indexTouchEnd'); };
prototype.handTouchStart = function () { console.log('handTouchStart'); };
prototype.handTouchEnd = function () { console.log('handTouchEnd'); };
prototype.thumbRestTouchStart = function () { console.log('thumbRestTouchStart'); };
prototype.thumbRestTouchEnd = function () { console.log('thumbRestTouchEnd'); };
