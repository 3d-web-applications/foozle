import { base } from './xinput';
import { extendScript } from '../util/extend-script';
// import mapping from './data/gamepad-map.json';

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

prototype.initialize = function () {
  this.super();
  this.enabled = false;

  this.test = false;
};

prototype.update = function () {
  // console.log(this.gamepad.pad.buttons[0].pressed);
  if (this.test !== this.gamepad.pad.buttons[0].pressed) {
    this.test = this.gamepad.pad.buttons[0].pressed;
    // console.log(this.test);
  }
};

prototype._onGamepadChanged = function () {
  this.enabled = !!this.gamepad;
  if (this.enabled) {
    // TODO
  }
};

prototype.aButtonPressed = function () {
  return this.gamepad.pad.buttons[0].pressed;
}

prototype.bButtonPressed = function () {
  return this.gamepad.pad.buttons[1].pressed;
}

prototype.xButtonPressed = function () {
  return this.gamepad.pad.buttons[2].pressed;
}

prototype.yButtonPressed = function () {
  return this.gamepad.pad.buttons[3].pressed;
}

prototype.leftBumperPressed = function () {
  return this.gamepad.pad.buttons[4].pressed;
}

prototype.rightBumperPressed = function () {
  return this.gamepad.pad.buttons[5].pressed;
}

prototype.leftTriggerPressed = function () {
  return this.gamepad.pad.buttons[6].pressed;
}

prototype.rightTriggerPressed = function () {
  return this.gamepad.pad.buttons[7].pressed;
}

prototype.backButtonPressed = function () {
  return this.gamepad.pad.buttons[8].pressed;
}

prototype.startButtonPressed = function () {
  return this.gamepad.pad.buttons[9].pressed;
}

prototype.leftAnalogStickPressed = function () {
  return this.gamepad.pad.buttons[10].pressed;
}

prototype.rightAnalogStickPressed = function () {
  return this.gamepad.pad.buttons[11].pressed;
}

prototype.dPadUpPressed = function () {
  return this.gamepad.pad.buttons[12].pressed;
}

prototype.dPadDownPressed = function () {
  return this.gamepad.pad.buttons[13].pressed;
}

prototype.dPadLeftPressed = function () {
  return this.gamepad.pad.buttons[14].pressed;
}

prototype.dPadRightPressed = function () {
  return this.gamepad.pad.buttons[15].pressed;
}

prototype.guideButtonPressed = function () {
  throw new Error('Vendor button is not supported');
}

prototype.leftStickX = function () {
  return this.gamepad.pad.axes[0];
}

prototype.leftStickY = function () {
  return this.gamepad.pad.axes[1];
}

prototype.rightStickX = function () {
  return this.gamepad.pad.axes[2];
}

prototype.rightStickY = function () {
  return this.gamepad.pad.axes[3];
}