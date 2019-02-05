import { createTimer } from './create-timer';

describe(createTimer, () => {
  test('createTimer is function', () => {
    const expected = 'function';
    const actual = typeof createTimer;
    expect(actual).toBe(expected);
  });

  test('createTimer returns object', () => {
    const expected = 'object';
    const actual = typeof createTimer();
    expect(actual).toBe(expected);
  });

  test('result of createTimer contains start function', () => {
    const expected = 'function';
    const actual = typeof createTimer().start;
    expect(actual).toBe(expected);
  });

  test('result of createTimer contains stop function', () => {
    const expected = 'function';
    const actual = typeof createTimer().stop;
    expect(actual).toBe(expected);
  });

  test('first function parameter is called once in start', () => {
    const id = 1234;
    const mockCallback = jest.fn(id).mockImplementation(() => {});
    const timer = createTimer(mockCallback, () => {});
    timer.start();
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test('second function parameter is not called on the first start', () => {
    const id = 1234;
    const mockCallback = jest.fn();
    const timer = createTimer(() => id, mockCallback);
    timer.start();
    expect(mockCallback.mock.calls.length).toBe(0);
  });

  test('first function parameter is not called once in stop', () => {
    const id = 1234;
    const mockCallback = jest.fn(id).mockImplementation(() => {});
    const timer = createTimer(mockCallback, () => {});
    timer.start();
    timer.stop();
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test('second function parameter is called once in stop', () => {
    const id = 1234;
    const mockCallback = jest.fn();
    const timer = createTimer(() => id, mockCallback);
    timer.start();
    timer.stop();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
