import { createXBox360Model } from './xbox360-model';
import { XBox360Map } from './data/xbox360-map';
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
  const entities = this._handlerEntities;

  if (hasSomeInvalidAttribute(this._mapping, entities)) {
    this.enabled = false;
    console.error('Initialization error');
    return;
  }

  this._array = [];

  const model = createXBox360Model();
  const { XBox360Input } = this.entity.script;
  this.enabled = XBox360Input.enabled;
  XBox360Input.on("state", function (enabled) { this.enabled = enabled;} );

  const map = this._mapping.resources;
  const hasEntry = (name) => XBox360Map.some((entry) => name === entry.name);
  const filtered = map.filter((element) => hasEntry(element.name));

  filtered.forEach((element) => {
    XBox360Map.forEach((entry) => {
      if (element.name === entry.name){
        element.fn = entry.fn;
        return;
      }
    });
  });

  
  filtered.forEach((element) => {
    const { name, defaultValue, cbPressed, cbReleased, cbChanged, entityId, scriptName, fn } = element;
    model[name] = defaultValue;
    const { script } = entities[entityId];
    if (cbPressed) model[cbPressed] = script[scriptName][cbPressed];
    if (cbReleased) model[cbReleased] = script[scriptName][cbReleased];
    if (cbChanged) model[cbChanged] = script[scriptName][cbChanged];
    this._array.push(() => { model[name] = XBox360Input[fn]() });
  });
};

prototype.update = function () {
  this._array.forEach( fn => fn() );
};
