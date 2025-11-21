export const getCurrentPdsVersion = () =>
  typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || null : null;
