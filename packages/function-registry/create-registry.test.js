import { createRegistry } from './create-registry';

describe(createRegistry, () => {
  test('createRegistry is function', () => {
    const expected = 'function';
    const actual = typeof createRegistry;
    expect(actual).toBe(expected);
  });

  test('createRegistry returns object', () => {
    const expected = 'object';
    const actual = typeof createRegistry();
    expect(actual).toBe(expected);
  });

  test('result of createRegistry contains register function', () => {
    const expected = 'function';
    const actual = typeof createRegistry().register;
    expect(actual).toBe(expected);
  });

  test('result of createRegistry contains unregister function', () => {
    const expected = 'function';
    const actual = typeof createRegistry().unregister;
    expect(actual).toBe(expected);
  });

  test('result of createRegistry contains notify function', () => {
    const expected = 'function';
    const actual = typeof createRegistry().notify;
    expect(actual).toBe(expected);
  });

  test('registered function will be notified', () => {
    const mockCallback = jest.fn();
    const registry = createRegistry();
    registry.register(mockCallback);
    registry.notify();
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test('unregistered function will not be notified', () => {
    const mockCallback = jest.fn();
    const registry = createRegistry();
    registry.register(mockCallback);
    registry.unregister(mockCallback);
    registry.notify();
    expect(mockCallback.mock.calls.length).toBe(0);
  });
});
