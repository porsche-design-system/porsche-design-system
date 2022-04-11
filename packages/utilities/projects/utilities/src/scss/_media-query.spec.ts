import * as path from 'path';
import * as fs from 'fs';
import * as sass from 'sass';

const breakpointVariables = fs.readFileSync(path.resolve('./src/scss/lib/_breakpoint.scss'), 'utf8');
const mediaQueryMixin = fs.readFileSync(path.resolve('./src/scss/_media-query.scss'), 'utf8');
const mixin = mediaQueryMixin.replace("@import 'lib/_breakpoint.scss';", breakpointVariables);

describe('pds-media-query-min()', () => {
  it.each(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'])('should return correct css for breakpoint: %s', (breakpoint) => {
    const result = sass.compileString(`${mixin} div {
      @include pds-media-query-min(${breakpoint}) {
        color: deeppink;
      }
    }`);
    expect(result.css).toMatchSnapshot();
  });
});

describe('pds-media-query-max()', () => {
  it.each(['xs', 's', 'm', 'l', 'xl', 'xxl'])('should return correct css for breakpoint: %s', (breakpoint) => {
    const result = sass.compileString(`${mixin} div {
      @include pds-media-query-max(${breakpoint}) {
        color: deeppink;
      }
    }`);
    expect(result.css).toMatchSnapshot();
  });
});

describe('pds-media-query-min-max()', () => {
  it.each([
    ['xxs', 'xs'],
    ['xs', 's'],
    ['s', 'm'],
    ['m', 'l'],
    ['l', 'xl'],
    ['xl', 'xxl'],
  ])('should return correct css for breakpoint range: %s - %s', (min, max) => {
    const result = sass.compileString(`${mixin} div {
      @include pds-media-query-min-max(${min}, ${max}) {
        color: deeppink;
      }
    }`);
    expect(result.css).toMatchSnapshot();
  });
});
