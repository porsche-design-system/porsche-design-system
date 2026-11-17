import { expect, it } from 'vitest';
import { rewriteCdnUrlsForDev } from '../../../src/utils/rewriteCdnUrlsForDev';

it.each([
  [
    '<link href=https://cdn.ui.porsche.com/porsche-design-system/components/x.js>',
    '<link href=http://localhost:3001/components/x.js>',
  ],
  ['https://cdn.ui.porsche.cn/porsche-design-system/fonts/a.woff2', 'http://localhost:3001/fonts/a.woff2'],
  ['https://cdn.ui.porsche.com/other/x.js', 'https://cdn.ui.porsche.com/other/x.js'],
  [
    'a https://cdn.ui.porsche.com/porsche-design-system/a b https://cdn.ui.porsche.com/porsche-design-system/b',
    'a http://localhost:3001/a b http://localhost:3001/b',
  ],
])('rewriteCdnUrlsForDev(%s)', (input, expected) => {
  expect(rewriteCdnUrlsForDev(input)).toBe(expected);
});
