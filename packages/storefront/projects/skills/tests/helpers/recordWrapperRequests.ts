import { registerHooks } from 'node:module';

/**
 * Preloaded by `wrapperFree.spec.ts` (`node --import ./tests/helpers/recordWrapperRequests.ts`): records every
 * request for a framework wrapper, by `import` or `require`, and prints them as the last line on exit.
 */

const WRAPPER_SPECIFIER = /^@porsche-design-system\/components-(?:react|js|vue|angular)(?:\/.*)?$/;

export const WRAPPER_REQUESTS_PREFIX = 'WRAPPER_REQUESTS=';

const requests = new Set<string>();

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (WRAPPER_SPECIFIER.test(specifier)) {
      requests.add(`${specifier} ← ${context.parentURL ?? '?'}`);
    }
    return nextResolve(specifier, context);
  },
});

process.on('exit', () => {
  process.stdout.write(`\n${WRAPPER_REQUESTS_PREFIX}${JSON.stringify([...requests])}\n`);
});
