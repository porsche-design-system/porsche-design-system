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
});
