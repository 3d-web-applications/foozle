export const createSetterProperty = (callback) => {
  let isRunning = true;

  return (state) => {
    if (state === isRunning) {
      return;
    }
    isRunning = state;
    if (callback) {
      callback(isRunning);
    }
  };
};
