import { createRegistry } from '@foozle/function-registry';

const { prototype } = pc.createScript('VrDisplay');

Object.defineProperty(prototype, 'vrEnabled', {
  get () { return (this.enabled) ? this.app.vr.display.presenting : false; },
});

prototype.initialize = function() {
  const { vr } = this.app;

  if (!vr || !vr.display) {
    console.warn('Your browser does not support WebVr');
    this.enabled = false;
    return;
  }

  this._vrEnterRegistry = createRegistry();
  this._vrExitRegistry = createRegistry();

  vr.display.on("presentchange", this._onPresentChanged, this);
  this.on('destroy', this._onDestroy, this);
};

prototype._onDestroy = function () {
  this.app.vr.display.off("presentchange", this._onPresentChanged, this);
};

prototype._onPresentChanged = function (display) {
  if (display.presenting) {
    this._vrEnterRegistry.notify();
    return;
  }
  this._vrExitRegistry.notify();
};

prototype.registerFunctions = function (fn, fn2, scope) {
  if (fn) this._vrEnterRegistry.register(fn.bind(scope));
  if (fn2) this._vrExitRegistry.register(fn2.bind(scope));
};

prototype.unregisterFunctions = function (fn, fn2, scope) {
  if (fn) this._vrEnterRegistry.unregister(fn.bind(scope));
  if (fn2) this._vrExitRegistry.unregister(fn2.bind(scope));
};
