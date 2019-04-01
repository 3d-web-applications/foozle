import { base } from '../xinput';
import { extendScript } from '../../util/extend-script';
import { OculusTouchAxes } from '../data/oculus-touch-axes';
import { OculusTouchButtonsLeft } from '../data/oculus-touch-buttons-left';

const script = pc.createScript('OculusTouchInputLeft');
extendScript(script, base);
const { prototype } = script;

prototype.ids = ['Oculus Touch (Left)'];

prototype.initialize = function () {
  this.enabled = false;
  this.super();
};

OculusTouchButtonsLeft.forEach((element) => {
  const propertyName = (element.fn.indexOf('Touched') > -1) ? 'touched' : 'pressed';

  prototype[element.fn] = function () {
    return this.gamepad.buttons[element.id][propertyName];
  };
});

OculusTouchAxes.forEach((element) => {
  prototype[element.fn] = function () {
    return this.gamepad.axes[element.id];
  };
});

prototype.angularAcceleration = function () {
  return this.gamepad.pose.angularAcceleration;
};

prototype.angularVelocity = function () {
  return this.gamepad.pose.angularVelocity;
};

prototype.linearAcceleration = function () {
  return this.gamepad.pose.linearAcceleration;
};

prototype.linearVelocity = function () {
  return this.gamepad.pose.linearVelocity;
};

prototype.orientation = function () {
  return this.gamepad.pose.orientation;
};

prototype.position = function () {
  return this.gamepad.pose.position;
};