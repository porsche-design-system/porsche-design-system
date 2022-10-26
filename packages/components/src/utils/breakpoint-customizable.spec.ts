import { parseJSON } from './breakpoint-customizable';

describe('parseJSON()', () => {
  it.each<string>([
    '{ base: true, s: false }',
    '{ "m": "right", s: "left" }',
    '{ base: "small", l: "medium", "xl": "large" } ',
    '{ base: 36, xs: 6, s: 4, m: 16, l:2, "xl":16 }',
    '{xs: "inherit", m: "default"}',
    ' { xs: "1:1", s: "3:4", m: "4:3", l: "9:16", xl: "16:9" }',
    "{ base: 'column', s: 'row' }",
    "{ l: 'inherit', s: 'default' }",
    " {xl: 'initial', l: 'equal'} ",
  ])('should return parsed object for %s', (input) => {
    expect(parseJSON(input)).toBeTruthy();
  });
  it('should convert single quotes to double quotes', () => {
    expect(parseJSON(" { base: 'column', s: 'row' }")).toEqual({ base: 'column', s: 'row' });
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
