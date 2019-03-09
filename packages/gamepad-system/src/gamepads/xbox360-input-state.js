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
    const {
      name, defaultValue, cbPressed, cbReleased,
      cbChanged, entityId, scriptName
    } = element;

    model[name] = defaultValue;
    const targetScript = entities[entityId].script[scriptName];
    if (cbPressed) model[cbPressed] = targetScript[cbPressed];
    if (cbReleased) model[cbReleased] = targetScript[cbReleased];
    if (cbChanged) model[cbChanged] = targetScript[cbChanged];

    const entry = XBox360Map.find((entry) => name === entry.name);
    this._array.push(() => { model[name] = XBox360Input[entry.fn]() });
  });
};

prototype.update = function () {
  this._array.forEach( fn => fn() );
};
