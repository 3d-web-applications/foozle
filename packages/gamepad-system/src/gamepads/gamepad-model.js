export const createGamepadModel = (buttons, axes, deadZone = 0.25) => {

  const model = {};

  buttons.map(element => element.name).forEach((buttonName) => {
    let isPressed = false;
    Object.defineProperty(model, buttonName, {
      get () {
        return isPressed;
      },
      set (value) {
        if (value === isPressed) {
          return;
        }
        isPressed = value;

        if (isPressed) {
          const fn = model[`${buttonName}Pressed`] || model[`${buttonName}TouchStart`];
          if (fn) fn();
        } else {
          const fn = model[`${buttonName}Released`] || model[`${buttonName}TouchEnd`];
          if (fn) fn();
        }
      }
    });
  });

  axes.map(element => element.name).forEach((axisName) => {
    let alteration = 0;
    Object.defineProperty(model, axisName, {
      get () {
        return alteration;
      },
      set (value) {
        if (Math.abs(value) < deadZone) {
          value = 0;
        }
        if (value === alteration) {
          return;
        }
        alteration = value;

        const fn = model[`${axisName}Changed`];
        if (fn) fn(); 
      }
    });
  });

  return model;
};