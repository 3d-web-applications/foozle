import { createInterval } from './create-interval';

describe(createInterval, () => {
  test('createInterval is function', () => {
    const expected = 'function';
    const actual = typeof createInterval;
    expect(actual).toBe(expected);
  });

  test('createInterval returns object', () => {
    const expected = 'object';
    const actual = typeof createInterval();
    expect(actual).toBe(expected);
  });

  test('result of createInterval contains start function', () => {
    const expected = 'function';
    const actual = typeof createInterval().start;
    expect(actual).toBe(expected);
  });

  test('result of createInterval contains stop function', () => {
    const expected = 'function';
    const actual = typeof createInterval().stop;
    expect(actual).toBe(expected);
  });

  test('callback function is called twice in 1s', () => {
    const mockCallback = jest.fn();
    const milliseconds = 500;
    const interval = createInterval();
    interval.start(milliseconds, mockCallback);
    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(2);
    }, milliseconds * 2);
  });

  test('callback function is called once, when timer was stopped', () => {
    const mockCallback = jest.fn();
    const milliseconds = 500;
    const interval = createInterval();
    interval.start(milliseconds, mockCallback);
    setTimeout(interval.stop, milliseconds + 100);
    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(1);
    }, milliseconds * 2);
  });
});
