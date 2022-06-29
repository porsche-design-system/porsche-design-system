import type { Transform } from 'style-dictionary';

export const remToFloat: Transform = {
  type: 'value',
  matcher: (token) => token.attributes.category === 'size',
  transformer: (token) => {
    return token.value * 16;
  },
};
