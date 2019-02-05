import { createUnregisterFunction } from './create-unregister-function';

describe(createUnregisterFunction, () => {
  test('createUnregisterFunction is function', () => {
    const expected = 'function';
    const actual = typeof createUnregisterFunction;
    expect(actual).toBe(expected);
  });

  test('createUnregisterFunction returns function', () => {
    const expected = 'function';
    const actual = typeof createUnregisterFunction();
    expect(actual).toBe(expected);
  });

  test('createUnregisterFunction allows registering a function', () => {
    const fn = () => {};
    const array = [fn];
    const unregister = createUnregisterFunction(array);
    unregister(fn);
    expect(array.length).toBe(0);
  });
});
