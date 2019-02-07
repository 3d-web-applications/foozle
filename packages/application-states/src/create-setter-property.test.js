import { createSetterProperty } from './create-setter-property';

describe(createSetterProperty, () => {
  test('createSetterProperty is function', () => {
    const expected = 'function';
    const actual = typeof createSetterProperty;
    expect(actual).toBe(expected);
  });

  test('createSetterProperty returns function', () => {
    const expected = 'function';
    const actual = typeof createSetterProperty(null);
    expect(actual).toBe(expected);
  });

  test('callback is not called when property value remains unchanged', () => {
    const mockCallback = jest.fn();
    const fn = createSetterProperty(mockCallback);
    fn(true);
    expect(mockCallback.mock.calls.length).toBe(0);
  });

  test('callback is called once when property value has changed', () => {
    const mockCallback = jest.fn();
    const fn = createSetterProperty(mockCallback);
    fn(false);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
