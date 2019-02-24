const { attributes, prototype } = pc.createScript('GamepadManager');

attributes.add('_vrListenerEntity', {
  type: 'entity',
  title: 'VR Listener',
  description: 'Entity with a VrListener script attached',
});

/**
 * Prepare gamepad polling and subscribe for VR enter/exit events. 
 */
prototype.postInitialize = function() {
  const { gamepads } = this.app;
  if (!gamepads || !gamepads.gamepadsSupported) {
    /**
     * Check if gamepad support is enabled in this project.
     * Check also if Steam is running and occupying gamepads.
     */
    console.error("Gamepad Error");
    this.enabled = false;
    return;
  }

  this._gamepads = new pc.GamePads();

  this._bind();  
};

prototype._bind = function () {
  const { _vrListenerEntity, on, _handleVrEnter, _handleVrExit } = this;
  const { VrDisplay } = _vrListenerEntity.script;

  if (!VrDisplay) {
    this.enabled = false;
    return;
  }

  this.enabled = VrDisplay.vrEnabled;

  VrDisplay.registerFunctions(_handleVrEnter, _handleVrExit, this);

  on('destroy', () => {
    VrDisplay.unregisterFunctions(_handleVrEnter, _handleVrExit, this);
  }, this);
}

/**
 * Update is changed at runtime.
 */
prototype.update = function (/* dt */) {
  this._gamepads.update();
  const pads = this._gamepads.poll();
  console.log(pads.length);
};

/**
 * Start gamepad polling, when entering VR. 
 * Also note: Oculus controllers will be found after entering VR
 * for the first time.
 */
prototype._handleVrEnter = function () {console.log("_handleVrEnter",this);
  this.enabled = true;
};

/**
 * Stop gamepad polling, when leaving VR.
 */
prototype._handleVrExit = function () {console.log("_handleVrExit",this);
  this.enabled = false;
};