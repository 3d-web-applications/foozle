const { prototype } = pc.createScript('OrbitCameraKeyboardInput');

prototype.initialize = function () {
  this.OrbitCamera = this.entity.script.OrbitCamera;
};

prototype.postInitialize = function () {
  if (this.OrbitCamera) {
    this.startDistance = this.OrbitCamera.distance;
    this.startYaw = this.OrbitCamera.yaw;
    this.startPitch = this.OrbitCamera.pitch;
    this.startPivotPosition = this.OrbitCamera.pivotPoint.clone();
  }
};

prototype.update = function (/* dt */) {
  if (this.OrbitCamera) {
    if (this.app.keyboard.wasPressed(pc.KEY_SPACE)) {
      this.OrbitCamera.reset(
        this.startYaw, this.startPitch, this.startDistance,
      );
      this.OrbitCamera.pivotPoint = this.startPivotPosition;
    }
  }
};
