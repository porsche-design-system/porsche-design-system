import tinycolor2 from 'tinycolor2';

export const colorRGB = {
  type: `value`,
  matcher: (token) => token.attributes.category === `color`,
  transformer: (token) => {
    const { r, g, b, a } = tinycolor2(token.value).toRgb();
    return {
      alpha: a.toFixed(4),
      blue: (b / 255).toFixed(4),
      red: (r / 255).toFixed(4),
      green: (g / 255).toFixed(4),
    };
  },
};
