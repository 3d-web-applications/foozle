import { base } from './xinput';
import { extendScript } from '../util/extend-script';
import { XBox360Axes } from './data/xbox360-axes';
import { XBox360Buttons } from './data/xbox360-buttons';

const script = pc.createScript('XBox360Input');
extendScript(script, base);
const { prototype } = script;

prototype.ids = ['xinput', 'Xbox 360 Controller (XInput STANDARD GAMEPAD)'];

prototype.initialize = function () {
  this.enabled = false;
  this.super();
};

XBox360Buttons.forEach((element) => {
  prototype[element.fn] = function () {
    return this.gamepad.buttons[element.id].pressed;
  };
});

XBox360Axes.forEach((element) => {
  prototype[element.fn] = function () {
    return this.gamepad.axes[element.id];
  };
});
