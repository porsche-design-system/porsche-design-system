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
    delete document.porscheDesignSystem;
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

  it('should by default set window.PORSCHE_DESIGN_SYSTEM_CDN="auto"', () => {
    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN).toBe('auto');
  });

  it('should for { cdn: "auto" } set window.PORSCHE_DESIGN_SYSTEM_CDN="auto" for backwards compatibility', () => {
    load({ cdn: 'auto' });
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN).toBe('auto');
  });

  it('should for { cdn: "cn" } set window.PORSCHE_DESIGN_SYSTEM_CDN="cn"', () => {
    load({ cdn: 'cn' });
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN).toBe('cn');
  });

  it('should for window.PORSCHE_DESIGN_SYSTEM_CDN="cn" set window.PORSCHE_DESIGN_SYSTEM_CDN="cn" for backwards compatibility', () => {
    window.PORSCHE_DESIGN_SYSTEM_CDN = 'cn';

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN).toBe('cn');
  });

  it('should for .cn top level domain set window.PORSCHE_DESIGN_SYSTEM_CDN="cn"', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'https://finder.porsche.cn' },
    });

    load();
    expect(window.PORSCHE_DESIGN_SYSTEM_CDN).toBe('cn');
  });

  it('should for window.PORSCHE_DESIGN_SYSTEM_CDN="auto" set document.porscheDesignSystem.cdn="https://cdn.ui.porsche.com"', () => {
    window.PORSCHE_DESIGN_SYSTEM_CDN = 'auto';

    load();
    expect(document.porscheDesignSystem.cdn).toBe('https://cdn.ui.porsche.com');
  });

  it('should for non .cn top level domain set document.porscheDesignSystem.cdn="https://cdn.ui.porsche.com"', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'https://shop.porsche.com' },
    });

    load();
    expect(document.porscheDesignSystem.cdn).toBe('https://cdn.ui.porsche.com');

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'https://shop.porsche.de' },
    });

    load();
    expect(document.porscheDesignSystem.cdn).toBe('https://cdn.ui.porsche.com');
  });

  it('should for window.PORSCHE_DESIGN_SYSTEM_CDN="cn" set document.porscheDesignSystem.cdn="https://cdn.ui.porsche.cn"', () => {
    window.PORSCHE_DESIGN_SYSTEM_CDN = 'cn';

    load();
    expect(document.porscheDesignSystem.cdn).toBe('https://cdn.ui.porsche.cn');
  });

  it('should for .cn top level domain set document.porscheDesignSystem.cdn="https://cdn.ui.porsche.cn"', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'https://shop.porsche.cn' },
    });

    load();
    expect(document.porscheDesignSystem.cdn).toBe('https://cdn.ui.porsche.cn');
  });
});
