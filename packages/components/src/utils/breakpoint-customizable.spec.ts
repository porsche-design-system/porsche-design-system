import { BreakpointValue, BreakpointValues, parseJSON } from './breakpoint-customizable';

describe('parseJSON()', () => {
  it.each([
    ['{base: true, s: false}', { base: true, s: false }],
    ["{base: 'initial', l: 'equal'}", { base: 'initial', l: 'equal' }],
    ['{base: "initial", l: "equal"}', { base: 'initial', l: 'equal' }],
    ['{"base": "right", "s": "left"}', { base: 'right', s: 'left' }],
    ['{base: "https://www.porsche.com"}', { base: 'https://www.porsche.com' }],
    ['{base: 36, xs: 6, s: 4, m: 16, l: 2}', { base: 36, xs: 6, s: 4, m: 16, l: 2 }],
    [
      '{base: "1:1", s: "3:4", m: "4:3", l: "9:16", xl: "16:9"}',
      { base: '1:1', s: '3:4', m: '4:3', l: '9:16', xl: '16:9' },
    ],
  ])(
    'should return parsed object for %s',
    (input: string, result: BreakpointValues<BreakpointValue> | BreakpointValue) => {
      expect(parseJSON(input)).toBeTruthy();
      expect(parseJSON(input)).toStrictEqual(result);
    }
  );
  it.each<boolean | number | { base: string }>([false, 1, { base: 'small' }])(
    'should return not formatted string for %s',
    (input) => {
      expect(parseJSON(input)).toEqual(input);
    }
  );
});
