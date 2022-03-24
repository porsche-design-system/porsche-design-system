import type { Styles } from 'jss';
import { getMinifiedCss } from '../../../src/styles/getMinifiedCss';

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
      result: ':host{width:500px;display:block;transition:width .25s ease}',
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
    {
      input: {
        '@global': {
          div: {
            fontFamily: 'Porsche Next',
            fontStyle: 'normal',
            fontWeight: 100,
            src: `url('http://localhost:3001/fonts/porsche-next-w-la-thin.min.3e75ff5246ab2497c06392d22ff862d0.woff2') format('woff2'), url('http://localhost:3001/fonts/porsche-next-w-la-thin.min.81f87510ec34b02b07eb9945ff2da422.woff') format('woff')`,
            unicodeRange:
              'U+0020-007F, U+0080-00FF, U+0100-017F, U+0180-024F, U+0250-02AF, U+02B0-02FF, U+0300-036F, U+0E00-0E7F, U+1E00-1EFF, U+2000-206F, U+2070-209F, U+20A0-20CF, U+2100-214F, U+2150-218F, U+2190-21FF, U+2200-22FF, U+25A0-25FF, U+2600-26FF, U+FB00-FB4F, U+FE70-FEFF',
            fontDisplay: 'swap',
          },
        },
      },
      result: `div{src:url('http://localhost:3001/fonts/porsche-next-w-la-thin.min.3e75ff5246ab2497c06392d22ff862d0.woff2') format('woff2'),url('http://localhost:3001/fonts/porsche-next-w-la-thin.min.81f87510ec34b02b07eb9945ff2da422.woff') format('woff');font-style:normal;font-family:Porsche Next;font-weight:100;font-display:swap;unicode-range:U+0020-007F,U+0080-00FF,U+0100-017F,U+0180-024F,U+0250-02AF,U+02B0-02FF,U+0300-036F,U+0E00-0E7F,U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F,U+2150-218F,U+2190-21FF,U+2200-22FF,U+25A0-25FF,U+2600-26FF,U+FB00-FB4F,U+FE70-FEFF}`,
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
    expect(getMinifiedCss(input)).toBe(result);
  });
});
