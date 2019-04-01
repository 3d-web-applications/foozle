# Scene-Preparation

Allows to setup entites before starting the first scene.

## Explanation

One best practice in PlayCanvas/Unity/etc. is to make all scenes runnable.
This will make testing much easier.

Loading custom scripts through that bundle will enable you to to persist objects between scene loads. It also allows you to mock up data from previously loaded scenes.

## Investigation

### Extending The Window Object

Within the PlayCanvas Editor, the most simple approach to reach the proposed goal is to create a new Javascript file and placing it to the top of the *Scripts Loading Order*. It can contain global variables as well as functions, etc. To make them available, they could be bound to the *window* object.

Advantages:
- easy to implement
- gives the appearance of reusability

Disadvantages:
- too many scripts could rely on the existence of specific properties at the *window* object
- after a certain amount of time, multiple versions could exist in different projects
- tracking the amount of scripts, which extend the window object, as well as tracking the amount of reserved property names can become very frustrating
- even if it is very unlikely, specific properties of the *window* object could be already in use

At first glance, the solution seems to be good, but in the long run it will make testing and proper versioning much harder.

### Avoiding The Online Editor

Working completely offline will offer you high flexibility, but also introduces new problems.

Advantages:
- it is not very hard to define specific variables and functions before starting a PlayCanvas application.
- the versioning of utilities scripts is easier.

Disadvantage:
- the problem of making variables and functions available within PlayCanvas scripts still exist
- without a proper research and some conventions, it might become hard to handle this feature in multiple projects
- loss of advantages of using a visual editor

### Hooking Into The Script Execution Order

PlayCanvas does not provide such a feature, yet. But at least it is possible to add scripts manually at the beginning of the script execution order.

At the moment, the proposed solution creates new entities, holding instances of selected Playcanvas scripts. Entities can be added to a scene, but it is not requirement.

Advantages:
- variables and functions can be defined within PlayCanvas scripts
- every PlayCanvas script is already qualified
- functions can be called continuously at the very beginning of each frame

Disadvantages:
- amount of time for research and development
- removing scene hierarchies, including specialized entities, might introduce new errors 

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
- At the moment entities can only be added as children to the root entity. If *parent* is not set to *root*, entites will not be added to the scene. 
