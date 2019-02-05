import { createNotifyFunction } from './create-notify-function';

describe(createNotifyFunction, () => {
  test('createNotifyFunction is function', () => {
    const expected = 'function';
    const actual = typeof createNotifyFunction;
    expect(actual).toBe(expected);
  });

  test('createNotifyFunction returns function', () => {
    const expected = 'function';
    const actual = typeof createNotifyFunction();
    expect(actual).toBe(expected);
  });

  test('createNotifyFunction triggers registered function', () => {
    const mockCallback = jest.fn();
    const array = [mockCallback];
    const notify = createNotifyFunction(array);
    notify();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
