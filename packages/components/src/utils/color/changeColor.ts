export const changeColor = (hsl: string, lightness: number = 0): string => {
  return hsl.replace(/\s(\d+)(%?)\//, (_: string, p1: string, p2: string) => {
    return ` ${Math.min(Math.max(parseInt(p1, 10) + lightness, 0), 100)}${p2}/`;
  });
};
