const { attributes, prototype } = pc.createScript('OculusTouchInputRightExample');

attributes.add('_oculusTouchInputRightEntity', {
  type: 'entity',
  title: 'Oculus Touch Input Right Entity',
  description: 'Entity with a OculusTouchInputRight script attached',
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
  const { OculusTouchInputRight } = this._oculusTouchInputRightEntity.script;
  if (!OculusTouchInputRight.enabled) {
    return;
  }
 
  this.state = {
    stickPressed: OculusTouchInputRight.analogStickPressed(),
    indexPressed: OculusTouchInputRight.indexTriggerPressed(),
    handPressed: OculusTouchInputRight.handTriggerPressed(),
    aPressed: OculusTouchInputRight.aButtonPressed(),
    bPressed: OculusTouchInputRight.bButtonPressed(),
  };
};

prototype._onStateChanged = function () {
  console.log(this._state);
};
