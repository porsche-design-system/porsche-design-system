import * as fromComponentsManagerCore from '@porsche-design-system/components-manager-core';
import { load } from './with-prefix';
import type { EntryConfig } from '../shared-definitions/entry-config';

declare global {
  var CM_CONFIG: EntryConfig;
}

global.CM_CONFIG = {
  version: '1.0.0',
  script: 'some.js',
  tempEntryPointFilePath: 'another.js',
};

describe('load()', () => {
  beforeEach(() => {
    // @ts-ignore
    delete window.PORSCHE_DESIGN_SYSTEM_CDN;
  });

  it('should call loadComponentLibrary() with correct default parameters', () => {
    const spy = jest.spyOn(fromComponentsManagerCore, 'loadComponentLibrary');

    load();
    expect(spy).toBeCalledWith({ prefix: '', ...global.CM_CONFIG });
  });

  it('should call loadComponentLibrary() with correct prefix parameters', () => {
    const spy = jest.spyOn(fromComponentsManagerCore, 'loadComponentLibrary');

    load({ prefix: 'my-prefix' });
    expect(spy).toBeCalledWith({ prefix: 'my-prefix', ...global.CM_CONFIG });
  });

  it('should set window.PORSCHE_DESIGN_SYSTEM_CDN to "auto" by default', () => {
    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN).toBe('auto');
  });

  it('should set window.PORSCHE_DESIGN_SYSTEM_CDN to "cn" for window.PORSCHE_DESIGN_SYSTEM_CDN="cn" for backwards compatibility', () => {
    window.PORSCHE_DESIGN_SYSTEM_CDN = 'cn';

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN).toBe('cn');
  });

  it('should set window.PORSCHE_DESIGN_SYSTEM_CDN to "cn" for .cn top level domain', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'https://finder.porsche.cn' },
    });

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN).toBe('cn');
  });

  it('should set window.PORSCHE_DESIGN_SYSTEM_CDN_URL to "https://cdn.ui.porsche.com" for window.PORSCHE_DESIGN_SYSTEM_CDN="auto"', () => {
    window.PORSCHE_DESIGN_SYSTEM_CDN = 'auto';

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBe('https://cdn.ui.porsche.com');
  });

  it('should set window.PORSCHE_DESIGN_SYSTEM_CDN_URL to "https://cdn.ui.porsche.com" for non .cn top level domain', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'https://shop.porsche.com' },
    });

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBe('https://cdn.ui.porsche.com');

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'https://shop.porsche.de' },
    });

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBe('https://cdn.ui.porsche.com');
  });

  it('should set window.PORSCHE_DESIGN_SYSTEM_CDN_URL to "https://cdn.ui.porsche.cn" for window.PORSCHE_DESIGN_SYSTEM_CDN="cn"', () => {
    window.PORSCHE_DESIGN_SYSTEM_CDN = 'cn';

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBe('https://cdn.ui.porsche.cn');
  });

  it('should set window.PORSCHE_DESIGN_SYSTEM_CDN_URL to "https://cdn.ui.porsche.cn" for .cn top level domain', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'https://shop.porsche.cn' },
    });

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN_URL).toBe('https://cdn.ui.porsche.cn');
  });
});
