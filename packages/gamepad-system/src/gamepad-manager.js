import { createRegistry } from '@foozle/function-registry';

import { createNumberProperty } from './counter';

const { attributes, prototype } = pc.createScript('GamepadManager');

createNumberProperty(
  '_gamepadCount', prototype, '_onGamepadCountChanged', 0
);

/**
 * Prepare gamepad polling and subscribe for VR enter/exit events. 
 */
prototype.initialize = function() {
  const { gamepads } = this.app;
  if (!gamepads || !gamepads.gamepadsSupported) {
    /**
     * Check if gamepad support is enabled in this project.
     * Check also if Steam is running and occupying gamepads.
     */
    console.error("Gamepad Error");
    this.enabled = false;
    return;
  }

  this._registry = createRegistry();
  this._gamepads = new pc.GamePads();

  var self = this;
    
  /*setInterval(
    function() {
      var pads = self._gamepads.poll();
      self._gamepads.update();
      if (pads.length > 0) {
          console.log("PAD_FACE_1", self._gamepads.isPressed(pc.PAD_1, pc.PAD_FACE_1));
          console.log("PAD_FACE_2", self._gamepads.isPressed(pc.PAD_1, pc.PAD_FACE_2));
          console.log("PAD_FACE_3", self._gamepads.isPressed(pc.PAD_1, pc.PAD_FACE_3));
          console.log("PAD_FACE_4", self._gamepads.isPressed(pc.PAD_1, pc.PAD_FACE_4));
          console.log("PAD_L_SHOULDER_1", self._gamepads.isPressed(pc.PAD_1, pc.PAD_L_SHOULDER_1));
          //console.log("PAD_R_SHOULDER_1", self._gamepads.isPressed(pc.PAD_1, pc.PAD_R_SHOULDER_1));
          console.log("pc.PAD_L_STICK_X", self._gamepads.getAxis(pc.PAD_1, pc.PAD_L_STICK_X));
          console.log("pc.PAD_L_STICK_Y", self._gamepads.getAxis(pc.PAD_1, pc.PAD_L_STICK_Y));
      }
    },
    3000);*/
};

/**
 * Update is changed at runtime.
 */
prototype.update = function (/* dt */) {
  const pads = this.getGamepads();//this._gamepads.poll();
  this._gamepads.update();
  this._gamepadCount = pads.length;
};

prototype.getGamepads = function () {
  return this._gamepads.poll();
};

prototype._onGamepadCountChanged = function () {
  this._registry.notify();
  console.log(this._gamepadCount);
};

prototype.registerFunction = function (fn, scope) {
  if (fn) this._registry.register(fn.bind(scope));
};

prototype.unregisterFunctions = function (fn, scope) {
  if (fn) this._registry.unregister(fn.bind(scope));
};