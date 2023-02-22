import { getIconLinks } from '../../../src';
import type { IconName } from '@porsche-design-system/icons';
import { ICON_NAMES } from '@porsche-design-system/icons';
import { paramCase } from 'change-case';
import { render } from '@testing-library/react';

const hash = '[a-z0-9]{32}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com\\/porsche-design-system\\/icons';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn\\/porsche-design-system\\/icons';

jest.mock('../../../src/shared');

describe('validation', () => {
  it('should throw error on invalid icons parameter', () => {
    let error;
    try {
      getIconLinks({ icons: ['some-invalid-icon'] as any[] });
    } catch (e) {
      error = e.message;
    }

    expect(error).toContain('The following supplied icon names are invalid:');
    expect(error).toContain('some-invalid-icon');
  });
});

describe('format: html', () => {
  it('should return default link', () => {
    const result = getIconLinks();
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/arrow-right.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default link for china cdn', () => {
    const result = getIconLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCn}/arrow-right.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getIconLinks({ icons: ['truck', 'volume-up', 'mobile'] });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/truck.min.${hash}.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/volume-up.min.${hash}.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/mobile.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );

    expect(result).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconName) => {
    it(`should match regex for ['${iconName}']`, () => {
      const result = getIconLinks({ icons: [iconName] });
      const regex = new RegExp(
        `^<link rel=prefetch href=${baseHrefCom}/${paramCase(
          iconName
        )}.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
      );
      expect(result).toMatch(regex);
    });
  });
});

describe('format: jsx', () => {
  it('should return default link', () => {
    const { container } = render(getIconLinks({ format: 'jsx' }));
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/arrow-right.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return default link for china cdn', () => {
    const { container } = render(getIconLinks({ format: 'jsx', cdn: 'cn' }));
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCn}/arrow-right.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return multiple links', () => {
    const { container } = render(getIconLinks({ format: 'jsx', icons: ['truck', 'volume-up', 'mobile'] }));
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/truck.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin=""><link rel="prefetch" href="${baseHrefCom}/volume-up.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin=""><link rel="prefetch" href="${baseHrefCom}/mobile.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconName) => {
    it(`should match regex for ['${iconName}']`, () => {
      const { container } = render(getIconLinks({ format: 'jsx', icons: [iconName] }));
      const regex = new RegExp(
        `^<link rel="prefetch" href="${baseHrefCom}/${paramCase(
          iconName
        )}.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="">$`
      );
      expect(container.innerHTML).toMatch(regex);
    });
  });
});
