const { attributes, prototype } = pc.createScript('GamepadDistribution');

attributes.add('_gamepadManagerEntity', {
  type: 'entity',
  title: 'Gamepad Manager Entity',
  description: 'Entity with a Gamepad Manager script attached',
});
 
prototype.postInitialize = function () {
  const { GamepadManager } = this._gamepadManagerEntity.script;
  this._reservationList = this._reservationList || [];
  GamepadManager.registerFunction(this._handleGamepadCountChanged, this);
};

prototype._handleGamepadCountChanged = function () {
  this.recalculate();
};

prototype.reserveGamepad = function (script) {
  if (!this._reservationList) {
    this._reservationList = [script];
  } else {
    this._reservationList.push(script);
  }
  this.recalculate();
}

prototype.recalculate = function () {
  const { _reservationList, _gamepadManagerEntity } = this;
  const { GamepadManager } = _gamepadManagerEntity.script;

  const gamepads = GamepadManager.getGamepads();
  gamepads.forEach((gamepad) => {
    const { pad } = gamepad;
    const filtered = _reservationList.filter((script) => script.ids.indexOf(pad.id) > -1);
    const occurence = gamepads.findIndex((gp) => gp.pad.index === pad.index); // TODO findIndex in filtered?
    const found = filtered[occurence];
    if (!found) {
      return;
    }
    
    found.gamepad = gamepad;
  });
};
/**
var scangamepads = function () {
        var gp = new pc.GamePads();
        //gp.update();
        console.log(gp.poll());
        console.log(gp.poll());
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        console.log('hier', gamepads);
    }; 
 */