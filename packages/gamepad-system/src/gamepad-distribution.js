const { attributes, prototype } = pc.createScript('GamepadDistribution');

attributes.add('_gamepadManagerEntity', {
  type: 'entity',
  title: 'Gamepad Manager Entity',
  description: 'Entity with a Gamepad Manager script attached',
});
 
prototype.postInitialize = function () {
  const { GamepadManager } = this._gamepadManagerEntity.script;
  this._reservationList = [];
  GamepadManager.registerFunction(this._handleGamepadCountChanged, this);
};

prototype._handleGamepadCountChange = function () {
  this.recalculate();
};

prototype.reserveGamepad = function (script) {
  if (!this._reservationList) {
    this._reservationList = [script];
  } else {
    this._reservationList.push(script);
  }
  console.log('reserveGamepad');
  this.recalculate();
}

prototype.recalculate = function () {
  const { _reservationList, _gamepadManagerEntity } = this;
  const { GamepadManager } = _gamepadManagerEntity.script;
  const gamepads = GamepadManager.getGamepads();
  console.log('gamepads', gamepads);
  gamepads.forEach((gamepad) => {
    const found = _reservationList.find((script) => script.id === gamepad.pad.id);
    console.log(gamepad.pad.id, found, _reservationList);
    if (!found) {
      return;
    }
    found.gamepad = gamepad;    
  });
};