const { attributes, prototype } = pc.createScript('GamepadDistribution');

attributes.add('_gamepadManagerEntity', {
  type: 'entity',
  title: 'Gamepad Manager Entity',
  description: 'Entity with a Gamepad Manager script attached',
});
 
prototype.postInitialize = function () {
  const { GamepadManager } = this._gamepadManagerEntity.script;
  GamepadManager.registerFunction(this._handleGamepadCountChange, this);
};

prototype._handleGamepadCountChange = function () {
  const { _reservationList, _gamepadManagerEntity } = this;
  const { GamepadManager } = _gamepadManagerEntity.script;
  const gamepads = GamepadManager.getGamepads();
  gamepads.forEach((gamepad) => {
    const found = _reservationList.find((script) => script.name === gamepad.pad.name);
    console.log(gamepad.pad.name, found);
    if (!found) {
      return;
    }
    found.gamepad = gamepad;    
  });
};

prototype.reserveGamepad = function (script) {
  if (!this._reservationList) {
    this._reservationList = [script];
    return;
  }
  this._reservationList.push(script);
}