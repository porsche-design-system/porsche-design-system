import { getFontFaceStylesheet } from '../../../src';
import { render } from '@testing-library/react';

describe('getFontFaceStylesheet()', () => {
  const baseUrlCom = 'https://cdn.ui.porsche.com';
  const baseUrlCn = 'https://cdn.ui.porsche.cn';
  const hrefCom = `${baseUrlCom}/porsche-design-system/styles/font-face.min.[a-z0-9]{32}.css`;
  const hrefCn = `${baseUrlCn}/porsche-design-system/styles/font-face.min.cn.[a-z0-9]{32}.css`;

  describe('format: html', () => {
    it('should return default links', () => {
      const result = getFontFaceStylesheet();
      const regex = new RegExp(
        `^<link rel=preconnect href=${baseUrlCom} crossorigin><link rel=dns-prefetch href=${baseUrlCom} crossorigin><link rel=stylesheet href=${hrefCom} type=text/css crossorigin>$`
      );

      expect(result).toMatch(regex);
    });

    it('should return default links for china cdn', () => {
      const result = getFontFaceStylesheet({ cdn: 'cn' });
      const regex = new RegExp(
        `^<link rel=preconnect href=${baseUrlCn} crossorigin><link rel=dns-prefetch href=${baseUrlCn} crossorigin><link rel=stylesheet href=${hrefCn} type=text/css crossorigin>$`
      );

      expect(result).toMatch(regex);
    });
  });

  describe('format: jsx', () => {
    it('should return default links as jsx', () => {
      const { container } = render(getFontFaceStylesheet({ format: 'jsx' }));
      const regex = new RegExp(
        `^<link rel="preconnect" href="${baseUrlCom}" crossorigin="true"><link rel="dns-prefetch" href="${baseUrlCom}" crossorigin="true"><link rel="stylesheet" href="${hrefCom}" type="text/css" crossorigin="true">$`
      );

      expect(container.innerHTML).toMatch(regex);
    });

    it('should return jsx links for china cdn', () => {
      const { container } = render(getFontFaceStylesheet({ cdn: 'cn', format: 'jsx' }));
      const regex = new RegExp(
        `^<link rel="preconnect" href="${baseUrlCn}" crossorigin="true"><link rel="dns-prefetch" href="${baseUrlCn}" crossorigin="true"><link rel="stylesheet" href="${hrefCn}" type="text/css" crossorigin="true">$`
      );

      expect(container.innerHTML).toMatch(regex);
    });
  });

  describe('withoutTags: true', () => {
    it('should return only href', () => {
      const result = getFontFaceStylesheet({ withoutTags: true });
      expect(result).toMatch(new RegExp(`${hrefCom}`));
    });

    it('should return only href for china cdn', () => {
      const result = getFontFaceStylesheet({ withoutTags: true, cdn: 'cn' });
      expect(result).toMatch(new RegExp(`${hrefCn}`));
    });
  });
});
