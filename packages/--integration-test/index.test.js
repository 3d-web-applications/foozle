// import '@foozle/application-states';
// import '@foozle/collision-layers';
import { createRegistry } from '@foozle/function-registry';
// import '@foozle/orbit-camera';
// import '@foozle/scene-preparation';
import '@foozle/time';

describe(createRegistry, () => {
  test('createRegistry is function', () => {
    const expected = 'function';
    const actual = typeof createRegistry;
    expect(actual).toBe(expected);
  });
});