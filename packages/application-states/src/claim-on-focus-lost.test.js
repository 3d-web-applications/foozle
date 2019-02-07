import { claimOnFocusLost } from './claim-on-focus-lost';

describe(claimOnFocusLost, () => {
  test('claimOnFocusLost is function', () => {
    const expected = 'function';
    const actual = typeof claimOnFocusLost;
    expect(actual).toBe(expected);
  });

  test('last known callback function is called once on window.onblur', () => {
    const mockCallback = jest.fn();
    claimOnFocusLost(mockCallback);
    window.onblur(null);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
