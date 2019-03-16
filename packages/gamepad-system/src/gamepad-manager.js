const { prototype } = pc.createScript('GamepadManager');

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

  this._gpControllerPool = this._gpControllerPool || [];
  window.addEventListener('gamepadconnected', (e) => this._onGamepadConnected(e.gamepad), true);
  window.addEventListener('gamepaddisconnected', (e) => this._onGamepadDisconnected(e.gamepad), true);
};

prototype.addController = function (script) {
  script.index = -1;
  this._gpControllerPool.push(script);
};

prototype._findController = function (gamepadIndex) {
  return this._gpControllerPool.find(controller => controller.index === gamepadIndex);
};

prototype._selectFreeController = function (gamepadId) {
  return this._gpControllerPool.find(controller => controller.index === -1 && controller.ids.indexOf(gamepadId) > -1);
};

prototype._onGamepadConnected = function (gamepad) {
  const controller = this._selectFreeController(gamepad.id);
  if (!controller) {
    console.error('No available controllers left');
    return;
  }
  controller.index = gamepad.index;
  controller.gamepad = gamepad;
};

prototype._onGamepadDisconnected = function (gamepad) {
  const controller = this._findController(gamepad.index);
  if (!controller) {
    return;
  }
  controller.index = -1;
  controller.gamepad = null;
};
