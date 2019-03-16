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

Object.defineProperty(prototype, 'gamepad', {
  get () {
    return this._gamepad || null;
  },
  set (value) {
    if (value === this._gamepad) {
      return;
    }
    this._gamepad = value;
    this._onGamepadChanged();
  }
});

prototype.ids = ['xinput'];

prototype.initialize = function () {
  const { GamepadManager } = this._gamepadManagerEntity.script;
  GamepadManager.addController(this);
};

prototype._onGamepadChanged = function () {
  this.enabled = !!this.gamepad;
};

export const base = { prototype, attributes: inheritableAttributes };