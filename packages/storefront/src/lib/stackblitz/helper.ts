export const isStableStorefrontRelease = (): boolean => /^\/v\d+\//.test(location.pathname);

export const isStableStorefrontReleaseOrForcedPdsVersion = (pdsVersion: string): boolean =>
  !!pdsVersion || isStableStorefrontRelease();
