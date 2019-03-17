const { attributes, prototype } = pc.createScript('OculusTouchPoseLeftExample');

attributes.add('_oculusTouchInputLeftEntity', {
  type: 'entity',
  title: 'Oculus Touch Input Left Entity',
  description: 'Entity with a OculusTouchInputLeft script attached',
});

attributes.add('_modelEntity', {
  type: 'entity',
  title: 'Model Entity',
  description: 'Entity with a model component',
});

prototype.initialize = function () {
  const { OculusTouchInputLeft } = this._oculusTouchInputLeftEntity.script;
  this.enabled = OculusTouchInputLeft.enabled;
  OculusTouchInputLeft.on("state", (enabled) => { this.enabled = enabled; });
  setInterval(() => {
    const position = this._oculusTouchInputLeftEntity.script.OculusTouchInputLeft.position();
    this._modelEntity.setLocalPosition(position[0], position[1], position[2]);
  }, 1000);
};

/*prototype.update = function () {
  const position = this._oculusTouchInputLeftEntity.script.OculusTouchInputLeft.position();
  this._modelEntity.setPosition(position[0], position[1], position[2]);
};*/
