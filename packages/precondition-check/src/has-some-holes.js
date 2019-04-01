import { isNullOrUndefined } from './is-null-or-undefined';

export const hasSomeHoles = (array) => array.some(isNullOrUndefined);
