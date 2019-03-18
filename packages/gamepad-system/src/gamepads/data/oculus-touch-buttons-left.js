export const OculusTouchButtonsLeft = [
  { id: 0, name: 'stick', fn: 'analogStickPressed', },
  { id: 1, name: 'index', fn: 'indexTriggerPressed', },
  { id: 2, name: 'hand', fn: 'handTriggerPressed', },
  { id: 3, name: 'x', fn: 'xButtonPressed', },
  { id: 4, name: 'y', fn: 'yButtonPressed', },
  /* id: 5 pressed not suppported */
  { id: 0, name: 'stick', fn: 'analogStickTouched', },
  { id: 1, name: 'index', fn: 'indexTriggerTouched', },
  { id: 2, name: 'hand', fn: 'handTriggerTouched', }, // not very responsive!
  { id: 3, name: 'x', fn: 'xButtonTouched', },
  { id: 4, name: 'y', fn: 'yButtonTouched', },
  { id: 5, name: 'thumbRest', fn: 'thumbRestButtonTouched', },
];
