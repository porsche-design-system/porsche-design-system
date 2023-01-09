import { getInitialStyles, getNormalizeStyles } from '../../../src';
import { render } from '@testing-library/react';

jest.mock('../../../src/shared');

describe('format: html', () => {
  it('should return normalize styles', () => {
    const result = getNormalizeStyles();
    // TODO: check if there is a better solution then snapshot?
    expect(result).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return normalize styles', () => {
    const { container } = render(getNormalizeStyles({ format: 'jsx' }));

    // TODO: check if there is a better solution then snapshot?
    expect(container.innerHTML).toMatchSnapshot();
  });
});
