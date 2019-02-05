export const createRegisterFunction = array => (fn) => {
  if (array.indexOf(fn) === -1) {
    array.push(fn);
  }
};
