import * as fs from 'fs';
import * as path from 'path';
import * as sass from 'sass';
import { describe, expect, it } from 'vitest';

const breakpointVariables = fs.readFileSync(path.resolve('dist/_breakpoint.scss'), 'utf8');
const mediaQueryMixin = fs.readFileSync(path.resolve('src/_media-query.scss'), 'utf8');
const mixin = mediaQueryMixin.replace("@use 'lib/breakpoint';", breakpointVariables).replace(/breakpoint\./g, '');

const getCss = (scenario: string): string => {
  return sass.compileString(`${mixin} ${scenario}`).css;
};

describe('pds-media-query-min()', () => {
  it.each(['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'])('should return correct css for breakpoint: %s', (breakpoint) => {
    const result = getCss(`div {
      @include pds-media-query-min(${breakpoint}) {
        color: deeppink;
      }
    }`);
    expect(result).toMatchSnapshot();
  });
});

describe('pds-media-query-max()', () => {
  it.each(['xs', 's', 'm', 'l', 'xl', 'xxl'])('should return correct css for breakpoint: %s', (breakpoint) => {
    const result = getCss(`div {
      @include pds-media-query-max(${breakpoint}) {
        color: deeppink;
      }
    }`);
    expect(result).toMatchSnapshot();
  });
});

describe('pds-media-query-min-max()', () => {
  it.each([
    ['base', 'xs'],
    ['xs', 's'],
    ['s', 'm'],
    ['m', 'l'],
    ['l', 'xl'],
    ['xl', 'xxl'],
  ])('should return correct css for breakpoint range: %s - %s', (min, max) => {
    const result = getCss(`div {
      @include pds-media-query-min-max(${min}, ${max}) {
        color: deeppink;
      }
    }`);
    expect(result).toMatchSnapshot();
  });
});
