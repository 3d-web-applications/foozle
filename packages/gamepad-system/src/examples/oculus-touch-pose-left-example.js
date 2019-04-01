const { attributes, prototype } = pc.createScript('OculusTouchPoseLeftExample');

attributes.add('_targetEntity', {
  type: 'entity',
  title: 'Oculus Touch Input Left Entity',
  description: 'Entity with a OculusTouchInputLeft script attached',
});

attributes.add('_modelEntity', {
  type: 'entity',
  title: 'Model Entity',
  description: 'Entity with a model component',
});
    
attributes.add('_offset', {
  type: 'vec3',
  title: 'Offset',
  default: [0, 3.4, 0],
  description: ''
});

prototype.initialize = function () {
  const { vr } = this.app;
  if (!vr || !vr.display) {
    console.error('VR not supported');
    this.enabled = false;
    return;
  }

  const { OculusTouchInputLeft } = this._targetEntity.script;
  this.enabled = OculusTouchInputLeft.enabled;
  OculusTouchInputLeft.on(
    'state',
    (enabled) => { this.enabled = enabled; }
  );
  this.OculusTouchInputLeft = OculusTouchInputLeft;
};

prototype.update = function () {
  const { OculusTouchInputLeft } = this;
  const position = OculusTouchInputLeft.position();

  if (!position) {
    return;
  }

  const { _offset } = this;
  this._modelEntity.setPosition(
    position[0] + _offset.x,
    position[1] + _offset.y,
    position[2] + _offset.z
  );

  const orientation = OculusTouchInputLeft.orientation();
  this._modelEntity.setRotation(
    orientation[0],
    orientation[1],
    orientation[2],
    orientation[3]
  );
};
