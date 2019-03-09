import { createXBox360Model } from './xbox360-model';
import { XBox360Axes } from './xbox360-axes';
import { XBox360Buttons } from './xbox360-buttons';

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
  if (!this._mapping) {
    this.enabled = false;
    console.error('No mapping');
    return;
  }

  const entities = this._handlerEntities;

  if (!entities) {
    this.enabled = false;
    console.error('No handler');
    return;
  }

  const model = createXBox360Model();
  const { XBox360Input } = this.entity.script;
  this.enabled = XBox360Input.enabled;
  XBox360Input.on("state", function (enabled) { this.enabled = enabled;} );

  const arr2 = [...XBox360Buttons, ...XBox360Axes];
  const map = this._mapping.resources;

  const filtered = map.filter((element) => {
    let found = false;
    arr2.forEach((entry) => {
      if (element.name === entry.name) {
        found = true;
        return;
      }
    });
    return found;
  });

  filtered.forEach((element) => {
    arr2.forEach((entry) => {
      if (element.name === entry.name){
        element.fn = entry.fn;
        return;
      }
    });
  });

  const array = [];
  filtered.forEach((element) => {
    const { name, defaultValue, cbPressed, cbReleased, cbChanged, entityId, scriptName, fn } = element;
    model[name] = defaultValue;
    const { script } = entities[entityId];
    if (cbPressed) model[cbPressed] = script[scriptName][cbPressed];
    if (cbReleased) model[cbReleased] = script[scriptName][cbReleased];
    if (cbChanged) model[cbChanged] = script[scriptName][cbChanged];
    array.push(() => { model[name] = XBox360Input[fn]() });
  });
  
  this._array = array;
};

prototype.update = function () {
  this._array.forEach( fn => fn() );
};
