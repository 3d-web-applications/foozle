import { base } from './xinput';
import { extendScript } from '../util/extend-script';
// import mapping from './data/gamepad-map.json';
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
};*/