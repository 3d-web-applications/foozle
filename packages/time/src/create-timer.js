export const createTimer = (setFn, clearFn) => {
  let id = null;

  const stop = () => {
    if (id) {
      clearFn(id);
      id = null;
    }
  };

  return {
    start: (delay, callback) => {
      stop();
      id = setFn(callback, delay);
    },
    stop,
  };
};
