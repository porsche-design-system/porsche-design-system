import { getFontFaceStylesheet } from '../../../src';
import { render } from '@testing-library/react';

const baseUrlCdnCom = 'https://cdn.ui.porsche.com';
const baseUrlCdnCn = 'https://cdn.ui.porsche.cn';
const hrefCom = `${baseUrlCdnCom}/porsche-design-system/styles/font-face.min.[a-z0-9]{32}.css`;
const hrefCn = `${baseUrlCdnCn}/porsche-design-system/styles/font-face.min.cn.[a-z0-9]{32}.css`;

describe('format: html', () => {
  it('should return links', () => {
    const result = getFontFaceStylesheet();
    const regex = new RegExp(
      `^<link rel=preconnect href=${baseUrlCdnCom} crossorigin><link rel=dns-prefetch href=${baseUrlCdnCom} crossorigin><link rel=stylesheet href=${hrefCom} type=text/css crossorigin>$`
    );

    expect(result).toMatch(regex);
  });

  it('should return links for china cdn', () => {
    const result = getFontFaceStylesheet({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=preconnect href=${baseUrlCdnCn} crossorigin><link rel=dns-prefetch href=${baseUrlCdnCn} crossorigin><link rel=stylesheet href=${hrefCn} type=text/css crossorigin>$`
    );

    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return links', () => {
    const { container } = render(getFontFaceStylesheet({ format: 'jsx' }));
    const regex = new RegExp(
      `^<link rel="preconnect" href="${baseUrlCdnCom}" crossorigin="true"><link rel="dns-prefetch" href="${baseUrlCdnCom}" crossorigin="true"><link rel="stylesheet" href="${hrefCom}" type="text/css" crossorigin="true">$`
    );

    expect(container.innerHTML).toMatch(regex);
  });

  it('should return links for china cdn', () => {
    const { container } = render(getFontFaceStylesheet({ cdn: 'cn', format: 'jsx' }));
    const regex = new RegExp(
      `^<link rel="preconnect" href="${baseUrlCdnCn}" crossorigin="true"><link rel="dns-prefetch" href="${baseUrlCdnCn}" crossorigin="true"><link rel="stylesheet" href="${hrefCn}" type="text/css" crossorigin="true">$`
    );

    expect(container.innerHTML).toMatch(regex);
  });
});

describe('withoutTags: true', () => {
  it('should return only url', () => {
    const result = getFontFaceStylesheet({ withoutTags: true });
    expect(result).toMatch(new RegExp(hrefCom));
  });

  it('should return only url for china cdn', () => {
    const result = getFontFaceStylesheet({ withoutTags: true, cdn: 'cn' });
    expect(result).toMatch(new RegExp(hrefCn));
  });
});
