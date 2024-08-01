import { lighten, darken } from './changeColor';

it.each([
  ['hsl(240 3% 26%/35%)', 'hsl(240 3% 41%/35%)'],
  ['hsl(240 3% 99%/35%)', 'hsl(240 3% 100%/35%)'],
  ['hsl(240 3% 26/35%)', 'hsl(240 3% 41/35%)'],
  ['hsl(240 3% 99/35%)', 'hsl(240 3% 100/35%)'],
])('should for lighten() hsl: %s return %s', (hsl, result) => {
  expect(lighten(hsl)).toBe(result);
});

it.each([
  ['hsl(240 3% 26%/35%)', 'hsl(240 3% 11%/35%)'],
  ['hsl(240 3% 1%/35%)', 'hsl(240 3% 0%/35%)'],
  ['hsl(240 3% 26/35%)', 'hsl(240 3% 11/35%)'],
  ['hsl(240 3% 1/35%)', 'hsl(240 3% 0/35%)'],
])('should for darken() hsl: %s return %s', (hsl, result) => {
  expect(darken(hsl)).toBe(result);
});
