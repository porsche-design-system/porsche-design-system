import { getIconLinks } from '../../../src';
import { ICON_NAMES, IconNameCamelCase } from '@porsche-design-system/icons';
import { paramCase } from 'change-case';
import { render } from '@testing-library/react';

const hash = '[a-z0-9]{32}';
const baseHrefCom = 'https://cdn.ui.porsche.com/porsche-design-system/icons';
const baseHrefCn = 'https://cdn.ui.porsche.cn/porsche-design-system/icons';

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

describe('format: html', () => {
  it('should return "arrowHeadRight" link by default', () => {
    const result = getIconLinks();
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/arrow-head-right.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default "arrowHeadRight" China CDN link', () => {
    const result = getIconLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCn}/arrow-head-right.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getIconLinks({ icons: ['truck', 'volumeUp', 'mobile'] });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/truck.min.${hash}.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/volume-up.min.${hash}.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/mobile.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
    );

    expect(result).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconNameCamelCase) => {
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

describe('format jsx', () => {
  it('should return "arrowHeadRight" link by default', () => {
    const { container } = render(getIconLinks({ format: 'jsx' }));
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/arrow-head-right.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="true">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return "arrowHeadRight" link for china cdn', () => {
    const { container } = render(getIconLinks({ format: 'jsx', cdn: 'cn' }));
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCn}/arrow-head-right.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="true">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return multiple links', () => {
    const { container } = render(getIconLinks({ format: 'jsx', icons: ['truck', 'volumeUp', 'mobile'] }));
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/truck.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="true"><link rel="prefetch" href="${baseHrefCom}/volume-up.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="true"><link rel="prefetch" href="${baseHrefCom}/mobile.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="true">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconNameCamelCase) => {
    it(`should match regex for ['${iconName}']`, () => {
      const { container } = render(getIconLinks({ format: 'jsx', icons: [iconName] }));
      const regex = new RegExp(
        `^<link rel="prefetch" href="${baseHrefCom}/${paramCase(
          iconName
        )}.min.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin="true">$`
      );
      expect(container.innerHTML).toMatch(regex);
    });
  });
});

describe('withoutTags: true', () => {
  it('should return "arrowHeadRight" url by default', () => {
    const result = getIconLinks({ withoutTags: true });
    const regex = new RegExp(`^${baseHrefCom}/arrow-head-right.min.${hash}.svg$`);

    expect(result.length).toBe(1);
    expect(result[0]).toMatch(regex);
  });

  it('should return default "arrowHeadRight" China CDN url', () => {
    const result = getIconLinks({ withoutTags: true, cdn: 'cn' });
    const regex = new RegExp(`^${baseHrefCn}/arrow-head-right.min.${hash}.svg$`);

    expect(result.length).toBe(1);
    expect(result[0]).toMatch(regex);
  });

  it('should return multiple urls', () => {
    const result = getIconLinks({ withoutTags: true, icons: ['truck', 'volumeUp', 'mobile'] });
    const regexTruck = new RegExp(`^${baseHrefCom}/truck.min.${hash}.svg$`);
    const regexVolumeUp = new RegExp(`^${baseHrefCom}/volume-up.min.${hash}.svg$`);
    const regexMobile = new RegExp(`^${baseHrefCom}/mobile.min.${hash}.svg$`);

    expect(result.length).toBe(3);
    expect(result[0]).toMatch(regexTruck);
    expect(result[1]).toMatch(regexVolumeUp);
    expect(result[2]).toMatch(regexMobile);
  });

  ICON_NAMES.forEach((iconName: IconNameCamelCase) => {
    it(`should return icon url for ['${iconName}']`, () => {
      const result = getIconLinks({ withoutTags: true, icons: [iconName] });
      const regex = new RegExp(`^${baseHrefCom}/${paramCase(iconName)}.min.${hash}.svg$`);

      expect(result.length).toBe(1);
      expect(result[0]).toMatch(regex);
    });
  });
});
