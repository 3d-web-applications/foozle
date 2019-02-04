# Function-Registry

Simple mechanism to execute multiple functions at once.

```javascript
import { createRegistry } from './create-registry';

const fn = () => {};

const registry = createRegistry();
registry.register(fn);
registry.notify();
registry.unregister(fn);
```
