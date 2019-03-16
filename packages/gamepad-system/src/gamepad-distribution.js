const { attributes, prototype } = pc.createScript('GamepadDistribution');

attributes.add('_gamepadManagerEntity', {
  type: 'entity',
  title: 'Gamepad Manager Entity',
  description: 'Entity with a Gamepad Manager script attached',
});
 
prototype.initialize = function () {
  this._gpControllerPool = this._gpControllerPool || [];
  window.addEventListener('gamepadconnected', (e) => this._onGamepadConnected(e.gamepad), true);
  window.addEventListener('gamepaddisconnected', (e) => this._onGamepadDisconnected(e.gamepad), true);
};

prototype.addController = function (script) {
  script.index = -1;
  this._gpControllerPool.push(script);
};

prototype.findController = function (gamepadIndex) {
  return this._gpControllerPool.find(controller => controller.index === gamepadIndex);
};

prototype.selectFreeController = function (gamepadId) {
  return this._gpControllerPool.find(controller => controller.index === -1 && controller.ids.indexOf(gamepadId) > -1);
};

prototype._onGamepadConnected = function (gamepad) {
  const controller = this.selectFreeController(gamepad.id);
  if (!controller) {
    console.error('No available controllers left');
    return;
  }
  controller.index = gamepad.index;
  controller.gamepad = gamepad;
};

prototype._onGamepadDisconnected = function (gamepad) {
  const controller = this.findController(gamepad.index);
  if (!controller) {
    return;
  }
  controller.index = -1;
  controller.gamepad = null;
};
