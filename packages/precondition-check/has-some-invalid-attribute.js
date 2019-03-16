import { isInvalidAttribute } from './is-invalid-attribute';

export const hasSomeInvalidAttribute = ( ...args ) => args.some(isInvalidAttribute);
