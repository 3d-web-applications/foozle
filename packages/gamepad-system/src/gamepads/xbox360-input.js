import { base } from './xinput';
import { extendScript } from '../util/extend-script';
import { XBox360Axes } from './xbox360-axes';
import { XBox360Buttons } from './xbox360-buttons';

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

prototype.id = 'Xbox 360 Controller (XInput STANDARD GAMEPAD)'

prototype.initialize = function () {
  this.enabled = false;
  this.super();
};

prototype._onGamepadChanged = function () {
  this.enabled = !!this.gamepad;
  if (this.enabled) {
    this._pad = this.gamepad.pad;
    this._buttons = this.gamepad.pad.buttons;
    // TODO
  }
};

XBox360Buttons.forEach((element) => {
  prototype[element.fn] = function () {
    return this._buttons[element.id].pressed;
  };
});

XBox360Axes.forEach((element) => {
  prototype[element.fn] = function () {
    return this._pad.axes[element.id];
  };
});
