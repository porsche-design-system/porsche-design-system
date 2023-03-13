import { getFontFaceStylesheet } from '../../../src';
import { render } from '@testing-library/react';

const baseUrlCdnCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com';
const baseUrlCdnCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn';
const hrefCom = `${baseUrlCdnCom}\\/porsche-design-system\\/styles\\/font-face\\.min\\.[a-z0-9]{32}\\.css`;
const hrefCn = `${baseUrlCdnCn}\\/porsche-design-system\\/styles\\/font-face\\.min\\.cn\\.[a-z0-9]{32}\\.css`;

jest.mock('../../../src/shared');

describe('format: html', () => {
  it('should return links', () => {
    const result: string = getFontFaceStylesheet();
    const regex = new RegExp(
      `^<link rel=preconnect href=${baseUrlCdnCom} crossorigin><link rel=dns-prefetch href=${baseUrlCdnCom} crossorigin><link rel=stylesheet href=${hrefCom} type=text/css crossorigin>$`
    );

    expect(result).toMatch(regex);
  });

  it('should return links for china cdn', () => {
    const result: string = getFontFaceStylesheet({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=preconnect href=${baseUrlCdnCn} crossorigin><link rel=dns-prefetch href=${baseUrlCdnCn} crossorigin><link rel=stylesheet href=${hrefCn} type=text/css crossorigin>$`
    );

    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return links', () => {
    const result: JSX.Element = getFontFaceStylesheet({ format: 'jsx' });
    const { container } = render(result);
    const regex = new RegExp(
      `^<link rel="preconnect" href="${baseUrlCdnCom}" crossorigin=""><link rel="dns-prefetch" href="${baseUrlCdnCom}" crossorigin=""><link rel="stylesheet" href="${hrefCom}" type="text/css" crossorigin="">$`
    );

    expect(container.innerHTML).toMatch(regex);
  });

  it('should return links for china cdn', () => {
    const result: JSX.Element = getFontFaceStylesheet({ cdn: 'cn', format: 'jsx' });
    const { container } = render(result);
    const regex = new RegExp(
      `^<link rel="preconnect" href="${baseUrlCdnCn}" crossorigin=""><link rel="dns-prefetch" href="${baseUrlCdnCn}" crossorigin=""><link rel="stylesheet" href="${hrefCn}" type="text/css" crossorigin="">$`
    );

    expect(container.innerHTML).toMatch(regex);
  });
});
