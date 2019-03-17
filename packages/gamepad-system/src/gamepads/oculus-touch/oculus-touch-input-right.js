import { base } from '../xinput';
import { extendScript } from '../../util/extend-script';
import { OculusTouchAxes } from '../data/oculus-touch-axes';
import { OculusTouchButtonsRight } from '../data/oculus-touch-buttons-right';

const script = pc.createScript('OculusTouchInputRight');
extendScript(script, base);
const { prototype } = script;

prototype.ids = ['Oculus Touch (Right)'];

prototype.initialize = function () {
  this.enabled = false;
  this.super();
};

OculusTouchButtonsRight.forEach((element) => {
  prototype[element.fn] = function () {
    return this.gamepad.buttons[element.id].pressed;
  };
});

OculusTouchAxes.forEach((element) => {
  prototype[element.fn] = function () {
    return this.gamepad.axes[element.id];
  };
});
