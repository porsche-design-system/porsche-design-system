import type { ExternalRequestsOptions } from '@porsche-design-system/testing/playwright';

export const externalRequests: ExternalRequestsOptions = {
  stubs: {
    // The version select in the header. fetchPdsVersions adds the running version itself.
    'https://registry.npmjs.org': { json: { versions: {} } },
    // The framework demo apps, deployed from the examples repository.
    'https://porsche-design-system.github.io': { contentType: 'text/html', body: '<!doctype html><title>Demo</title>' },
  },
};
