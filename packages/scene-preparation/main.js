const { pc } = window;
const { app } = pc.script;

if (app) {
  const bind = (array, fn, scope) => {
    if (fn) {
      // note: when using window.pc.ComponentSystem.bind instead, the function below would be called at last in the scene hierarchy
      array.unshift({ f: fn, s: scope });
    }
  };

  const createEntityIncludingScripts = (config) => {
    const entity = new window.pc.Entity();
    entity.name = config.name || 'Preliminary';
    entity.addComponent('script');
    const array = Object.entries(config.scripts || []);
    array.forEach((entry) => {
      const scriptName = entry[0];
      entity.script.create(scriptName, { attributes: entry[1] });
      const script = entity.script[scriptName];
      /* if (script.initialize) {
        pc.ComponentSystem._init.unshift({
          f: script.initialize,
          s: script,
        });
      } */
      bind(pc.ComponentSystem._init, script.initialize, script);
      bind(pc.ComponentSystem._postInit, script.postInitialize, script);
      bind(pc.ComponentSystem._update, script.update, script);
      bind(pc.ComponentSystem._postUpdate, script.postUpdate, script);
      bind(pc.ComponentSystem._fixedUpdate, script.fixedUpdate, script);
      bind(pc.ComponentSystem._toolsUpdate, script.toolsUpdate, script);
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
      persistent.push(entity);
    });

    onLibrariesLoaded();
  };

  /* const start = app.start.bind(app);
  app.start = () => {
    start();
    pc.app.root.addChild(window.foozle.persistent[0]);
  }; */
}
