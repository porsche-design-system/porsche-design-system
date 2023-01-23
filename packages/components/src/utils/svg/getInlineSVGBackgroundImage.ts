export const getInlineSVGBackgroundImage = (path: string): string => {
  return `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${path}</svg>')`;
};
