export const lighten = (hsl: string): string => {
  return changeColor(hsl, 15);
};

export const darken = (hsl: string): string => {
  return changeColor(hsl, -15);
};

const changeColor = (hsl: string, lightness: number): string => {
  return hsl.replace(/\s(\d+)(%?)\//, (_: string, p1: string, p2: string) => {
    return ` ${Math.min(Math.max(parseInt(p1, 10) + lightness, 0), 100)}${p2}/`;
  });
};
