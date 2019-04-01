import { hasSomeInvalidAttribute } from '@foozle/precondition-check';

import { OculusTouchAxes } from '../data/oculus-touch-axes';
import { OculusTouchButtonsLeft } from '../data/oculus-touch-buttons-left';
import { createGamepadModel } from '../gamepad-model';

const { attributes, prototype } = pc.createScript('OculusTouchInputLeftState');

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
  const { OculusTouchInputLeft } = this.entity.script;

  // Mirror state of OculusTouchInputLeft script and listen for changes.
  // NOTE: this is a very sensitive part. Make sure that there is only one OculusTouchInputLeft in the scene.
  this.enabled = OculusTouchInputLeft.enabled;
  OculusTouchInputLeft.on("state", (enabled) => { this.enabled = enabled;} );

  // get subset of observerable states
  const controls = [...OculusTouchButtonsLeft, ...OculusTouchAxes];
  const hasButton = (name) => OculusTouchButtonsLeft.some((entry) => name === entry.name);
  const hasAxis = (name) => OculusTouchAxes.some((entry) => name === entry.name);
  const buttons = _mapping.resources.filter((element) => hasButton(element.name));
  const axes = _mapping.resources.filter((element) => hasAxis(element.name));
  
  const model = createGamepadModel(buttons, axes, this._deadZone);

  // allow polling for a specific button/stick + bind handlers to process state changes
  [...buttons, ...axes].forEach((element) => {
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
    this._array.push(() => { model[name] = OculusTouchInputLeft[entry.fn]() });
  });
};

prototype.update = function (/* dt */) {
  this._array.forEach( fn => fn() );
};
