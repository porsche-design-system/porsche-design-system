import { toFilter } from './toFilter';

it.each<[Parameters<typeof toFilter>[0], string]>([
  [
    [3, 7, 2930, 188, 91, 103],
    'invert(3%) sepia(7%) saturate(2930%) hue-rotate(188deg) brightness(91%) contrast(103%)',
  ],
  [
    [97, 55, 2840, 180, 114, 103],
    'invert(97%) sepia(55%) saturate(2840%) hue-rotate(180deg) brightness(114%) contrast(103%)',
  ],
])('should for parameter: %s return result: %s', (params, result) => {
  expect(toFilter(params)).toBe(result);
});
