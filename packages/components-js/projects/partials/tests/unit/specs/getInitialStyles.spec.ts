import { getInitialStyles } from '../../../src';
import type { SkeletonTagName } from '../../../src';
import { render } from '@testing-library/react';
import { INTERNAL_TAG_NAMES, TAG_NAMES, TAG_NAMES_WITH_SKELETON } from '@porsche-design-system/shared';

const filteredTagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));
const tagNames = filteredTagNames.join(',');
const prefixedTagNames = filteredTagNames.map((x) => `custom-prefix-${x}`).join(',');

describe('format: html', () => {
  it('should return core styles', () => {
    const result = getInitialStyles();
    const regex = new RegExp(`<style>${tagNames}{visibility:hidden}</style>`);
    expect(result).toMatch(regex);
  });

  it('should return core and skeleton styles', () => {
    const result = getInitialStyles({ skeletonTagNames: TAG_NAMES_WITH_SKELETON as SkeletonTagName[] });
    expect(result).toMatchSnapshot();
  });

  it('should add custom prefixes to component names', () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    const regex = new RegExp(`<style>${prefixedTagNames}{visibility:hidden}</style>`);
    expect(result).toMatch(regex);
  });

  it('should add custom prefixes to skeleton component names', () => {
    const result = getInitialStyles({
      prefix: 'custom-prefix',
      skeletonTagNames: TAG_NAMES_WITH_SKELETON as SkeletonTagName[],
    });
    expect(result).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return core styles', () => {
    const { container } = render(getInitialStyles({ format: 'jsx' }));
    const regex = new RegExp(`<style>${tagNames}{visibility:hidden}</style>`);
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return core and skeleton styles', () => {
    const result = getInitialStyles({
      format: 'jsx',
      skeletonTagNames: TAG_NAMES_WITH_SKELETON as SkeletonTagName[],
    });
    expect(result).toMatchSnapshot();
  });

  it('should add custom prefix to component names', () => {
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

describe('skeletonTagNames subset', () => {
  const skeletonTagNamesWithoutButton = TAG_NAMES_WITH_SKELETON.filter((x) => x !== 'p-button');

  it('should return core and p-button skeleton styles', () => {
    const result = getInitialStyles({ skeletonTagNames: ['p-button'] });

    expect(result.includes('p-button:not(.hydrated)')).toBe(true);

    skeletonTagNamesWithoutButton.forEach((tagName) =>
      expect(result.includes(`${tagName}:not(.hydrated)`)).toBe(false)
    );

    expect(result).toMatchSnapshot();
  });

  it('should return prefixed core and p-button skeleton styles', () => {
    const prefixedTagNamesWithSkeleton = skeletonTagNamesWithoutButton.map((x) => `custom-prefix-${x}`);

    const result = getInitialStyles({ prefix: 'custom-prefix', skeletonTagNames: ['p-button'] });

    expect(result.includes('custom-prefix-p-button:not(.hydrated)')).toBe(true);

    prefixedTagNamesWithSkeleton.forEach((tagName) => expect(result.includes(`${tagName}:not(.hydrated)`)).toBe(false));

    expect(result).toMatchSnapshot();
  });
});
