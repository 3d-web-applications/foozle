# Orbit-Camera

Simple mechanism to execute multiple functions at once.

```javascript
import { createRegistry } from '@foozle/function-registry';

const fn = () => {};

const registry = createRegistry();
registry.register(fn);
registry.notify();
registry.unregister(fn);
```
