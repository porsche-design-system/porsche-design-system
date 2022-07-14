import { getCookiesFallbackScript } from '../../../src';
import { render } from '@testing-library/react';

const scriptCom =
  /^<script>.*https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system\/fallbacks\/cookies\.[a-z0-9]{32}\.js.*<\/script>$/;
const scriptCn =
  /^<script>.*https:\/\/cdn\.ui\.porsche\.cn\/porsche-design-system\/fallbacks\/cookies\.[a-z0-9]{32}\.js.*<\/script>$/;

jest.mock('../../../src/shared');

describe('format: html', () => {
  it('should return script with cdn url', () => {
    const result = getCookiesFallbackScript();

    expect(result).toMatch(scriptCom);
  });

  it('should return script with china cdn url', () => {
    const result = getCookiesFallbackScript({ cdn: 'cn', format: 'html' });

    expect(result).toMatch(scriptCn);
  });
});

describe('format: jsx', () => {
  it('should return script with cdn url', () => {
    const { container } = render(getCookiesFallbackScript({ format: 'jsx' }));

    expect(container.innerHTML).toMatch(scriptCom);
  });

  it('should return script with china cdn url', () => {
    const { container } = render(getCookiesFallbackScript({ cdn: 'cn', format: 'jsx' }));

    expect(container.innerHTML).toMatch(scriptCn);
  });
});
