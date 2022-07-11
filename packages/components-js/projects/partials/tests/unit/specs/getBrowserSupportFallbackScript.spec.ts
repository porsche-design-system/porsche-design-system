import { getBrowserSupportFallbackScript } from '../../../src';
import { render } from '@testing-library/react';

const scriptCom =
  '<script>[\\s\\S]*https://cdn.ui.porsche.com/porsche-design-system/fallbacks/browser-support.[a-z0-9]{32}.js[\\s\\S]*</script>';
const scriptCn =
  '<script>[\\s\\S]*https://cdn.ui.porsche.cn/porsche-design-system/fallbacks/browser-support.[a-z0-9]{32}.js[\\s\\S]*</script>';

jest.mock('../../../src/shared');

describe('format: html', () => {
  it('should return script with cdn url', () => {
    const result = getBrowserSupportFallbackScript();
    const regex = new RegExp(scriptCom);

    expect(result).toMatch(regex);
  });

  it('should return script with china cdn url', () => {
    const result = getBrowserSupportFallbackScript({ cdn: 'cn', format: 'html' });
    const regex = new RegExp(scriptCn);

    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return script with cdn url', () => {
    const { container } = render(getBrowserSupportFallbackScript({ format: 'jsx' }));
    const regex = new RegExp(scriptCom);

    expect(container.innerHTML).toMatch(regex);
  });

  it('should return script with china cdn url', () => {
    const { container } = render(getBrowserSupportFallbackScript({ cdn: 'cn', format: 'jsx' }));
    const regex = new RegExp(scriptCn);

    expect(container.innerHTML).toMatch(regex);
  });
});
