import { base } from './oculus-touch-controller';
import { extendScript } from './util/extend-script';
import mapping from './data/gamepad-map.json';

const script = pc.createScript('OculusTouchRight');
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
  console.log(this.gamepad.pad.buttons[0].pressed);
  if (this.test !== this.gamepad.pad.buttons[0].pressed) {
    this.test = this.gamepad.pad.buttons[0].pressed;
    console.log(this.test);
  }
  /*console.log('this._button_1', this._button_1);
  console.log('this._button_2', this._button_2);
  console.log('this._button_3', this._button_3);
  console.log('this._button_4', this._button_4);
  console.log('this._button_5', this._button_5);
  console.log('this._button_6', this._button_6);*/
};

prototype._onGamepadChanged = function () {
  this.enabled = !!this.gamepad;
  if (this.enabled) {
    //this._updateMapping();
  }
};

prototype._updateMapping = function () {
  const { map } = this.gamepad;
  map.axes = mapping.axes;
  map.buttons = mapping.buttons;
};