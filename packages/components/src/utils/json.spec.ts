import { parseJSONAttribute } from './json';

describe('parseJSONAttribute()', () => {
  it.each<string | object>([
    {
      'aria-label': 'Some label',
    },
    "{'aria-label': 'Some label'}",
    "{'aria-label':'Some label'}",
    '{"aria-label": "Some label"}',
    '{"aria-label":"Some label"}',
  ])('should return parsed object for %o', (input) => {
    expect(parseJSONAttribute(input)).toEqual({
      'aria-label': 'Some label',
    });
  });

  it('should return parsed object if key contains an url', () => {
    expect(parseJSONAttribute("{ href: 'https://www.porsche.com' }")).toEqual({
      href: 'https://www.porsche.com',
    });
  });

  it('should return parsed object if value is a number', () => {
    expect(parseJSONAttribute('{ scrollToPosition: 4 }')).toEqual({
      scrollToPosition: 4,
    });
  });
});
