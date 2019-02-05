import { createRegisterFunction } from './src/create-register-function';
import { createUnregisterFunction } from './src/create-unregister-function';
import { createNotifyFunction } from './src/create-notify-function';

export const createRegistry = () => {
  const subscribers = [];

  return {
    register: createRegisterFunction(subscribers),
    unregister: createUnregisterFunction(subscribers),
    notify: createNotifyFunction(subscribers),
  };
};
