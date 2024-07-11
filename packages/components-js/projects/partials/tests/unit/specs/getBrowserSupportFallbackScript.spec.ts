import { getBrowserSupportFallbackScript } from '../../../src';
import { renderToString } from 'react-dom/server';

const scriptCom =
  /^<script>.*https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system\/fallbacks\/browser-support\.[a-z0-9]{7}\.js.*<\/script>$/;
const scriptCn =
  /^<script>.*https:\/\/cdn\.ui\.porsche\.cn\/porsche-design-system\/fallbacks\/browser-support\.[a-z0-9]{7}\.js.*<\/script>$/;

describe('format: html', () => {
  it('should return script with cdn url', () => {
    const result = getBrowserSupportFallbackScript();
    expect(result).toMatch(scriptCom);
  });

  it('should return script with china cdn url', () => {
    const result = getBrowserSupportFallbackScript({ cdn: 'cn', format: 'html' });
    expect(result).toMatch(scriptCn);
  });
});

describe('format: jsx', () => {
  it('should return script with cdn url', () => {
    const result = getBrowserSupportFallbackScript({ format: 'jsx' });
    expect(renderToString(result)).toMatch(scriptCom);
  });

  it('should return script with china cdn url', () => {
    const result = getBrowserSupportFallbackScript({ cdn: 'cn', format: 'jsx' });
    expect(renderToString(result)).toMatch(scriptCn);
  });
});

describe('format: sha256', () => {
  it('should return hash for script with cdn url', () => {
    const result = getBrowserSupportFallbackScript({ format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"'sha256-/f45uykjCRaxV+Iz/3G2fq+nuheiRU7ezD1aqqF+uno='"`);
  });

  it('should return hash for script with china cdn url', () => {
    const result = getBrowserSupportFallbackScript({ cdn: 'cn', format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"'sha256-tT8WtqtxPSxX7mZKXWL8HjkA4e62Xvp7aO/FNnXbj5o='"`);
  });
});
