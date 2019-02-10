const { pc } = window;
const { ComponentSystem } = pc;
const { app } = pc.script;
const reservedFn = {
  initialize: ComponentSystem._init,
  postInitialize: ComponentSystem._postInit,
  update: ComponentSystem._update,
  postUpdate: ComponentSystem._postUpdate,
  fixedUpdate: ComponentSystem._fixedUpdate,
  toolsUpdate: ComponentSystem._toolsUpdate,
};

const noop = () => {};

if (app) {
  /* const selectArray = (functionName) => {
    switch (functionName) {
      case 'initialize':
        return ComponentSystem._init;
      case 'postInitialize':
        return ComponentSystem._postInit;
      case 'update':
        return ComponentSystem._update;
      case 'postUpdate':
        return ComponentSystem._postUpdate;
      case 'fixedUpdate':
        return ComponentSystem._fixedUpdate;
      case 'toolsUpdate':
        return ComponentSystem._toolsUpdate;
      default: return [];
    }
  }; */

  const bind = (functionName, scope) => {
    const fn = scope[functionName];
    if (fn) {
      // note: when using window.pc.ComponentSystem.bind instead, the function below would be called at last in the scene hierarchy
      // selectArray(functionName).unshift({ f: fn, s: scope });
      reservedFn[functionName].unshift({ f: fn, s: scope });
      scope[functionName] = noop;
    }
  };

  const createEntityIncludingScripts = (config) => {
    const entity = new window.pc.Entity();
    entity.name = config.name || 'Preliminary';
    entity.addComponent('script');
    const array = Object.entries(config.scripts || []);
    array.forEach((entry) => {
      const scriptName = entry[0];
      const { attributes, bindings } = entry[1];
      entity.script.create(scriptName, { attributes });
      const script = entity.script[scriptName];

      if (bindings.initialize === 'before') bind('initialize', script);
      if (bindings.initialize === 'skip') script.initialize = noop;
      if (bindings.postInitialize === 'before') bind('postInitialize', script);
      if (bindings.postInitialize === 'skip') script.postInitialize = noop;
      if (bindings.update === 'before') bind('update', script);
      if (bindings.update === 'skip') script.update = noop;
      if (bindings.postUpdate === 'before') bind('postUpdate', script);
      if (bindings.postUpdate === 'skip') script.postUpdate = noop;
      if (bindings.fixedUpdate === 'before') bind('fixedUpdate', script);
      if (bindings.fixedUpdate === 'skip') script.fixedUpdate = noop;
      if (bindings.toolsUpdate === 'before') bind('toolsUpdate', script);
      if (bindings.toolsUpdate === 'skip') script.toolsUpdate = noop;
      /* Object.keys(reservedFn).forEach((fnName) => {
        if (bindings[fnName]) bind(fnName, script);
      }); */
    });
    return entity;
  };

  let { foozle } = window;
  if (!foozle) foozle = { sceneConfig: [] };
  if (!foozle.persistent) foozle.persistent = [];

  const { sceneConfig, persistent } = foozle;

  const onLibrariesLoaded = app.onLibrariesLoaded.bind(app);
  app.onLibrariesLoaded = () => {
    (sceneConfig || []).forEach((element) => {
      const entity = createEntityIncludingScripts(element);
      persistent.push({ entity, parent: element.parent });
    });

    onLibrariesLoaded();
  };

  const start = app.start.bind(app);
  app.start = () => {
    start();
    persistent.forEach((element) => {
      if (element.parent === 'root') {
        pc.app.root.addChild(element.entity);
        // TODO remove from persistent
      }
    });
  };
}
