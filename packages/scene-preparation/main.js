const createEntityIncludingScripts = (entityName, scriptNames) => {
  const entity = new window.pc.Entity();
  entity.name = entityName || 'Preliminary';
  entity.addComponent('script');
  const array = scriptNames || [];
  array.forEach((scriptName) => {
    entity.script.create(scriptName, { attributes: {} });
  });
  return entity;
};

let { foozle } = window;
if (!foozle) foozle = { sceneConfig: {} };
if (!foozle.persistent) foozle.persistent = [];

const { sceneConfig, persistent } = foozle;

Object.entries(sceneConfig || {}).forEach((entry) => {
  const entity = createEntityIncludingScripts(entry[0], entry[1]);
  persistent.push(entity);
  // console.log(entity);
  console.log(persistent);
});

// calling window.pc.app.scripts.get('CollisionGroup') does not work
// window.pc.app is not ready at this moment
// but window.pc.script.app.scripts.get('CollisionGroup') is already working
