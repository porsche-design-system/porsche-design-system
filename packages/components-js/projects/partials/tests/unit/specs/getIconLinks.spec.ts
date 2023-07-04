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
    let errorMessage: string = '';
    try {
      getIconLinks({ icons: ['some-invalid-icon'] as any[] });
    } catch (e) {
      errorMessage = (e as Error).message;
    }

    expect(errorMessage).toContain('The following supplied icon names are invalid:');
    expect(errorMessage).toContain('some-invalid-icon');
  });
});

describe('format: html', () => {
  it('should return default link', () => {
    const result: string = getIconLinks();
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/arrow-right.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default link for china cdn', () => {
    const result: string = getIconLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCn}/arrow-right.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result: string = getIconLinks({ icons: ['truck', 'volume-up', 'mobile'] });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/truck.min.${hash}.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/volume-up.min.${hash}.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/mobile.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );

    expect(result).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconName) => {
    it(`should match regex for ['${iconName}']`, () => {
      const result: string = getIconLinks({ icons: [iconName] });
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
    const result: JSX.Element = getIconLinks({ format: 'jsx' });
    const { container } = render(result);
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/arrow-right.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return default link for china cdn', () => {
    const result: JSX.Element = getIconLinks({ format: 'jsx', cdn: 'cn' });
    const { container } = render(result);
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCn}/arrow-right.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result: JSX.Element = getIconLinks({ format: 'jsx', icons: ['truck', 'volume-up', 'mobile'] });
    const { container } = render(result);
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/truck.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin=""><link rel="prefetch" href="${baseHrefCom}/volume-up.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin=""><link rel="prefetch" href="${baseHrefCom}/mobile.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconName) => {
    it(`should match regex for ['${iconName}']`, () => {
      const result: JSX.Element = getIconLinks({ format: 'jsx', icons: [iconName] });
      const { container } = render(result);
      const regex = new RegExp(
        `^<link rel="prefetch" href="${baseHrefCom}/${paramCase(
          iconName
        )}.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="">$`
      );
      expect(container.innerHTML).toMatch(regex);
    });
  });
});
