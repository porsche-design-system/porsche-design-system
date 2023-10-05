import * as path from 'path';
import * as fs from 'fs';
import * as sass from 'sass';

const borderVariables = fs.readFileSync(path.resolve('./src/scss/lib/_border.scss'), 'utf8');
const themeVariables = fs.readFileSync(path.resolve('./src/scss/lib/_theme.scss'), 'utf8');
const skeletonMixin = fs.readFileSync(path.resolve('./src/scss/_skeleton.scss'), 'utf8').replace(/@import.*;/g, '');

describe('pds-skeleton()', () => {
  it.each([{}, { borderRadius: 'small' }, { borderRadius: 'medium' }, { borderRadius: '6px' }])(
    'should return correct css for opts: %s',
    (opts) => {
      const result = sass.compileString(`
${borderVariables} ${themeVariables} ${skeletonMixin} div {
  @include pds-skeleton(${Object.values(opts).join(', ')});
}`);
      expect(result.css).toMatchSnapshot();
    }
  );
});
