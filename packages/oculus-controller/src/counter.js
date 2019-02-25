export const createNumberProperty = (
  name, prototype, callbackName, defaultValue
) => {
  let count = defaultValue;
  Object.defineProperty(prototype, name, {
    get () {
      return count;
    },
    set (value) {
      if (value === count) {
        return;
      }
      count = value;
      if (callbackName){
        this[callbackName]();
      } 
    }
  })
};
