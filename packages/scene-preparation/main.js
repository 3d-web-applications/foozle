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
  const bindBefore = (functionName, scope) => {
    const fn = scope[functionName];
    if (fn) {
      reservedFn[functionName].unshift({ f: fn, s: scope });
    }
  };

  const bindAfter = (functionName, scope) => {
    const fn = scope[functionName];
    if (fn) {
      reservedFn[functionName].push({ f: fn, s: scope });
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

      Object.keys(reservedFn).forEach((key) => {
        if (bindings[key] === 'before') {
          bindBefore(key, script);
          script[key] = noop;
        } else if (bindings[key] === 'skip') {
          script[key] = noop;
        } else if (bindings[key] === 'after') {
          bindAfter(key, script);
          script[key] = noop;
        }
      });
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
