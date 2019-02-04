export const createUnregisterFunction = array => (fn) => {
  const index = array.indexOf(fn);
  if (index > -1) {
    array.splice(index, 1);
  }
};
