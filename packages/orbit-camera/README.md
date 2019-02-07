# Orbit-Camera

The package contains modified versions of some standard PlayCanvas scripts. To see the original versions, create a new PlayCanvas project and select the Model Viewer Starter Kit.

The main reason for the modification was the requirement to create bundles using Webpack locally as well as a custom ESLint configuration.

Please note: To highlight the script relationships, they were also renamed.
- orbitCamera -> OrbitCamera
- touchInput -> OrbitCameraTouchInput
- mouseInput -> OrbitCameraMouseInput
- keyboardInput -> OrbitCameraKeyboardInput

## How To
Use the provided webpack configurations to immediately create a local bundle. As an alterantiv you can also create your own webpack configuration and import those scripts. When this is done, upload and select the bundle inside the PlayCanvas editor, finally hit the **Parse** button!
