import { XBox360Buttons } from './xbox360-buttons';
import { XBox360Axes } from './xbox360-axes';

export const createXBox360Model = () => {

  const model = {};

  XBox360Buttons.forEach((buttonName) => {
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
          const fn = model[`${buttonName}Pressed`];
          if (fn) fn();
        } else {
          const fn = model[`${buttonName}Released`];
          if (fn) fn();
        }
      }
    });
  });

  XBox360Axes.forEach((axisName) => {
    let alteration = 0;
    Object.defineProperty(model, axisName, {
      get () {
        return alteration;
      },
      set (value) {
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