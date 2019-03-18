const { attributes, prototype } = pc.createScript('OculusTouchPoseRightExample');

attributes.add('_oculusTouchInputRightEntity', {
  type: 'entity',
  title: 'Oculus Touch Input Right Entity',
  description: 'Entity with a OculusTouchInputRight script attached',
});

attributes.add('_modelEntity', {
  type: 'entity',
  title: 'Model Entity',
  description: 'Entity with a model component',
});

prototype.initialize = function () {
  const { OculusTouchInputRight } = this._oculusTouchInputRightEntity.script;
  this.enabled = OculusTouchInputRight.enabled;
  OculusTouchInputRight.on("state", (enabled) => { this.enabled = enabled; });
};

prototype.update = function () {
  const position = this._oculusTouchInputRightEntity.script.OculusTouchInputRight.position();
  this._modelEntity.setPosition(position[0], position[1], position[2]);
};
