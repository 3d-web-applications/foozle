import { hasSomeInvalidAttribute } from '@foozle/precondition-check';

import { OculusTouchAxes } from '../data/oculus-touch-axes';
import { OculusTouchButtonsRight } from '../data/oculus-touch-buttons-right';
import { createGamepadModel } from '../gamepad-model';

const { attributes, prototype } = pc.createScript('OculusTouchInputRightState');

attributes.add('_mapping', {
  type: 'asset',
  assetType: 'json',
  title: 'Mapping',
  description: 'Controller mapping',
});

attributes.add('_handlerEntities', {
  type: 'entity',
  array: true,
  title: 'Handlers',
  description: 'Entity with a script handling button presse and button release events',
});

attributes.add('_deadZone', {
  type: 'number',
  default: 0.25,
  title: 'Dead Zone',
  description: 'Specifies which changes of analog sticks are not captured',
});

prototype.initialize = function () {
  const { _mapping, _handlerEntities } = this;
  
  if (hasSomeInvalidAttribute(_mapping, _handlerEntities)) {
    this.enabled = false;
    console.error('Initialization error');
    return;
  }

  this._array = [];
  const { OculusTouchInputRight } = this.entity.script;

  // mirror state of XBox360Input script and listen for changes
  this.enabled = OculusTouchInputRight.enabled;
  OculusTouchInputRight.on("state", (enabled) => { this.enabled = enabled;} );

  // used to hold last states of buttons and analog sticks
  const model = createGamepadModel(OculusTouchButtonsRight, OculusTouchAxes, this._deadZone);

  // get subset of observerable states
  const controls = [...OculusTouchButtonsRight, ...OculusTouchAxes];
  const hasEntry = (name) => controls.some((entry) => name === entry.name);
  const subset = _mapping.resources.filter((element) => hasEntry(element.name));
  
  // allow polling for a specific button/stick + bind handlers to process state changes
  subset.forEach((element) => {
    const {
      name, defaultValue, cbPressed, cbReleased,
      cbChanged, entityId, scriptName,
    } = element;

    model[name] = defaultValue;
    const targetScript = _handlerEntities[entityId].script[scriptName];
    if (cbPressed) model[cbPressed] = targetScript[cbPressed];
    if (cbReleased) model[cbReleased] = targetScript[cbReleased];
    if (cbChanged) model[cbChanged] = targetScript[cbChanged];

    const entry = controls.find((entry) => name === entry.name);
    this._array.push(() => { model[name] = OculusTouchInputRight[entry.fn]() });
  });
};

prototype.update = function (/* dt */) {
  this._array.forEach( fn => fn() );
};
