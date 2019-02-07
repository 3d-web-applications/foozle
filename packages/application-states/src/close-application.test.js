import { closeApplication } from './close-application';

describe(closeApplication, () => {
  test('closeApplication is function', () => {
    const expected = 'function';
    const actual = typeof closeApplication;
    expect(actual).toBe(expected);
  });

  test('closeApplication triggers closes current window', () => {
    const mockCallback = jest.fn();
    window.close = mockCallback;
    closeApplication();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
