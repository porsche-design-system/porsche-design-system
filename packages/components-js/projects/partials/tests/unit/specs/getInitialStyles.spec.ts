import { getInitialStyles } from '../../../src';
import { render } from '@testing-library/react';

// to skip validation
jest.mock('../../../src/shared');

describe('format: html', () => {
  it('should return core styles', () => {
    const result: string = getInitialStyles();
    expect(result).toMatchSnapshot();
  });

  it('should add custom prefixes to component names', () => {
    const result: string = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return core styles', () => {
    const result: JSX.Element = getInitialStyles({ format: 'jsx' });
    const { container } = render(result);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should add custom prefix to component names', () => {
    const result: JSX.Element = getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' });
    const { container } = render(result);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
