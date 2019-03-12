import { base } from './xinput';
import { extendScript } from '../util/extend-script';
import { XBox360Axes } from './data/xbox360-axes';
import { XBox360Buttons } from './data/xbox360-buttons';

const script = pc.createScript('XBox360Input');
extendScript(script, base);
const { prototype } = script;

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

prototype.ids = ['xinput', 'Xbox 360 Controller (XInput STANDARD GAMEPAD)'];

prototype.initialize = function () {
  this.enabled = false;
  this.super();
};

prototype._onGamepadChanged = function () {
    this._buttons = this.gamepad.pad.buttons;
    this._axes = this.gamepad.pad.axes;
    this.enabled = true;
};

XBox360Buttons.forEach((element) => {
  prototype[element.fn] = function () {
    return this._buttons[element.id].pressed;
  };
});

XBox360Axes.forEach((element) => {
  prototype[element.fn] = function () {
    return this._axes[element.id];
  };
});
