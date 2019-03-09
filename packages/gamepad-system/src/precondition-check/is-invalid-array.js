import { hasSomeHoles } from './has-some-holes';

export const isInvalidArray = (array) => {
  if (!Array.isArray(array)) {
    return false;
  }
  return array.length === 0 || hasSomeHoles(array);
};
