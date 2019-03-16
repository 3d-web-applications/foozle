import { isNullOrUndefined } from './is-null-or-undefined';
import { isInvalidArray } from './is-invalid-array';

export const isInvalidAttribute = (obj) => isNullOrUndefined(obj) 
  || isInvalidArray(obj);
