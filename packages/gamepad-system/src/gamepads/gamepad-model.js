export const createGamepadModel = (buttons, axes, deadZone = 0.25) => {

  const model = {};

  buttons.forEach(element => {
    const buttonName = element.name;
  //buttons.map(element => element.name).forEach((buttonName) => {
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
          //const fn = model[`_${buttonName}PressStart`] || model[`_${buttonName}TouchStart`]; // TODO obsolete, but xbox360 controller is still using it
          const fn = model[element.cbPressed];
          if (fn) fn();
        } else {
          //const fn = model[`_${buttonName}PressEnd`] || model[`_${buttonName}TouchEnd`];
          const fn = model[element.cbReleased];
          if (fn) fn();
        }
      }
    });
  });

  axes.forEach(element => {
  //axes.map(element => element.name).forEach((axisName) => {
    let alteration = 0;
    Object.defineProperty(model, element.name, {
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

        //const fn = model[`${axisName}Changed`];
        const fn = model[element.cbChanged];
        if (fn) fn(); 
      }
    });
  });

  return model;
};