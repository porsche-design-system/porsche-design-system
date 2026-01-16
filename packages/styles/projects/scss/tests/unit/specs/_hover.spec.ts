import * as fs from 'fs';
import * as path from 'path';
import * as sass from 'sass';
import { describe, expect, it } from 'vitest';

const borderVariables = fs.readFileSync(path.resolve('dist/_border.scss'), 'utf8');
// const frostedGlassVariables = fs.readFileSync(path.resolve('./src/scss/lib/_frosted-glass.scss'), 'utf8');
const motionVariables = fs.readFileSync(path.resolve('dist/_motion.scss'), 'utf8');
const themeVariables = fs.readFileSync(path.resolve('dist/_theme.scss'), 'utf8');
const hoverMixin = fs
  .readFileSync(path.resolve('src/_hover.scss'), 'utf8')
  .replace(/@use\s'lib.*;/g, '')
  .replace(/border\./g, '')
  .replace(/theme\./g, '')
  .replace(/motion\./g, '');

describe('pds-hover()', () => {
  it.each([{}, { borderRadius: 'small' }, { borderRadius: 'medium' }, { borderRadius: '6px' }])(
    'should return correct css for opts: %s',
    (opts) => {
      const result = sass.compileString(`${borderVariables} ${motionVariables} ${themeVariables} ${hoverMixin} div {
      @include pds-hover(${opts ? Object.values(opts).join(', ') : ''});
    }`);
      expect(result.css).toMatchSnapshot();
    }
  );
});
