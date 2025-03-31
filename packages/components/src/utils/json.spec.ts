import { parseJSONAttribute } from './json';

describe('parseJSONAttribute()', () => {
  it.each<string | object>([
    {
      'aria-label': 'Some label',
    },
    "{aria-label: 'Some label'}",
    "{'aria-label': 'Some label'}",
    "{'aria-label':'Some label'}",
    '{"aria-label": "Some label"}',
    '{"aria-label":"Some label"}',
  ])('should return parsed object for %o', (input) => {
    expect(parseJSONAttribute(input)).toEqual({
      'aria-label': 'Some label',
    });
  });

  it.each<string | object>([
    {
      'aria-label': "Some label's",
    },
    {
      'aria-label': 'Some label\u0027s',
    },
    "{aria-label: 'Some label\\'s'}",
    "{'aria-label': 'Some label\\'s'}",
    "{'aria-label':'Some label\\'s'}",
    // TODO: Discuss: this won't work, but could this be a valid input (json string wrapped in single quotes)?
    // '{aria-label: "Some label\'s"}',
    // '{"aria-label":"Some label\'s"}',

    "{aria-label: 'Some label\\u0027s'}",
    "{'aria-label': 'Some label\\u0027s'}",
    "{'aria-label':'Some label\\u0027s'}",
    '{"aria-label": "Some label\\u0027s"}',
    '{"aria-label":"Some label\\u0027s"}',
  ])('should return parsed object with single quoted value for %o', (input) => {
    expect(parseJSONAttribute(input)).toEqual({
      'aria-label': "Some label's",
    });
  });

  it('should return parsed object if value is a number', () => {
    expect(parseJSONAttribute('{ scrollToPosition: 4 }')).toEqual({
      scrollToPosition: 4,
    });
  });

  it('should return parsed object if value has a colon as character', () => {
    expect(parseJSONAttribute("{ 'aria-label': 'Some: label' }")).toEqual({
      'aria-label': 'Some: label',
    });
  });
});
