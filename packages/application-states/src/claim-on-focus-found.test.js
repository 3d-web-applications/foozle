import { claimOnFocusFound } from './claim-on-focus-found';

describe(claimOnFocusFound, () => {
  test('claimOnFocusFound is function', () => {
    const expected = 'function';
    const actual = typeof claimOnFocusFound;
    expect(actual).toBe(expected);
  });

  test('last known callback function is called once on window.onfocus', () => {
    const mockCallback = jest.fn();
    claimOnFocusFound(mockCallback);
    window.onfocus(null);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
