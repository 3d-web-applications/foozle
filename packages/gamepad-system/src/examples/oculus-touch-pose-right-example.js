const { attributes, prototype } = pc.createScript('OculusTouchPoseRightExample');

attributes.add('_targetEntity', {
  type: 'entity',
  title: 'Oculus Touch Input Right Entity',
  description: 'Entity with a OculusTouchInputRight script attached',
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

  const { OculusTouchInputRight } = this._targetEntity.script;
  this.enabled = OculusTouchInputRight.enabled;
  OculusTouchInputRight.on(
    'state',
    (enabled) => { this.enabled = enabled; }
  );
  this.OculusTouchInputRight = OculusTouchInputRight;
};

prototype.update = function () {
  const { OculusTouchInputRight } = this;
  const position = OculusTouchInputRight.position();

  if (!position) {
    return;
  }

  const { _offset } = this;
  this._modelEntity.setPosition(
    position[0] + _offset.x,
    position[1] + _offset.y,
    position[2] + _offset.z
  );

  const orientation = OculusTouchInputRight.orientation();
  this._modelEntity.setRotation(
    orientation[0],
    orientation[1],
    orientation[2],
    orientation[3]
  );  
};
