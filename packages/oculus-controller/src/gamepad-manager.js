import { createRegistry } from '@foozle/function-registry';

import { createNumberProperty } from './counter';

const { attributes, prototype } = pc.createScript('GamepadManager');

attributes.add('_vrListenerEntity', {
  type: 'entity',
  title: 'VR Listener',
  description: 'Entity with a VrListener script attached',
});

createNumberProperty(
  '_gamepadCount', prototype, '_onGamepadCountChanged', 0
);

createNumberProperty(
  '_oculusTouchLeftId', prototype, null, -1
);

createNumberProperty(
  '_oculusTouchRightId', prototype, null, -1
);

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

  this._registry = createRegistry();
  this._oculusTouchLeftPad;
  this._oculusTouchRightPad,
  this._xboxController;

  this._gamepads = new pc.GamePads();

  this._bind();

  var self = this;
    
  setInterval(
    function() {
      var pads = self._gamepads.poll();
      self._gamepads.update();
      if (pads.length > 0) {
          console.log("PAD_FACE_1", self._gamepads.isPressed(pc.PAD_1, pc.PAD_FACE_1));
          console.log("PAD_FACE_2", self._gamepads.isPressed(pc.PAD_1, pc.PAD_FACE_2));
          console.log("PAD_FACE_3", self._gamepads.isPressed(pc.PAD_1, pc.PAD_FACE_3));
          console.log("PAD_FACE_4", self._gamepads.isPressed(pc.PAD_1, pc.PAD_FACE_4));
          console.log("PAD_L_SHOULDER_1", self._gamepads.isPressed(pc.PAD_1, pc.PAD_L_SHOULDER_1));
          //console.log("PAD_R_SHOULDER_1", self._gamepads.isPressed(pc.PAD_1, pc.PAD_R_SHOULDER_1));
          console.log("pc.PAD_L_STICK_X", self._gamepads.getAxis(pc.PAD_1, pc.PAD_L_STICK_X));
          console.log("pc.PAD_L_STICK_Y", self._gamepads.getAxis(pc.PAD_1, pc.PAD_L_STICK_Y));
      }
    },
    3000);
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
  //this._gamepads.update();
  //const pads = this._gamepads.poll();
  //console.log(pads.length);
  const pads = this._gamepads.poll();
  this._gamepads.update();
  this._gamepadCount = pads.length;
};

/**
 * Start gamepad polling, when entering VR. 
 * Also note: Oculus controllers will be found after entering VR
 * for the first time.
 */
prototype._handleVrEnter = function () {
  this.enabled = true;
};

/**
 * Stop gamepad polling, when leaving VR.
 */
prototype._handleVrExit = function () {
  this.enabled = false;
};

prototype._onGamepadCountChanged = function () {
  this._registry.notify();
  console.log(this._gamepadCount);
  this._findOculusController();
};

prototype.registerFunction = function (fn, scope) {
  if (fn) this._registry.register(fn.bind(scope));
};

prototype.unregisterFunctions = function (fn, scope) {
  if (fn) this._registry.unregister(fn.bind(scope));
};

prototype._findOculusController = function () {
  const pads = this._gamepads.poll();
  console.log(pads);
  this._oculusTouchLeftId = pads.findIndex(
    (element) => element.pad.id === 'Oculus Touch (Left)'
  );
  this._oculusTouchRightId = pads.findIndex(
    (element) => element.pad.id === 'Oculus Touch (Right)'
  );

  if (!this._oculusTouchLeftPad) {
    this._oculusTouchLeftPad = pads.find(
      (element) => element.pad.id === 'Oculus Touch (Left)'
    );
  }

  if (!this._oculusTouchRightPad) {
    this._oculusTouchRightPad = pads.find(
      (element) => element.pad.id === 'Oculus Touch (Right)'
    );
  }

  if (!this._xboxController) {
    this._xboxController = pads.find(
      (element) => element.pad.id !== 'Oculus Touch (Left)' &&  element.pad.id !== 'Oculus Touch (Right)'
    );
  }

  // test result: the array size might change, but the pad indices do not change
  if (this._xboxController) {
    console.log('_xboxController');
    let res = this._gamepads.isPressed(this._xboxController.pad.index, pc.PAD_FACE_1);
    console.log(res);
  }

  console.log(this._oculusTouchLeftId);
  console.log(this._oculusTouchRightId);
};