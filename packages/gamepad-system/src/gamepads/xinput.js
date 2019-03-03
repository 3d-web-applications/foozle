import collectAttributes from '../util/collect-attributes';

const { attributes, prototype } = pc.createScript('XInput');

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

prototype.id = 'xinput'

prototype.initialize = function () {
  const { GamepadDistribution } = this._gamepadDistributionEntity.script;
  GamepadDistribution.reserveGamepad(this);
};

export const base = { prototype, attributes: inheritableAttributes };