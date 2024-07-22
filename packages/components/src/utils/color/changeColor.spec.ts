import { changeColor } from './changeColor';

it.each([
  ['hsl(240 3% 26%/35%)', 10, 'hsl(240 3% 36%/35%)'],
  ['hsl(240 3% 26%/35%)', 200, 'hsl(240 3% 100%/35%)'],
  ['hsl(240 3% 26/35%)', 10, 'hsl(240 3% 36/35%)'],
  ['hsl(240 3% 26/35%)', 200, 'hsl(240 3% 100/35%)'],
  ['hsl(240 3% 26%/35%)', -10, 'hsl(240 3% 16%/35%)'],
  ['hsl(240 3% 26%/35%)', -200, 'hsl(240 3% 0%/35%)'],
  ['hsl(240 3% 26/35%)', -10, 'hsl(240 3% 16/35%)'],
  ['hsl(240 3% 26/35%)', -200, 'hsl(240 3% 0/35%)'],
])('should for hsl: %s, lightness: %s return %s', (hsl, lightness, result) => {
  expect(changeColor(hsl, lightness)).toBe(result);
});
