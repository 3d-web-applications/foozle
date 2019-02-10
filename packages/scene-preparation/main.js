const { pc } = window;
const { app } = pc.script;

if (app) {
  const createEntityIncludingScripts = (config) => {
    const entity = new window.pc.Entity();
    entity.name = config.name || 'Preliminary';
    entity.addComponent('script');
    const array = Object.entries(config.scripts || []);
    array.forEach((entry) => {
      entity.script.create(entry[0], { attributes: entry[1] });
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
    // note: when using window.pc.ComponentSystem.bind instead, the function below would be called at last in the scene hierarchy
    pc.ComponentSystem._init.unshift({
      f: foozle.persistent[0].script.CollisionGroup.initialize,
      s: foozle.persistent[0].script.CollisionGroup,
    });
    onLibrariesLoaded();
  };
}
