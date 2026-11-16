import { describe, expect, it } from 'vitest';
import { externalUrlPattern, resolveExternalRequest } from '../../../src/playwright/externalRequests';

const cdnComUrl = 'https://cdn.ui.porsche.com/porsche-design-system/components/a.js';

describe('externalUrlPattern', () => {
  it('pattern ignores localhost', () => {
    expect(externalUrlPattern.test('http://localhost:3001/x')).toBe(false);
    expect(externalUrlPattern.test('http://localhost/')).toBe(false);
    expect(externalUrlPattern.test('http://127.0.0.1:8080/')).toBe(false);
  });

  it('pattern matches a host that only starts like localhost', () => {
    expect(externalUrlPattern.test('http://localhost.example.com/')).toBe(true);
    expect(externalUrlPattern.test('http://127.0.0.1.nip.io/')).toBe(true);
    expect(externalUrlPattern.test('http://localhost:secret@example.com/')).toBe(true);
  });
});

describe('resolveExternalRequest()', () => {
  it('cdn .com', () => {
    expect(resolveExternalRequest(cdnComUrl, 'script', {})).toEqual({
      action: 'cdn',
      url: 'http://localhost:3001/components/a.js',
    });
  });

  it('cdn .cn', () => {
    expect(resolveExternalRequest('https://cdn.ui.porsche.cn/porsche-design-system/icons/a.svg', 'image', {})).toEqual({
      action: 'cdn',
      url: 'http://localhost:3001/icons/a.svg',
    });
  });

  it('cdn wins over a stub and the allowlist', () => {
    const outcome = resolveExternalRequest(cdnComUrl, 'script', {
      stubs: { 'https://cdn.ui.porsche.com': { body: 'stub' } },
      allowedOrigins: ['https://cdn.ui.porsche.com'],
    });
    expect(outcome.action).toBe('cdn');
  });

  it('stub by origin', () => {
    expect(
      resolveExternalRequest('https://registry.npmjs.org/@porsche-design-system/components-js', 'fetch', {
        stubs: { 'https://registry.npmjs.org': { json: { versions: {} } } },
      })
    ).toEqual({ action: 'stub', reply: { json: { versions: {} } } });
  });

  it('stub wins over the allowlist', () => {
    const outcome = resolveExternalRequest('https://registry.npmjs.org/@porsche-design-system/components-js', 'fetch', {
      stubs: { 'https://registry.npmjs.org': { json: { versions: {} } } },
      allowedOrigins: ['https://registry.npmjs.org'],
    });
    expect(outcome.action).toBe('stub');
  });

  it('allowlisted origin', () => {
    expect(
      resolveExternalRequest('https://example.com/a', 'fetch', { allowedOrigins: ['https://example.com'] })
    ).toEqual({ action: 'allow' });
  });

  it('origin is matched whole', () => {
    expect(
      resolveExternalRequest('https://example.com.evil.test/a', 'fetch', { allowedOrigins: ['https://example.com'] })
    ).toEqual({ action: 'abort' });
  });

  it('unknown image, default', () => {
    expect(resolveExternalRequest('https://images.ctfassets.net/a.svg', 'image', {})).toEqual({ action: 'image' });
  });

  it('unknown image, abort', () => {
    expect(resolveExternalRequest('https://images.ctfassets.net/a.svg', 'image', { images: 'abort' })).toEqual({
      action: 'abort',
    });
  });

  it('unknown non-image', () => {
    expect(resolveExternalRequest('https://new.example.com/x.js', 'script', {})).toEqual({ action: 'abort' });
  });
});
