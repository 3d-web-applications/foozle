import { createRegisterFunction } from './create-register-function';

describe(createRegisterFunction, () => {
  test('createRegisterFunction is function', () => {
    const expected = 'function';
    const actual = typeof createRegisterFunction;
    expect(actual).toBe(expected);
  });

  test('createRegisterFunction returns function', () => {
    const expected = 'function';
    const actual = typeof createRegisterFunction();
    expect(actual).toBe(expected);
  });

  test('createRegisterFunction allows registering a function', () => {
    const fn = () => {};
    const array = [];
    const register = createRegisterFunction(array);
    register(fn);
    expect(array.length).toBe(1);
  });
});
