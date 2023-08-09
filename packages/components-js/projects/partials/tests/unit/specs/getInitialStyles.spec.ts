import { getInitialStyles } from '../../../src';
import { render } from '@testing-library/react';
import { format } from 'prettier';

// to skip validation
jest.mock('../../../src/shared');

const getFormattedCSSWithoutTag = (style: string): Promise<string> => {
  return format(style.replace(/<style.*>([\s\S]*)<\/style>/g, '$1'), { parser: 'css' });
};

describe('format: html', () => {
  it('should return core styles', async () => {
    const result: string = getInitialStyles();
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });

  it('should add custom prefixes to component names', async () => {
    const result: string = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });

  it('should add multiple custom prefixes to component names', async () => {
    const result: string = getInitialStyles({ prefix: ['', 'some-prefix', 'another-prefix'] });
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return core styles', async () => {
    const result: JSX.Element = getInitialStyles({ format: 'jsx' });
    const { container } = render(result);
    expect(container.innerHTML).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(container.innerHTML)).toMatchSnapshot();
  });

  it('should add custom prefix to component names', async () => {
    const result: JSX.Element = getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' });
    const { container } = render(result);
    expect(container.innerHTML).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(container.innerHTML)).toMatchSnapshot();
  });

  it('should add multiple custom prefix to component names', async () => {
    const result: JSX.Element = getInitialStyles({ format: 'jsx', prefix: ['', 'some-prefix', 'another-prefix'] });
    const { container } = render(result);
    expect(container.innerHTML).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(container.innerHTML)).toMatchSnapshot();
  });
});
