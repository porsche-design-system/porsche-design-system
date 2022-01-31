import type { Styles } from 'jss';
import { getMinifiedStyles } from '../../../src/styles/getMinifiedStyles';

describe('getMinifiedCss()', () => {
  const data: { input: Styles; result: string }[] = [
    { input: { ':host': { display: 'block', marginLeft: 5 } }, result: ':host{display:block;margin-left:5px}' },
    { input: { class: { display: 'block', marginLeft: 5 } }, result: '.class{display:block;margin-left:5px}' },
    {
      input: { ':host': { display: 'block', marginLeft: '5px !important' } },
      result: ':host{display:block;margin-left:5px !important}',
    },
    {
      input: { ':host': { display: 'block', width: 500, transition: 'width .25s ease' } },
      result: ':host{display:block;width:500px;transition:width .25s ease}',
    },
    {
      input: {
        ':host': { display: 'block', marginLeft: '5px !important' },
        '@media (min-width: 760px)': { ':host': { marginRight: '5px !important' } },
      },
      result:
        ':host{display:block;margin-left:5px !important}@media(min-width:760px){:host{margin-right:5px !important}}',
    },
    {
      input: {
        ':host': { display: 'block', marginLeft: '5px !important' },
        '@media (min-width: 760px)': { ':host': { marginRight: '5px !important' } },
        '@media (min-width: 1000px)': { ':host': { marginRight: '10px !important' } },
      },
      result:
        ':host{display:block;margin-left:5px !important}@media(min-width:760px){:host{margin-right:5px !important}}@media(min-width:1000px){:host{margin-right:10px !important}}',
    },
    {
      input: {
        ':host': { display: 'block', marginLeft: '5px !important' },
        '@media (min-width: 1000px)': { ':host': { marginRight: '10px !important' } },
        '@media (min-width: 760px)': { ':host': { marginRight: '5px !important' } },
      },
      result:
        ':host{display:block;margin-left:5px !important}@media(min-width:760px){:host{margin-right:5px !important}}@media(min-width:1000px){:host{margin-right:10px !important}}',
    },
    {
      input: { '@global': { div: { display: 'block' } } },
      result: 'div{display:block}',
    },
  ];
  it.each(
    data.map(({ input, result }) => [
      JSON.stringify(input), // for test description
      JSON.stringify(result), // for test description
      input,
      result,
    ])
  )(`should transform '%s' to %s`, (_, __, input: Styles, result: string) => {
    expect(getMinifiedStyles(input)).toBe(result);
  });
});
