import { isInvalidAttribute } from './is-invalid-attribute';

export const hasSomeInvalidAttribute = ( array ) => array.some(isInvalidAttribute);
