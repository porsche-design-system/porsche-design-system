import { getCookiesFallbackScript } from '../../../src';
import { renderToString } from 'react-dom/server';

const scriptCom =
  /^<script>.*https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system\/fallbacks\/cookies\.[a-z0-9]{7}\.js.*<\/script>$/;
const scriptCn =
  /^<script>.*https:\/\/cdn\.ui\.porsche\.cn\/porsche-design-system\/fallbacks\/cookies\.[a-z0-9]{7}\.js.*<\/script>$/;

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
    const result = getCookiesFallbackScript({ format: 'jsx' });
    expect(renderToString(result)).toMatch(scriptCom);
  });

  it('should return script with china cdn url', () => {
    const result = getCookiesFallbackScript({ cdn: 'cn', format: 'jsx' });
    expect(renderToString(result)).toMatch(scriptCn);
  });
});

describe('format: sha256', () => {
  it('should return hash for script with cdn url', () => {
    const result = getCookiesFallbackScript({ format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"'sha256-LDsGO12ksOJAhATpdybNJjMVCVpsv8PT35cyv+dPrIw='"`);
  });

  it('should return hash for script with china cdn url', () => {
    const result = getCookiesFallbackScript({ cdn: 'cn', format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"'sha256-aEaPRDffe5Mh9LnxLmN4XTrSdMGN/Wmh/r/ioa6+usw='"`);
  });
});
