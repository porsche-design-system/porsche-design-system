import { getInitialStyles } from '../../../src';
import { render } from '@testing-library/react';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';

const filteredTagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));
const tagNames = filteredTagNames.join(',');
const prefixedTagNames = filteredTagNames.map((x) => `custom-prefix-${x}`).join(',');

describe('format: html', () => {
  it('should return style element with Porsche Design System components', () => {
    const result = getInitialStyles();
    const regex = new RegExp(`<style>${tagNames}{visibility:hidden}</style>`);
    expect(result).toMatch(regex);
  });

  it('should add custom prefixes to style names', () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    const regex = new RegExp(`<style>${prefixedTagNames}{visibility:hidden}</style>`);
    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return core styles', () => {
    const { container } = render(getInitialStyles({ format: 'jsx' }));
    const regex = new RegExp(`<style>${tagNames}{visibility:hidden}</style>`);
    expect(container.innerHTML).toMatch(regex);
  });

  it('should add custom prefix', () => {
    const { container } = render(getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' }));
    const regex = new RegExp(`<style>${prefixedTagNames}{visibility:hidden}</style>`);
    expect(container.innerHTML).toMatch(regex);
  });
});

describe('withoutTags: true', () => {
  it('should return core styles without style tag', () => {
    const result = getInitialStyles({ withoutTags: true });
    const regex = new RegExp(`${tagNames}{visibility:hidden}`);
    expect(result).toMatch(regex);
  });
});
