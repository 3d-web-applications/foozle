import { createRegistry } from '@foozle/function-registry';

import { createNumberProperty } from './counter';

const { prototype } = pc.createScript('GamepadManager');

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
};

prototype.update = function (/* dt */) {
  // this._gamepadCount = this.getGamepads().length;
};

prototype.getGamepads = function () {
  this._gamepads.update();
  return this._gamepads.poll();
};

prototype._onGamepadCountChanged = function () {
  this._registry.notify();
};

prototype.registerFunction = function (fn, scope) {
  if (fn) this._registry.register(fn.bind(scope));
};

prototype.unregisterFunctions = function (fn, scope) {
  if (fn) this._registry.unregister(fn.bind(scope));
};