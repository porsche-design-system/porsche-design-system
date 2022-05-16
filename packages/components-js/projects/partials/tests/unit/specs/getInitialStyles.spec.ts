import { getInitialStyles } from '../../../src';
import { render } from '@testing-library/react';
import { INTERNAL_TAG_NAMES, SKELETON_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { describeIfSkeletonsActive, itIfSkeletonsActive } from '@porsche-design-system/shared/testing';

const filteredTagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));
const tagNames = filteredTagNames.join(',');
const prefixedTagNames = filteredTagNames.map((x) => `custom-prefix-${x}`).join(',');

jest.mock('../../../src/shared');

describe('format: html', () => {
  it('should return core styles', () => {
    const result = getInitialStyles();
    const regex = new RegExp(
      `<style pds-initial-styles>${tagNames}{visibility:hidden}.hydrated{visibility:inherit}</style>`
    );
    expect(result).toMatch(regex);
  });

  itIfSkeletonsActive('should return core and skeleton styles', () => {
    // @ts-ignore
    const result = getInitialStyles({ skeletonTagNames: SKELETON_TAG_NAMES });
    expect(result).toMatchSnapshot();
  });

  it('should add custom prefixes to component names', () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    const regex = new RegExp(
      `<style pds-initial-styles>${prefixedTagNames}{visibility:hidden}.hydrated{visibility:inherit}</style>`
    );
    expect(result).toMatch(regex);
  });

  itIfSkeletonsActive('should add custom prefixes to skeleton component names', () => {
    const result = getInitialStyles({
      prefix: 'custom-prefix',
      // @ts-ignore
      skeletonTagNames: SKELETON_TAG_NAMES,
    });
    expect(result).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return core styles', () => {
    const { container } = render(getInitialStyles({ format: 'jsx' }));
    const regex = new RegExp(
      `<style pds-initial-styles="true">${tagNames}{visibility:hidden}.hydrated{visibility:inherit}</style>`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  itIfSkeletonsActive('should return core and skeleton styles', () => {
    // @ts-ignore
    const result = getInitialStyles({
      format: 'jsx',
      // @ts-ignore
      skeletonTagNames: SKELETON_TAG_NAMES,
    });
    expect(result).toMatchSnapshot();
  });

  it('should add custom prefix to component names', () => {
    const { container } = render(getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' }));
    const regex = new RegExp(
      `<style pds-initial-styles="true">${prefixedTagNames}{visibility:hidden}.hydrated{visibility:inherit}</style>`
    );
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

// TODO: enable this test when adjust cleanup script to not remove wrong styles (e.g. when using p-text-field-wrapper in skeletonTagNames, the after is removed) is done
xdescribe('skeletonTagNames subset', () => {
  const skeletonTagNamesWithoutButton = SKELETON_TAG_NAMES.filter((x) => x !== 'p-button');

  it('should return core and p-button skeleton styles', () => {
    // @ts-ignore
    const result = getInitialStyles({ skeletonTagNames: ['p-button'] });

    expect(result.includes('p-button:not(.hydrated)')).toBe(true);

    skeletonTagNamesWithoutButton.forEach((tagName) =>
      expect(result.includes(`${tagName}:not(.hydrated)`)).toBe(false)
    );

    expect(result).toMatchSnapshot();
  });

  it('should return prefixed core and p-button skeleton styles', () => {
    const prefixedTagNamesWithSkeleton = skeletonTagNamesWithoutButton.map((x) => `custom-prefix-${x}`);
    // @ts-ignore
    const result = getInitialStyles({ prefix: 'custom-prefix', skeletonTagNames: ['p-button'] });

    expect(result.includes('custom-prefix-p-button:not(.hydrated)')).toBe(true);

    prefixedTagNamesWithSkeleton.forEach((tagName) => expect(result.includes(`${tagName}:not(.hydrated)`)).toBe(false));

    expect(result).toMatchSnapshot();
  });
});

describeIfSkeletonsActive('validation', () => {
  it('should throw error on invalid skeleton tag names parameter', () => {
    expect(() =>
      // @ts-ignore
      getInitialStyles({ skeletonTagNames: ['some-invalid-component'] as any[] })
    ).toThrowErrorMatchingSnapshot();
  });
});
