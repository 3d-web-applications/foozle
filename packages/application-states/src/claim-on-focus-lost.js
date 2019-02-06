export const claimOnFocusLost = (notifyFn) => {
  window.onblur = (event) => { notifyFn(event); };
};
