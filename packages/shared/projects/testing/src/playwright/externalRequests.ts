import { rewriteCdnUrlsForDev } from '@porsche-design-system/shared/rewrite-cdn-urls';

export type StubReply = { status?: number; contentType?: string; body?: string; json?: unknown };

export type ExternalRequestsOptions = {
  /** Fixed replies by origin, for example 'https://registry.npmjs.org'. */
  stubs?: Record<string, StubReply>;
  /** Origins that reach the network. */
  allowedOrigins?: string[];
  /** What an image from an unknown origin gets. Default 'stub'. */
  images?: 'stub' | 'abort';
};

export type RequestOutcome =
  | { action: 'cdn'; url: string }
  | { action: 'stub'; reply: StubReply }
  | { action: 'allow' }
  | { action: 'image' }
  | { action: 'abort' };

/** The pattern the fixture routes on. Only the hosts `localhost` and `127.0.0.1` never match. */
export const externalUrlPattern = /^https?:\/\/(?!(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$))/;

/** A fixed size placeholder for an image from an unknown origin, so a layout never depends on a third party. */
export const externalImageStub = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="40" viewBox="0 0 64 40"><rect width="64" height="40" rx="4" fill="#C8CACB"/></svg>`;

export const resolveExternalRequest = (
  url: string,
  resourceType: string,
  options: ExternalRequestsOptions
): RequestOutcome => {
  // The loader script builds the production CDN URL at runtime, so only a route can send it to the local CDN.
  const localCdnUrl = rewriteCdnUrlsForDev(url);
  if (localCdnUrl !== url) {
    return { action: 'cdn', url: localCdnUrl };
  }

  const { origin } = new URL(url);
  const reply = options.stubs?.[origin];
  if (reply) {
    return { action: 'stub', reply };
  }

  if (options.allowedOrigins?.includes(origin)) {
    return { action: 'allow' };
  }

  if (resourceType === 'image' && options.images !== 'abort') {
    return { action: 'image' };
  }

  return { action: 'abort' };
};
