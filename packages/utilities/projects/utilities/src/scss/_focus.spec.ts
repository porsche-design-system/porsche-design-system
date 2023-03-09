import * as path from 'path';
import * as fs from 'fs';
import * as sass from 'sass';

const borderVariables = fs.readFileSync(path.resolve('./src/scss/lib/_border.scss'), 'utf8');
const themeVariables = fs.readFileSync(path.resolve('./src/scss/lib/_theme.scss'), 'utf8');
const focusMixin = fs.readFileSync(path.resolve('./src/scss/_focus.scss'), 'utf8').replace(/@import.*;/g, '');

describe('pds-focus()', () => {
  it.each([
    {},
    { offset: 'small', borderRadius: 'small' },
    { offset: 'medium', borderRadius: 'medium' },
    { inset: '-4px -2px', borderRadius: '6px' },
  ])('should return correct css for opts: %s', (opts) => {
    const result = sass.compileString(`${borderVariables} ${themeVariables} ${focusMixin} div {
      @include pds-focus(${opts ? Object.values(opts).join(', ') : ''});
    }`);
    expect(result.css).toMatchSnapshot();
  });
});
