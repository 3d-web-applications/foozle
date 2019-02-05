import { createTimeout } from './create-timeout';

describe(createTimeout, () => {
  test('createTimeout is function', () => {
    const expected = 'function';
    const actual = typeof createTimeout;
    expect(actual).toBe(expected);
  });

  test('createTimeout returns object', () => {
    const expected = 'object';
    const actual = typeof createTimeout();
    expect(actual).toBe(expected);
  });

  test('result of createTimeout contains start function', () => {
    const expected = 'function';
    const actual = typeof createTimeout().start;
    expect(actual).toBe(expected);
  });

  test('result of createTimeout contains stop function', () => {
    const expected = 'function';
    const actual = typeof createTimeout().stop;
    expect(actual).toBe(expected);
  });

  test('callback function is called once after 500ms', () => {
    const mockCallback = jest.fn();
    const milliseconds = 500;
    const timeout = createTimeout();
    timeout.start(milliseconds, mockCallback);
    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(1);
    }, milliseconds * 2);
  });

  test('callback function is not called, when timer was stopped', () => {
    const mockCallback = jest.fn();
    const milliseconds = 500;
    const timeout = createTimeout();
    timeout.start(milliseconds, mockCallback);
    setTimeout(timeout.stop, milliseconds - 100);
    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(0);
    }, milliseconds * 2);
  });
});
