import { createTimer } from './create-timer';

export const createInterval = () => createTimer(setInterval);
