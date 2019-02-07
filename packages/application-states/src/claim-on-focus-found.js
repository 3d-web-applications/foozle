export const claimOnFocusFound = (notifyFn) => {
  window.onfocus = (event) => { notifyFn(event); };
};
