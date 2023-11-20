import * as path from 'path';
import * as fs from 'fs';
import * as sass from 'sass';

const borderVariables = fs.readFileSync(path.resolve('./src/scss/lib/_border.scss'), 'utf8');
const frostedGlassVariables = fs.readFileSync(path.resolve('./src/scss/lib/_frosted-glass.scss'), 'utf8');
const motionVariables = fs.readFileSync(path.resolve('./src/scss/lib/_motion.scss'), 'utf8');
const themeVariables = fs.readFileSync(path.resolve('./src/scss/lib/_theme.scss'), 'utf8');
const hoverMixin = fs.readFileSync(path.resolve('./src/scss/_hover.scss'), 'utf8').replace(/@import.*;/g, '');

describe('pds-hover()', () => {
  it.each([{}, { borderRadius: 'small' }, { borderRadius: 'medium' }, { borderRadius: '6px' }])(
    'should return correct css for opts: %s',
    (opts) => {
      const result =
        sass.compileString(`${borderVariables} ${frostedGlassVariables} ${motionVariables} ${themeVariables} ${hoverMixin} div {
      @include pds-hover(${opts ? Object.values(opts).join(', ') : ''});
    }`);
      expect(result.css).toMatchSnapshot();
    }
  );
});
