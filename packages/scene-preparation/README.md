# Scene-Preparation

Allows to setup entites before starting the first scene.

## Explanation

One best practice in PlayCanvas/Unity/etc. is to make all scenes runnable.
This will make testing much easier.

Loading custom scripts through that bundle will enable you to to persist objects between scene loads. It also allows you to mock up data from previously loaded scenes.

## Preparation

Because the package is still in Early-Access, one has to bundle it up by themself.

0. Run `npm run development` or `npm run production`.
1. Import the webpack bundle into your project.
2. Open the **Scripts Loading Order** tab inside the PlayCanvas Editor
3. Move the bundle to the top.
4. Create a javascript file inside the PlayCanvas Editor.
5. Place your configuration inside this file.
6. Move the configuration file on top of the bundle.

Below, you can see an example configuration.

```javascript
window.foozle = {};
window.foozle.sceneConfig = [
    {
        name: 'MyEntity1',
        parent: 'root', // add MyEntity1 as child of root entity
        scripts: {
            CollisionGroup: {
                attributes: { myAttribute: [] },
                bindings: {
                    initialize: 'before', // call function earlier
                    postInitialize: 'skip', // skip function
                    /* update: */ // use default behaviour 
                    postUpdate: 'after', // call function later
                    fixedUpdate: 'skip',
                    toolsUpdate: '_skip_' // typo -> use default behaviour instead
                }
            }
        }
    }  
];
```

## Supported Functions:
At the moment, only some PlayCanvas default functions are supported. Call your custom functions inside one of these. 
- initialize
- postInitialize
- update
- postUpdate
- fixedUpdate
- toolsUpdate

## Flags
If entities should not be added to the scene hierarchy, one has to explicitly mark functions with 'before' or 'after'. Otherwise they will not be executed.
- **before**: run function at the beginning of the current frame
- **~~skip~~**:
- **after**: run function at the end of the current frame

If entities should be added to the scene hierarchy, functions would be executed at the end of the frame. By marking them with 'before' or 'skip', a No-operation is executed at the end of the frame instead. 
- **before**: run function at the beginning of the current frame
- **skip**: skip function
- **~~after~~**: 

## Notes:
- The functionality was not tested within webexports yet
- It is not known if the scripts will still work when changing scenes
- Entities added to the scene hierarchy might get lost during scene changes
- Don't forget to mention attributes in your configuration to prevent errors.
