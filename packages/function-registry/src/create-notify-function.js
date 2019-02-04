export const createNotifyFunction = array => () => {
  array.forEach(fn => fn());
};
