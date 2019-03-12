import { XBox360Buttons } from './data/xbox360-buttons';
import { XBox360Axes } from './data/xbox360-axes';
import { createGamepadModel } from './gamepad-model';
import { hasSomeInvalidAttribute } from '../precondition-check/has-some-invalid-attribute';

const { attributes, prototype } = pc.createScript('XBox360InputState');

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

prototype.initialize = function () {
  const { _mapping, _handlerEntities } = this;
  
  if (hasSomeInvalidAttribute(_mapping, _handlerEntities)) {
    this.enabled = false;
    console.error('Initialization error');
    return;
  }

  this._array = [];
  const { XBox360Input } = this.entity.script;

  // mirror state of XBox360Input script and listen for changes
  this.enabled = XBox360Input.enabled;
  XBox360Input.on("state", (enabled) => { this.enabled = enabled;} );

  // used to hold last states of buttons and analog sticks
  const model = createGamepadModel(XBox360Buttons, XBox360Axes);

  // get subset of observerable states
  const controls = [...XBox360Buttons, ...XBox360Axes];
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
    this._array.push(() => { model[name] = XBox360Input[entry.fn]() });
  });
};

prototype.update = function (/* dt */) {
  this._array.forEach( fn => fn() );
};
