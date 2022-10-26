import { parseJSON } from './breakpoint-customizable';

describe('parseJSON()', () => {
  it.each<string>([
    '{base: true, s: false}',
    "{base: 'initial', l: 'equal'}",
    '{base: "initial", l: "equal"}',
    '{"base": "right", "s": "left"}',
    '{base: 36, xs: 6, s: 4, m: 16, l: 2}',
    '{xs: "1:1", s: "3:4", m: "4:3", l: "9:16", xl: "16:9"}',
  ])('should return parsed object for %s', (input) => {
    expect(parseJSON(input)).toBeTruthy();
  });
  it('should return not formatted string for boolean type', () => {
    expect(parseJSON(false)).toEqual(false);
  });
  it('should return not formatted string for number type', () => {
    expect(parseJSON(1)).toEqual(1);
  });
  it('should return not formatted string for object type', () => {
    expect(parseJSON({ base: 'small' })).toEqual({ base: 'small' });
  });
});
