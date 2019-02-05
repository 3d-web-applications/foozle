# Time

Provides wrappers for setTimeout and setInterval functions.  

```javascript
export { createTimeout, createInterval } from '@foozle/time';

const fn = () => {};

const timeout = createTimeout();
timeout.start(500, fn);
timeout.stop();

const interval = createInterval();
interval.start(500, fn);
interval.stop();
```
