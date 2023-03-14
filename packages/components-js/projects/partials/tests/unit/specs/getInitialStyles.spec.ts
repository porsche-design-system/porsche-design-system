import { getInitialStyles } from '../../../src';
import { render } from '@testing-library/react';
import * as prettier from 'prettier';

// to skip validation
jest.mock('../../../src/shared');

const getFormattedCSSWithoutTag = (style: string): string => {
  return prettier.format(style.replace(/<style.*>([\s\S]*)<\/style>/g, '$1'), { parser: 'css' });
};

describe('format: html', () => {
  it('should return core styles', () => {
    const result: string = getInitialStyles();
    expect(result).toMatchSnapshot();
    expect(getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });

  it('should add custom prefixes to component names', () => {
    const result: string = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).toMatchSnapshot();
    expect(getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return core styles', () => {
    const result: JSX.Element = getInitialStyles({ format: 'jsx' });
    const { container } = render(result);
    expect(container.innerHTML).toMatchSnapshot();
    expect(getFormattedCSSWithoutTag(container.innerHTML)).toMatchSnapshot();
  });

  it('should add custom prefix to component names', () => {
    const result: JSX.Element = getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' });
    const { container } = render(result);
    expect(container.innerHTML).toMatchSnapshot();
    expect(getFormattedCSSWithoutTag(container.innerHTML)).toMatchSnapshot();
  });
});
