import collectAttributes from './util/collect-attributes';

const { attributes, prototype } = pc.createScript('OculusTouchController');

const inheritableAttributes = [];
attributes.add = collectAttributes(
  attributes.add,
  inheritableAttributes,
);

attributes.add('_gamepadDistributionEntity', {
  type: 'entity',
  title: 'Gamepad Distribution Entity',
  description: 'Entity with a Gamepad Distribution script attached',
});

Object.defineProperty(prototype, 'connected', {
  get () {
    return this._connected || false;
  },
  set (value) {
    if (value === this._connected) {
      return;
    }
    this._connected = value;
  }
});

prototype.initialize = function () {
  const { GamepadDistribution } = this._gamepadDistributionEntity.script;
  GamepadDistribution.reserveGamepad(this);
};

export const base = { prototype, attributes: inheritableAttributes };



    /*"RawAxis2D.LThumbstick": "",
    "RawButton.LThumbstick": "PAD_FACE_1",
    "RawButton.Start": "",
    "RawButton.X": "PAD_FACE_4",
    "RawButton.Y": "PAD_L_SHOULDER_1",
    "RawTouch.LThumbRest": "",
    "RawAxis1D.LHandTrigger" : "PAD_FACE_3",
    "RawAxis1D.LIndexTrigger": "PAD_FACE_2"*/