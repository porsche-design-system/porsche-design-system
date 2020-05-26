export const remBase = 16;
export const rem = (pixel: number) => {
  return `${pixel / remBase}rem`
};
