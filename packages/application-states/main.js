import { createSetterProperty } from './src/create-setter-property';
import { closeApplication } from './src/close-application';

let callback;
/* let isRunning = true;


const setIsRunning = (state) => {
  if (state === isRunning) {
    return;
  }
  isRunning = state;
  if (callback) {
    callback(isRunning);
  }
}; */
const setIsRunning = createSetterProperty(callback);

const resumeApplication = () => { setIsRunning(true); };
const pauseApplication = () => { setIsRunning(false); };

const claimNotification = (fn) => {
  if (callback) {
    throw new Error('Notification was already claimed.');
  }
  callback = fn;
};

export {
  claimNotification,
  resumeApplication,
  pauseApplication,
  closeApplication,
};
