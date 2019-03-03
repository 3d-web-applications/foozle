import { base } from './xinput';
import { extendScript } from '../util/extend-script';
//import { createNumberProperty } from '../counter';
// import { XBox360Model } from './xbox360-model';
import { createXBox360Model } from './xbox360-model';

const script = pc.createScript('XBox360InputState');
extendScript(script, base);
const { prototype } = script;

/*Object.defineProperty(prototype, 'gamepad', {
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

Object.defineProperty(prototype, 'buttons', {
  get () {
    return this._buttons;
  },
  set (value) {
    if (value === this._buttons) {
      return;
    }
    console.log('change', this._buttons);
  }
});*/

/*createNumberProperty('a', prototype, '', false);
createNumberProperty('b', prototype, '', false);
createNumberProperty('x', prototype, '', false);
createNumberProperty('y', prototype, '', false);
createNumberProperty('leftBumper', prototype, '', false);
createNumberProperty('rightBumper', prototype, '', false);
createNumberProperty('leftTrigger', prototype, '', false);
createNumberProperty('rightTrigger', prototype, '', false);
createNumberProperty('back', prototype, '', false);
createNumberProperty('start', prototype, '', false);
createNumberProperty('leftStick', prototype, '', false);
createNumberProperty('rightStick', prototype, '', false);
createNumberProperty('up', prototype, '', false);
createNumberProperty('down', prototype, '', false);
createNumberProperty('left', prototype, '', false);
createNumberProperty('right', prototype, '', false);
createNumberProperty('leftStickXY', prototype, '', false);
createNumberProperty('rightStickXY', prototype, '', false);*/

prototype.initialize = function () {
  this.super();
  this.enabled = false;

  const model = createXBox360Model();
  console.log(model);
  model.aPressed = () => {console.log('pressed')};
  model.a = true;
  model.a = false;
  model.a = true;
  model.aReleased = () => {console.log('released')};
  model.a = false;
  model.stickRightXChanged = () => {console.log('stickX changed');}
  model.stickRightX = 0.5;
};

prototype._onGamepadChanged = function () {
  this.enabled = !!this.gamepad;
  if (this.enabled) {
    this._pad = this.gamepad.pad;
    this._buttons = this.gamepad.pad.buttons;
    // TODO
  }
};

prototype.update = function () {
  this.buttons = this._buttons;
  /*this.ABC = this._pad.axes[0];
  this.ABC = this._pad.axes[1];
  this.ABC = this._pad.axes[2];
  this.ABC = this._pad.axes[3];*/
};

/*
prototype.aButtonPressed = function () {
  return this._buttons[0].pressed;
};

prototype.bButtonPressed = function () {
  return this._buttons[1].pressed;
};

prototype.xButtonPressed = function () {
  return this._buttons[2].pressed;
};

prototype.yButtonPressed = function () {
  return this._buttons[3].pressed;
};

prototype.leftBumperPressed = function () {
  return this._buttons[4].pressed;
};

prototype.rightBumperPressed = function () {
  return this._buttons[5].pressed;
};

prototype.leftTriggerPressed = function () {
  return this._buttons[6].pressed;
};

prototype.rightTriggerPressed = function () {
  return this._buttons[7].pressed;
};

prototype.backButtonPressed = function () {
  return this._buttons[8].pressed;
};

prototype.startButtonPressed = function () {
  return this._buttons[9].pressed;
};

prototype.leftAnalogStickPressed = function () {
  return this._buttons[10].pressed;
};

prototype.rightAnalogStickPressed = function () {
  return this._buttons[11].pressed;
};

prototype.dPadUpPressed = function () {
  return this._buttons[12].pressed;
};

prototype.dPadDownPressed = function () {
  return this._buttons[13].pressed;
};

prototype.dPadLeftPressed = function () {
  return this._buttons[14].pressed;
};

prototype.dPadRightPressed = function () {
  return this._buttons[15].pressed;
};

prototype.guideButtonPressed = function () {
  throw new Error('Vendor button is not supported');
};

prototype.leftStickX = function () {
  return this._pad.axes[0];
};

prototype.leftStickY = function () {
  return this._pad.axes[1];
};

prototype.rightStickX = function () {
  return this._pad.axes[2];
};

prototype.rightStickY = function () {
  return this._pad.axes[3];
};
*/