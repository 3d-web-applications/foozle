const isNullOrUndefined = (object) => !object;

const hasHoles = (array) => array.some(isNullOrUndefined);

const isInvalidArray = (array) => {
  if (!Array.isArray(array)) {
    return false;
  }
  return array.length === 0 || hasHoles(array);
};

const isInvalid = (obj) => isNullOrUndefined(obj) || isInvalidArray(obj);

const containsInvalidObject = (element) => isInvalid(element);

export const invalid = ( array ) => array.some(containsInvalidObject);
