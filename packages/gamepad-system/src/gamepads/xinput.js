import collectAttributes from '../util/collect-attributes';

const { attributes, prototype } = pc.createScript('XInput');

const inheritableAttributes = [];
attributes.add = collectAttributes(
  attributes.add,
  inheritableAttributes,
);

attributes.add('_gamepadManagerEntity', {
  type: 'entity',
  title: 'Gamepad Manager Entity',
  description: 'Entity with a Gamepad Manager script attached',
});

prototype.ids = ['xinput'];

prototype.initialize = function () {
  const { GamepadManager } = this._gamepadManagerEntity.script;
  GamepadManager.addController(this);
};

export const base = { prototype, attributes: inheritableAttributes };