const { attributes, prototype } = pc.createScript('Xbox360InputExample');

attributes.add('_xBox360InputEntity', {
  type: 'entity',
  title: 'XBox360 Input Entity',
  description: 'Entity with a XBox 360 Input script attached',
});

Object.defineProperty(prototype, 'state', {
  get () {
    return this._state;
  },
  set (value) {
    const tmp = JSON.stringify(value);
    if (tmp === this._state) {
      return;
    }
    this._state = tmp;
    this._onStateChanged();
  }
});

prototype.initialize = function () {
  this.XBox360Input = this._xBox360InputEntity.script.XBox360Input;
};

prototype.update = function () {
  const { XBox360Input } = this;
  this.state = {
    aButtonPressed: XBox360Input.aButtonPressed(),
    bButtonPressed: XBox360Input.bButtonPressed(),
    xButtonPressed: XBox360Input.xButtonPressed(),
    yButtonPressed: XBox360Input.yButtonPressed(),
    leftBumperPressed: XBox360Input.leftBumperPressed(),
    rightBumperPressed: XBox360Input.rightBumperPressed(),
    leftTriggerPressed: XBox360Input.leftTriggerPressed(),
    rightTriggerPressed: XBox360Input.rightTriggerPressed(),
    backButtonPressed: XBox360Input.backButtonPressed(),
    startButtonPressed: XBox360Input.startButtonPressed(),
    leftAnalogStickPressed: XBox360Input.leftAnalogStickPressed(),
    rightAnalogStickPressed: XBox360Input.rightAnalogStickPressed(),
    dPadUpPressed: XBox360Input.dPadUpPressed(),
    dPadDownPressed: XBox360Input.dPadDownPressed(),
    dPadLeftPressed: XBox360Input.dPadLeftPressed(),
    dPadRightPressed: XBox360Input.dPadRightPressed(),
    // guideButtonPressed: XBox360Input.guideButtonPressed(),
    leftStickX: XBox360Input.leftStickX(),
    leftStickY: XBox360Input.leftStickY(),
    rightStickX: XBox360Input.rightStickX(),
    rightStickY: XBox360Input.rightStickY(),
  };
};

prototype._onStateChanged = function () {
  console.log(this._state);
};
