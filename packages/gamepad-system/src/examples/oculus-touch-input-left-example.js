const { attributes, prototype } = pc.createScript('OculusTouchInputLeftExample');

attributes.add('_oculusTouchInputLeftEntity', {
  type: 'entity',
  title: 'Oculus Touch Input Left Entity',
  description: 'Entity with a OculusTouchInputLeft script attached',
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

prototype.update = function () {
  const { OculusTouchInputLeft } = this._oculusTouchInputLeftEntity.script;
  if (!OculusTouchInputLeft.enabled) {
    return;
  }
 
  this.state = {
    stickPressed: OculusTouchInputLeft.analogStickPressed(),
    indexPressed: OculusTouchInputLeft.indexTriggerPressed(),
    handPressed: OculusTouchInputLeft.handTriggerPressed(),
    yPressed: OculusTouchInputLeft.xButtonPressed(),
    xPressed: OculusTouchInputLeft.yButtonPressed(),
  };
};

prototype._onStateChanged = function () {
  console.log(this._state);
};
