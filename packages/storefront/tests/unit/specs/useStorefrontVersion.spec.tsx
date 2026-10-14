import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useStorefrontVersion } from '@/hooks/useStorefrontVersion';
import { fetchPdsVersions } from '@/utils/fetchPdsVersions';

const mocks = vi.hoisted(() => ({ isDev: false, localVersion: '4.6.0' }));

vi.mock('@/utils/fetchPdsVersions', () => ({ fetchPdsVersions: vi.fn() }));
vi.mock('@/utils/isDev', () => ({
  get isDevEnvironment() {
    return mocks.isDev;
  },
}));
vi.mock('@/utils/porscheDesignSystemVersion', () => ({
  get localPorscheDesignSystemVersion() {
    return mocks.localVersion;
  },
}));

const fetchPdsVersionsMock = vi.mocked(fetchPdsVersions);

const renderUseStorefrontVersion = async () => {
  const hook = renderHook(() => useStorefrontVersion());
  await waitFor(() => expect(hook.result.current.pdsVersion.latest).toBeDefined());
  return hook;
};

describe('useStorefrontVersion()', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.isDev = false;
    mocks.localVersion = '4.6.0';
    fetchPdsVersionsMock.mockResolvedValue(['4.7.0', '4.6.0', '4.5.0']);
  });

  it('should provide the running version followed by the legacy versions before the versions are fetched', () => {
    fetchPdsVersionsMock.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useStorefrontVersion());

    expect(result.current.pdsVersion).toEqual({ all: ['4.6.0', '2', '1'], current: '4.6.0', latest: undefined });
    expect(result.current.isOutdatedVersionBannerOpen).toBe(false);
  });

  it('should keep the running and the legacy versions and warn when fetching the versions fails', async () => {
    const error = new Error('Failed to fetch versions: 503 Service Unavailable');
    fetchPdsVersionsMock.mockRejectedValue(error);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useStorefrontVersion());

    await waitFor(() => expect(consoleWarnSpy).toHaveBeenCalledWith(expect.any(String), error));
    expect(result.current.pdsVersion).toEqual({ all: ['4.6.0', '2', '1'], current: '4.6.0', latest: undefined });
    expect(result.current.isOutdatedVersionBannerOpen).toBe(false);
  });

  it('should provide the fetched versions followed by the legacy versions, with the newest as latest', async () => {
    const { result } = await renderUseStorefrontVersion();

    expect(fetchPdsVersionsMock).toHaveBeenCalledTimes(1);
    expect(result.current.pdsVersion).toEqual({
      all: ['4.7.0', '4.6.0', '4.5.0', '2', '1'],
      current: '4.6.0',
      latest: '4.7.0',
    });
  });

  it('should open the outdated version banner when an earlier release is running', async () => {
    const { result } = await renderUseStorefrontVersion();

    await waitFor(() => expect(result.current.isOutdatedVersionBannerOpen).toBe(true));
  });

  it('should close the outdated version banner on request', async () => {
    const { result } = await renderUseStorefrontVersion();
    await waitFor(() => expect(result.current.isOutdatedVersionBannerOpen).toBe(true));

    act(() => result.current.setIsIsOutdatedVersionBannerOpen(false));

    expect(result.current.isOutdatedVersionBannerOpen).toBe(false);
  });

  it('should not open the outdated version banner when the latest release is running', async () => {
    mocks.localVersion = '4.7.0';

    const { result } = await renderUseStorefrontVersion();

    expect(result.current.isOutdatedVersionBannerOpen).toBe(false);
  });

  it('should not open the outdated version banner in the development environment', async () => {
    mocks.isDev = true;

    const { result } = await renderUseStorefrontVersion();

    expect(result.current.isOutdatedVersionBannerOpen).toBe(false);
  });
});
