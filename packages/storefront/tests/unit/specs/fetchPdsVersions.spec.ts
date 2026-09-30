import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchPdsVersions } from '@/utils/fetchPdsVersions';

const mocks = vi.hoisted(() => ({ localVersion: '4.7.0' }));

vi.mock('@/utils/porscheDesignSystemVersion', () => ({
  get localPorscheDesignSystemVersion() {
    return mocks.localVersion;
  },
}));

const mockRegistryResponse = (
  versions: string[],
  init: { ok?: boolean; status?: number; statusText?: string } = {}
) => {
  const { ok = true, status = 200, statusText = 'OK' } = init;
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status,
    statusText,
    json: async () => ({ versions: Object.fromEntries(versions.map((version) => [version, {}])) }),
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

describe('fetchPdsVersions()', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mocks.localVersion = '4.7.0';
  });

  it('should request the abbreviated metadata of components-js from the npm registry', async () => {
    const fetchMock = mockRegistryResponse(['4.7.0']);

    await fetchPdsVersions();

    expect(fetchMock).toHaveBeenCalledWith('https://registry.npmjs.org/@porsche-design-system/components-js', {
      headers: { accept: 'application/vnd.npm.install-v1+json' },
    });
  });

  it('should only return stable versions starting at 3.29.0, sorted from newest to oldest', async () => {
    mockRegistryResponse(['3.28.0', '3.29.0', '4.7.0', '4.8.0-rc.0', '3.30.0', '2.20.0', '4.6.0']);

    expect(await fetchPdsVersions()).toEqual(['4.7.0', '4.6.0', '3.30.0', '3.29.0']);
  });

  it('should sort numerically instead of lexically', async () => {
    mockRegistryResponse(['4.9.0', '3.100.0', '4.10.0', '4.7.0', '3.99.0']);

    expect(await fetchPdsVersions()).toEqual(['4.10.0', '4.9.0', '4.7.0', '3.100.0', '3.99.0']);
  });

  it('should add the running version when it is not published yet', async () => {
    mocks.localVersion = '4.8.0';
    mockRegistryResponse(['4.7.0', '4.6.0']);

    expect(await fetchPdsVersions()).toEqual(['4.8.0', '4.7.0', '4.6.0']);
  });

  it('should not add the running version twice', async () => {
    mockRegistryResponse(['4.7.0', '4.6.0']);

    expect(await fetchPdsVersions()).toEqual(['4.7.0', '4.6.0']);
  });

  it('should keep pre-releases when filterStable is false', async () => {
    mockRegistryResponse(['4.7.0', '4.8.0-rc.0']);

    expect(await fetchPdsVersions({ filterStable: false })).toContain('4.8.0-rc.0');
  });

  it('should respect a custom startingVersion', async () => {
    mockRegistryResponse(['4.7.0', '4.6.0', '4.5.0']);

    expect(await fetchPdsVersions({ startingVersion: '4.6.0' })).toEqual(['4.7.0', '4.6.0']);
  });

  it('should throw when the registry does not respond with ok', async () => {
    mockRegistryResponse([], { ok: false, status: 503, statusText: 'Service Unavailable' });

    await expect(fetchPdsVersions()).rejects.toThrow('Failed to fetch versions: 503 Service Unavailable');
  });
});
