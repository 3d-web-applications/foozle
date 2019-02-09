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

if (!window.foozle) window.foozle = { sceneConfig: {}, persistent: [] };
if (!window.foozle.persistent) window.foozle.persistent = [];

const { sceneConfig, persistent } = window.foozle;

Object.entries(sceneConfig).forEach((entry) => {
  const entity = createEntityIncludingScripts(entry[0], entry[1]);
  persistent.push(entity);
  // console.log(entity);
  console.log(persistent);
});

// calling window.pc.app.scripts.get('CollisionGroup') does not work
// window.pc.app is not ready at this moment
// but window.pc.script.app.scripts.get('CollisionGroup') is already working
