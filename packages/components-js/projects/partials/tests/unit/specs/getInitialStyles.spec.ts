import { getInitialStyles } from '../../../src';
import { render } from '@testing-library/react';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';

const filteredTagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));
const tagNames = filteredTagNames.join();
const prefixedTagNames = filteredTagNames.map((x) => `custom-prefix-${x}`).join();

// to skip validation
jest.mock('../../../src/shared');

describe('format: html', () => {
  it('should return core styles', () => {
    const result = getInitialStyles();
    expect(result).toMatchSnapshot();
  });

  it('should add custom prefixes to component names', () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return core styles', () => {
    const { container } = render(getInitialStyles({ format: 'jsx' }));
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should add custom prefix to component names', () => {
    const { container } = render(getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' }));
    expect(container.innerHTML).toMatchSnapshot();
  });
});
