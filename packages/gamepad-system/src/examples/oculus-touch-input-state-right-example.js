const { prototype } = pc.createScript('OculusTouchInputStateRightExample');

prototype.aPressed = function () { console.log('aPressed'); };
prototype.aReleased = function () { console.log('aReleased'); };
prototype.bPressed = function () { console.log('bPressed'); };
prototype.bReleased = function () { console.log('bReleased'); };

prototype.stickPressed = function () { console.log('stickPressed'); };
prototype.stickReleased = function () { console.log('stickReleased'); };
prototype.indexPressed = function () { console.log('indexPressed'); };
prototype.indexReleased = function () { console.log('indexReleased'); };
prototype.handPressed = function () { console.log('handPressed'); };
prototype.handReleased = function () { console.log('handReleased'); };

prototype.stickXChanged = function () { console.log('stickXChanged'); };
prototype.stickYChanged = function () { console.log('stickYChanged'); };