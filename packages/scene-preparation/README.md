# Scene-Preparation

Allows to setup entites before starting the first scene.

## Explanation

One best practice in PlayCanvas/Unity/etc. is to make all scenes runnable.
This will make testing much easier.

Loading custom scripts through that mechanism will enable you to to persist objects between scene loads.
Moreover you can mock up data from previously loaded scenes.

## Preparation

0. Run `npm run development` or `npm run production`.
1. Import the webpack bundle into your project.
2. Open the **Scripts Loading Order** tab inside the PlayCanvas Editor
3. Move the bundle to the top.
4. Create a javascript file inside the PlayCanvas Editor.
5. Place your configuration inside this file.
6. Move the configuration file on top of the bundle.

Below, you can see an example configuration.
Every entry inside **sceneConfig** will be translated into one entity.
Each can have 0-N of your scripts attached.

```javascript
window.foozle = {};
window.foozle.sceneConfig = [
    {
        name: "MyEntity_1",
        script: ["ScriptA"],
    },
    {
        name: "MyEntity_2",
        script: ["ScriptA", "ScriptB"],
    } 
];
```

- it is not tested, if it will run on exported applications
- it is not tested, what will happen, when multiple scenes were loaded

Note: For now, the name of the entity must be unique.
