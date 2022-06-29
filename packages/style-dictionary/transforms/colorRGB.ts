import tinycolor2 from 'tinycolor2';
import type { Transform } from 'style-dictionary';

export const colorRGB: Transform = {
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
