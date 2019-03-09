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

/**
 * Update is changed at runtime.
 */
prototype.update = function (/* dt */) {
  const pads = this.getGamepads();
  this._gamepads.update();
  this._gamepadCount = pads.length;
};

prototype.getGamepads = function () {
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