import * as fs from 'fs';
import * as path from 'path';
import * as sass from 'sass';
import { describe, expect, it } from 'vitest';

const borderVariables = fs.readFileSync(path.resolve('dist/_border.scss'), 'utf8');
const motionVariables = fs.readFileSync(path.resolve('dist/_motion.scss'), 'utf8');
const themeVariables = fs.readFileSync(path.resolve('dist/_color.scss'), 'utf8');
const skeletonMixin = fs
  .readFileSync(path.resolve('src/_skeleton.scss'), 'utf8')
  .replace(/@use.*;/g, '')
  .replace(/border\./g, '')
  .replace(/color\./g, '')
  .replace(/motion\./g, '');

describe('pds-skeleton()', () => {
  it.each([{}, { theme: 'light' }, { theme: 'dark' }])('should return correct css for opts: %s', (opts) => {
    const result = sass.compileString(`
${borderVariables} ${motionVariables} ${themeVariables} ${skeletonMixin} div {
  @include pds-skeleton(${Object.values(opts).join(', ')});
}`);
    expect(result.css).toMatchSnapshot();
  });
});
